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
  // The stylesheet's link carries a hash of its contents (`/css/style.css?v=…`), so a browser
  // or CDN holding an older copy fetches the new one as soon as it changes, instead of
  // pairing new pages with old styles.
  eleventyConfig.addGlobalData("styleVersion", () =>
    require("crypto").createHash("sha256").update(fs.readFileSync(path.join(__dirname, "css/style.css"))).digest("hex").slice(0, 10)
  );

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

  // {% deviceGallery deviceScreenshots, "Waypoint Journal" %}: screenshots for several devices,
  // shown as the App Store shows them: one device's screenshots in a row that scrolls sideways,
  // with the devices to choose between underneath. `devices` is a list of
  // { name, aspect, width, images }: the images' shape as a CSS ratio, and how wide they show.
  // Switching devices is plain radio buttons and CSS; a small script in the base layout adds
  // the scroll arrows and edge fades. Each image still opens in the lightbox.
  const deviceIcons = {
    iPhone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 5h3"/>',
    iPad: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M11 18.5h2"/>',
    Mac: '<rect x="4" y="4.5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
    "Apple Watch": '<rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 6V2.5h6V6M9 18v3.5h6V18"/>',
  };
  let deviceGalleryCount = 0;
  eleventyConfig.addShortcode("deviceGallery", function (devices, altPrefix) {
    if (!devices || !devices.length) return "";
    const group = `device-gallery-${++deviceGalleryCount}`;
    const label = altPrefix || "Screenshot";
    const inputs = devices
      .map((device, i) => `<input type="radio" class="device-gallery-input" name="${group}" id="${group}-${i}"${i === 0 ? " checked" : ""}>`)
      .join("\n");
    const panels = devices
      .map((device) => {
        // The image carries its own shape (width and height from `aspect`), so it lays out at
        // the right size before it loads; it's sized on the image, not the button around it.
        const [ratioW, ratioH] = String(device.aspect || "9 / 19.5").split("/").map((n) => n.trim());
        const items = device.images
          .map((src, i) => {
            const alt = `${label} on ${device.name}, screenshot ${i + 1}`;
            return `<button type="button" class="gallery-item" data-full="${src}" data-alt="${alt}" aria-label="Open ${alt} full size"><img src="${src}" alt="${alt}" width="${ratioW}" height="${ratioH}" loading="lazy" decoding="async"></button>`;
          })
          .join("\n");
        // Starts out showing it scrolls on; the page's script keeps that up to date, and adds
        // a fade and an arrow at the start once there's something to go back to.
        return `<div class="device-gallery-panel can-scroll-right" style="--gallery-aspect: ${device.aspect}; --gallery-width: ${device.width || "200px"}">
<div class="device-gallery-track">\n${items}\n</div>
<button type="button" class="device-gallery-arrow device-gallery-arrow--back" data-scroll="-1" aria-label="Previous screenshots"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6"/></svg></button>
<button type="button" class="device-gallery-arrow device-gallery-arrow--forward" data-scroll="1" aria-label="More screenshots"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6l6 6-6 6"/></svg></button>
</div>`;
      })
      .join("\n");
    const tabs = devices
      .map((device, i) => {
        const icon = deviceIcons[device.name]
          ? `<svg viewBox="0 0 24 24" aria-hidden="true">${deviceIcons[device.name]}</svg>`
          : "";
        return `<label for="${group}-${i}">${icon}${device.name}</label>`;
      })
      .join("\n");
    return `<div class="device-gallery">\n${inputs}\n${panels}\n<div class="device-gallery-tabs" role="group" aria-label="Screenshots for">\n${tabs}\n</div>\n</div>`;
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
