#!/usr/bin/fish
set SRC src
set DIST $PWD/look
set STYLUS $SRC/stylus
set PUG $SRC/index.pug
pug -w -D $PUG -o $PWD & stylus -w -m $STYLUS -c -o $DIST & choco server
