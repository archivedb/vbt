#!/usr/bin/env bash

cd examples/simple

yarn || npm i

npm run lint
npm test

npm run build

cd ../..
