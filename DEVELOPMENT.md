# Development setup
## Prerequisites
Install node.js with the version specified in `.nvmrc`.

Install yarn. This should be as simple as `corepack enable`.

## Build
```
yarn install
yarn build
```

## Release
Push a semver tag in the format `v*.*.*` and a new release with zip & tar artifacts will be published by `.github/workflows/build.yml`.

## Editor support
Yarn + Typescript support for VSCode and vim is enabled by the `.yarn/sdks` configuration.

If using VSCode, you must take the following steps to recognize installed modules. (From the [yarn documentation](https://yarnpkg.com/getting-started/editor-sdks).)
> For safety reason VSCode requires you to explicitly activate the custom TS settings:
>
> Press ctrl+shift+p in a TypeScript file
> Choose "Select TypeScript Version"
> Pick "Use Workspace Version"