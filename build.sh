#!/bin/sh

mkdir -p ./_site
cp -r ./assets ./_site/.
mend -i '{}' ./src/index.html >./_site/index.html
