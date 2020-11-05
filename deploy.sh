#!/usr/bin/env sh

set -e

npm run build

cd dist
git init
git add -A
git commit -m 'Upload demo page'

git push -f git@github.com:RihSi/hackathon-stb.git master:gh-pages

cd -