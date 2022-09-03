const modern = require("eleventy-plugin-modern");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPlugin(
    modern({
      markdownOptions: {
        html: true,
      },
    })
  );
};
