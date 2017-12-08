#!/usr/bin/env bash

set -ex

yarn link || npm link

test/test-one-example.sh examples/simple
