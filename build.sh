#!/usr/bin/env bash

# exit on error

set -o errexit

yarn build
yarn typeorm migration:run -d ./src/data-source
