#!/usr/bin/fish
set FOLDER vendor/codemirror
set BACKUP vendor/codemirror.back
set CODEMIRROR ../codemirror
set REMOTE https://github.com/codemirror/CodeMirror
set NOW $PWD

git clone $REMOTE $CODEMIRROR
cd $CODEMIRROR
git pull
npm install
cd $NOW
mv $FOLDER $BACKUP
cp -r $CODEMIRROR $FOLDER

rm -R $FOLDER/**/.*
rm -R $FOLDER/.*
rm -R $FOLDER/node_modules
rm -R $FOLDER/components
rm -R $FOLDER/bin
rm -R $FOLDER/src
rm -R $FOLDER/demo
rm -R $FOLDER/doc
rm -R $FOLDER/test
rm -R $FOLDER/index.html
rm -R $FOLDER/package.json
rm -R $FOLDER/mode/*/*test.js
rm -R $FOLDER/mode/*/*.html
