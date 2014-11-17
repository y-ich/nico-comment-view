.SUFFIXES: .coffee .js
nico-comment-view.js:

doc:
	coffeedoc -o docs .

.coffee.js:
	coffee -c $^