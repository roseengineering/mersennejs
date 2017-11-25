# note, node and libmozjs-24-bin need to be installed

all: mersennejs.min.js

%.min.js: %.js
	uglifyjs -c -m toplevel -o $@ $^ 

test: all
	python3 test/test.py

clean:
	rm -f mersennejs.min.js test/mt19937ar_test

.PHONY: all test clean


