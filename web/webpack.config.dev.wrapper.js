let config = require('[IGNOREHOOK]./config/webpack.config.dev');

const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// console.log(config)

// add a few aliases 
config.resolve.alias['@common'] = resolveApp('../common');
config.resolve.alias['@components'] = resolveApp('../common/components/web');
console.log("Successfully added new aliases to WebPack config")

// remove the ModuleScopePlugin, as it rejects source code outside ./src
let resolvePlugins = config.resolve.plugins;
for(let x=0; x<resolvePlugins.length; x++) {
    let pluginName = resolvePlugins[x].constructor.name
    if(pluginName === 'ModuleScopePlugin') {
        resolvePlugins.splice(x, 1)
        console.log("Successfully found and removed ModuleScopePlugin from WebPack config")
    }
}

// make sure the the babel loader accepts files outside ./src
let rules = config.module.rules;
for(rule of rules) {
    if(rule.oneOf) {
        for(one of rule.oneOf) {
            if(one.loader && one.loader.indexOf('babel-loader') != -1) {
                delete one.include
                one.exclude = [ resolveApp('./node_modules') ]
                console.log("Found babel-loader")
            }
        }
    }
}

//console.log(config)
//process.exit();

module.exports = config;
