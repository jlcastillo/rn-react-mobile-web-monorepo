// Hook the NodeJS module require() function to redirect to our own wrappers if needed

var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function(modulePath) {
    console.log(modulePath)
    let ignoreHook = modulePath.indexOf("[IGNOREHOOK]") === 0;
    if(ignoreHook) {
        console.log("Ignoring hook for " + modulePath);
        modulePath = modulePath.replace("[IGNOREHOOK]", "")
    }
    if(modulePath.indexOf('webpack.config.dev') !== -1 && !ignoreHook)
        modulePath = __dirname + '/webpack.config.dev.wrapper';
    if(modulePath.indexOf('webpack.config.prod') !== -1 && !ignoreHook)
        modulePath = __dirname + '/webpack.config.prod.wrapper';
    return originalRequire.apply(this, [modulePath]);
};

require(process.argv[2]);
