# vbt

<!--[![Build Status][build-badge]][build-status]-->

simple build tool for vue applications,
used in [xms-fe](https://github.com/airt/xms-fe)

## support

- [x] unit tests with karma
- [x] e2e tests with nightwatch
- [x] hot reload
- [ ] mocks
- [ ] documents
- [ ] custom configurations

## installation

```sh
# install from github with hash
# maybe need `yarn cache clean`
yarn add github:airt/vbt#hash000 -D
```

## usage

### scripts

```sh
# serve with hot reload
vbt dev

# run unit tests
vbt test unit

# run e2e tests
vbt test e2e

# build for production
vbt build
```

### package.json

```json
{
  "private": true,
  "dependencies": {
    "vue": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^2.1.0",
    "vbt": "github:airt/vbt#hash000"
  },
  "entry": {
    "app": "src/index.js"
  },
  "scripts": {
    "dev": "vbt dev",
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "vbt test unit",
    "test:e2e": "vbt test e2e",
    "build": "vbt build"
  }
}
```

### directories

```
src                     → application sources
 └ index.js             → bootstrap
test                    → application tests
 └ e2e                  → e2e tests
 └ unit                 → unit tests
static                  → static asset files
proxy.config.js         → dev server proxy config
dist                    → generated stuff
```

## todo

maybe u need install something manually

```sh
node node_modules/chromedriver/install.js
node node_modules/phantomjs-prebuilt/install.js
```

## license

MIT

[build-badge]: https://img.shields.io/travis/airt/vbt/develop.svg
[build-status]: https://travis-ci.org/airt/vbt
