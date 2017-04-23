#!/usr/bin/env bash

set -e
set -x

yarn link || npm link

cd examples/simple

yarn || npm i

yarn link vbt || npm link vbt

npm run lint
npm run test
npm run build
npm run clean

cd ../..
