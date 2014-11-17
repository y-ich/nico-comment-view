.SUFFIXES: .coffee .js
nico-comment-niew.js:

doc:
	coffeedoc -o docs .

.coffee.js:
	coffee -c $^