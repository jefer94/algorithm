set SRC=src
set DIST=%cd%/look
set STYLUS=%SRC%/stylus
set PUG=%SRC%/index.pug
pug -w -D %PUG% -o %cd% & stylus -w -m %STYLUS% -c -o %DIST% & choco server
