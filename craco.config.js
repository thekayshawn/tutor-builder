const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@Core": path.resolve(__dirname, "src/Core"),
      "@Data": path.resolve(__dirname, "src/Data"),
      "@Repos": path.resolve(__dirname, "src/Repos"),
      "@Presentation": path.resolve(__dirname, "src/Presentation"),
    },
  },
};
