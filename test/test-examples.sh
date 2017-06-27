#!/usr/bin/env bash

set -e
set -x

yarn link || npm link

test/test-one-example.sh examples/simple
