#!/usr/bin/fish
set folder vendor/codemirror

rm -R $folder/**/.*
rm -R $folder/.*
rm -R $folder/node_modules
rm -R $folder/components
rm -R $folder/bin
rm -R $folder/src
rm -R $folder/demo
rm -R $folder/doc
rm -R $folder/test
rm -R $folder/index.html
rm -R $folder/package.json
rm -R $folder/mode/*/*test.js
rm -R $folder/mode/*/*.html