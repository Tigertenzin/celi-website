const fs = require("fs");
const path = require("path");

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

  eleventyConfig.addCollection("currentProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("projects/**/*.md")
      .filter((project) => project.data.status !== "archived" && project.data.status !== "in-development");
  });

  eleventyConfig.addCollection("archivedProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("projects/**/*.md")
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

  eleventyConfig.addFilter("readableDate", function (dateObj) {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addShortcode("gallery", function (images, altPrefix) {
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
    return `<div class="gallery">\n${items}\n</div>`;
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
