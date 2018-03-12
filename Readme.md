# Monorepo for a Web + Mobile React App

The repo has the following structure:

```
- mobile
    - App.js            => RN app entry point
                        (created with create-react-native-app 
                        and then ejected with 'npm run eject')
- web
    - App.js            => React app entry point
                        (created with create-react-app,
                        not ejected)

- common                => Redux
                        all code is reused in web and
                        mobile except where specified

    - components
        <component>.js  => platform agnostic
        - mobile        => RN specific code
        - web           => web browser specific code

    - containers
        <container>.js

    - reducers
        <reducer>.js

    - actions
        <action>.js

    - store
```

# Getting started

Clone this repo and try it in the browser

```
cd common
npm install
cd ../web
npm install
npm start
```

and in iOS/Android (make sure the emulator is running first):

```
npm install -g react-native-cli
cd mobile
npm install
react-native run-android
    or
react-native run-ios
```

# Troubleshooting

- If you see errors related to missing packages in the mobile project, make sure you have those as dependencies in /web/package.json and as aliases in /common/.babelrc.

- if you get red screen errors in the emulator, try stopping the bundler with CTRL/CMD-C and running it again with 'npm start -- --reset-cache', then reloading the app in the emulator by pressing key R twice (or using the Reload option in the red screen menu)


# How it works

## Web
The web app was created with Create-React-App. If you need to eject it for some reason, make sure you modify the webpack.config.[dev|prod].wrapper.js files to point to the right ones, probably in ./config dir (they are copied there by 'npm run eject').

We need to modify the Webpack configuration files to allow source code located outside the /src folder of the project. However create-react-app hides webpack and its configuration from us. To overcome that, we use a hook.js file to replace the require() function in the standard Module object of NodeJS. The 'scripts' section of package.json is modified, to ejecute hook.js before calling the create-react-app scripts. When hook.js detects that webpack is trying to load its configuration, we redirect it to our wrapper files, where the original configuration is loaded and modifed. By doing this, we make sure to still benefit from future improvements to the create-react-app scripts, while being able to customize how webpack works under the hood.

The config wrappers tell webpack to:
- allow source files outside ./src. We need that as most of our code is outside the React app root folder, in /common.
-  point "@component" alias to its platform specific components folder.
- point "@common" alias to the folder holding the redux code.

We also use .babelrc files both in /web and /common to make sure the babel loader used by webpack translates the JSX and ES6 code.

## Mobile

In this case we don't need to hook NodeJS to customize the build process, as the react native builder already supports this out of the box with the rn-cli.config.js file.

We use this special file to set two module resolution roots: the original one in /mobile and a new one in /common.

We then use the .babelrc file with the babel-plugin-module-resolver plugin to set module resolution alias for "@common" and "@components" as we did in the web project.

Due to some problems with Babel that won't be probably fixed until version 7 or 8, we also need to include aliases for some external modules like "react", "redux", "react-redux" and "react-native".

# To Do

- make the app work with an unejected create-react-native-app

# Future Work

- tweak module resolution in the web project so that babel react presets are taken from the /web project instead of /common. This would save the need of a package.json and 'npm install' in /common. The mobile project doesn't need any of those and its configuration may serve as reference.

- tweak module resolution in the mobile project so we don't need to add individual package aliases to /common/.babelrc.


