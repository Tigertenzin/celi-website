module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
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

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
