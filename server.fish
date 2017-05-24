#!/usr/bin/fish
set SRC src
set DIST $PWD/look
set STYLUS $SRC/stylus
set PUG $SRC/index.pug
choco server & pug -w -D $PUG -o $PWD & stylus -w $STYLUS -c -o $DIST
