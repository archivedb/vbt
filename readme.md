# vbt

[![Build Status][build-badge]][build-status]

build scripts extracted from [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)

## support

- [x] unit tests with karma
- [x] e2e tests with nightwatch
- [x] hot reload
- [x] typescript
- [ ] custom configurations

## installation

```sh
# install from github
yarn add github:airt/vbt#develop -D

# install from github with tag
yarn add github:airt/vbt#v0.0.1 -D

# install from github with hash
# maybe need `yarn cache clean`
yarn add github:airt/vbt#hash000 -D
```

## usage

[examples/simple](https://github.com/airt/vbt/tree/develop/examples/simple)

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

### project structure

```text
src                     → application sources
 └ index.js             → application entry
 └ index.html           → html template
test                    → application tests
 └ e2e                  → e2e tests
  └ specs               → e2e specs
 └ unit                 → unit tests
  └ specs               → unit specs
  └ index.js            → unit entry
config                  → project config files
 └ proxy.js             → dev server proxy config
static                  → static assets
dist                    → generated stuff
```

## license

MIT

[build-badge]: https://img.shields.io/travis/airt/vbt/develop.svg
[build-status]: https://travis-ci.org/airt/vbt
