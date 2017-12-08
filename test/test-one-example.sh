#!/usr/bin/env bash

set -ex

examplepath=$1

cd "$examplepath"

yarn || npm i

yarn link vbt || npm link vbt

npm run clean
npm run lint
npm run test
npm run build
