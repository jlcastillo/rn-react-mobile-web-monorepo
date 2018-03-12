# Monorepo for a Web + Mobile React App

The repo has the following structure:

```
/
    - mobile
        - App.js            => RN app entry point
    - web
        - App.js            => React app entry point
    - common                => Redux
        - components
            <component>.js  => platform agnostic
            - mobile        => RN specific code
            - web           => web browser specific code
        - containers
            <container>.js  => platform agnostic
        - reducers
            <reducer>.js    => platform agnostic
        - actions
            <action>.js     => platform agnostic
        - store             => platform agnostic
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


# How it works

## Web
The web app was created with Create-React-App and then was ejected. If you want to work with an unejected app, make sure you modify the webpack.config.[dev|prod].wrapper.js files to point to the original files.

We use a hook.js file to replace the require() function in NodeJS, so we can redirect webpack to our configuration wrappers. In an ejected app we could also modify the configuration files directly, without hook.js, but this approach is cleaner, self-documented and it allows us to move back to create-react-app if we ever need it.

The config wrappers tell webpack to:
- allow source files outside ./src. We need that as most of our code is outside the React app root folder, in /common.
-  point "@component" alias to its platform specific components folder.
- point "@common" alias to the folder holding the redux code.

We also use .babelrc files both in /web and /common to make sure the babel loader used by webpack translates the JSX and ES6 code.

## Mobile

In this case we don't need to hook NodeJS to customize the build process, as the react native builder already supports this out of the box with the rn-cli.config.js file.

We use rn-cli.config.js to set 2 module resolution roots: the original one in /mobile and a new one in /common.

We then use the .babelrc file with the babel-plugin-module-resolver plugin to set module resolution alias for "@common" and "@components" as we did in the web project.

Due to some problems with Babel that won't be probably fixed until version 7 or 8, we also need to include aliases for some external modules like "react", "redux", "react-redux" and "react-native".

# To Do

- fix the root package.json and Procfile to properly deploy in Heroku / Dokku. Right now it shows some errors, although they don't seem to be hard to fix.

# Future Work

- tweak module resolution in the web project so that babel react presets are taken from the /web project instead of /common. This would save the need of a package.json and 'npm install' in /common. The mobile project doesn't need any of those and its configuration may serve as reference.

- tweak module resolution in the mobile project so we don't need to add individual package aliases to /common/.babelrc.


