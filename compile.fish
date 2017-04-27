#!/usr/bin/fish
set src src/stylus/
set dist look/
stylus -w $src -c -o $dist
