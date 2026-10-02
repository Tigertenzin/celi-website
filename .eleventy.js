const fs = require("fs");
const path = require("path");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const site = require("./_data/site.json");
const markdown = require("markdown-it")({ html: true });

// "02 Oct 2026", as the readableDate filter shows dates.
function readableDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Changelog bullets that start "New:", "Improved:" or "Fixed:" get a coloured tag.
function tagChanges(html) {
  return html.replace(/<li>(New|Improved|Fixed):\s*([\s\S]*?)<\/li>/g, (_, type, text) =>
    `<li class="change"><span class="change-type change-type--${type.toLowerCase()}">${type}</span><span class="change-text">${text}</span></li>`
  );
}

// HTML with no blank lines: the page's own Markdown pass ends an HTML block at a blank
// line, and would then treat the rest of a changelog box as Markdown.
function htmlBlock(html) {
  return html.replace(/\n\s*\n/g, "\n").trim();
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("attachments");
  eleventyConfig.addPassthroughCopy("projects/attachments");
  eleventyConfig.addPassthroughCopy("posts/attachments");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse();
  });

  // Oldest-first, matching the order the feed plugin's template expects
  // (it reverses this itself to get newest-first for the feed).
  eleventyConfig.addCollection("postsFeed", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md");
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/feed.xml",
    collection: {
      name: "postsFeed",
      limit: 20,
    },
    metadata: {
      language: "en",
      title: site.name,
      subtitle: site.description,
      base: site.url,
      author: {
        name: site.name,
      },
    },
  });

  // Project pages are the top-level files in projects/. Pages inside a project's folder
  // (privacy policies, changelogs) belong to that project and aren't listed themselves.
  eleventyConfig.addCollection("currentProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("projects/*.md")
      .filter((project) => project.data.status !== "archived" && project.data.status !== "in-development");
  });

  eleventyConfig.addCollection("archivedProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("projects/*.md")
      .filter((project) => project.data.status === "archived");
  });

  eleventyConfig.addFilter("excerpt", function (content, length = 300) {
    if (!content) return "";
    const text = content
      .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gis, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length <= length) return text;
    return text.slice(0, length).replace(/\s+\S*$/, "") + "…";
  });

  eleventyConfig.addFilter("thumbnail", function (post) {
    const declared = post?.data?.thumbnail;
    if (declared) {
      if (!declared.startsWith("/")) return declared;
      if (fs.existsSync(path.join(__dirname, declared))) return declared;
    }
    const match = (post.templateContent || "").match(/<img\b[^>]*\bsrc="([^"]+)"/);
    return match ? match[1] : "";
  });

  eleventyConfig.addFilter("readableDate", readableDate);

  // Changelogs: one file per major version (projects/<app>/changelog/v1.md, v2.md…), newest
  // first. Each file's front matter gives its major version as `version`.
  eleventyConfig.addCollection("changelogVersions", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("projects/*/changelog/v*.md")
      .sort((a, b) => (b.data.version || 0) - (a.data.version || 0));
  });

  // {% releaseNotes %} … {% endreleaseNotes %}: a point version's finished notes, the text
  // for the App Store's "What's New".
  eleventyConfig.addPairedShortcode("releaseNotes", function (content) {
    return htmlBlock(`<section class="release-notes">
<p class="release-notes-label">Release notes</p>
${tagChanges(markdown.render(content))}
</section>`);
  });

  // {% build 7, "2026-11-10" %} … {% endbuild %}: one TestFlight build, collapsed until opened.
  eleventyConfig.addPairedShortcode("build", function (content, number, date) {
    const when = date ? ` <span class="build-date">· ${readableDate(date)}</span>` : "";
    return htmlBlock(`<details class="build">
<summary>Build ${number}${when}</summary>
${tagChanges(markdown.render(content))}
</details>`);
  });

  // A version file's content cut down to each point version's heading and release notes, for
  // a changelog's overview page. A point version still in testing links to its builds instead.
  eleventyConfig.addFilter("changelogSummary", function (html, url) {
    const sections = (html || "").split(/(?=<h2[\s>])/).filter((part) => part.startsWith("<h2"));
    return htmlBlock(
      sections
        .map((section) => {
          const heading = section.match(/<h2[^>]*>[\s\S]*?<\/h2>/)[0].replace(/h2/g, "h3");
          const notes = section.match(/<section class="release-notes">[\s\S]*?<\/section>/);
          const body = notes
            ? notes[0]
            : `<p class="changelog-pending">Still in testing. <a href="${url}">See the TestFlight builds</a>.</p>`;
          return `${heading}\n${body}`;
        })
        .join("\n")
    );
  });

  // `aspect` is the screenshots' shape, as a CSS ratio — phone-shaped ("9 / 19.5") unless
  // given, e.g. "3 / 4" for iPad screenshots, which would otherwise be cropped at the sides.
  eleventyConfig.addShortcode("gallery", function (images, altPrefix, aspect) {
    if (!images || !images.length) return "";
    const label = altPrefix || "Screenshot";
    const items = images
      .map((src, i) => {
        const alt = `${label} ${i + 1}`;
        return `<button type="button" class="gallery-item" data-full="${src}" data-alt="${alt}" aria-label="Open ${alt} full size">
        <img src="${src}" alt="${alt}" loading="lazy">
      </button>`;
      })
      .join("\n");
    const style = aspect ? ` style="--gallery-aspect: ${aspect}; --gallery-min: 160px"` : "";
    return `<div class="gallery"${style}>\n${items}\n</div>`;
  });

  // A markdown paragraph containing only images (whether written on one
  // line, or on consecutive lines with no blank line between them, which
  // CommonMark still joins into one paragraph) is turned into a
  // side-by-side row. Images separated by a blank line land in different
  // paragraphs and keep the existing full-width treatment.
  eleventyConfig.addTransform("imageRows", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    let out = content.replace(/(?:<img\b[^>]*>\s*){2,}/g, (run) => {
      const imgs = run.match(/<img\b[^>]*>/g) || [];
      return `<div class="image-row">${imgs.join("")}</div>`;
    });
    // A paragraph that held nothing but the row would otherwise wrap it
    // in a <p>, which is invalid since <div> isn't phrasing content.
    out = out.replace(/<p>\s*(<div class="image-row">[\s\S]*?<\/div>)\s*<\/p>/g, "$1");
    return out;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
