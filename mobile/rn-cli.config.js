var path = require("path");

var config = {
  getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(__dirname),
      path.resolve(__dirname, "../common")
    ];
  }
}
module.exports = config;
