module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md").reverse();
  });

  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("projects/**/*.md");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
