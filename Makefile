build:
	mend build -s '{"title": "Index", "filename": "index.html"}' ./src/index.html > ./docs/index.html
	mend build -s '{"title": "Artwork", "filename": "artwork.html"}' ./src/artwork.html > ./docs/artwork.html
	mend build -s '{"title": "Website theme", "filename": "theme.html"}' ./src/theme.html > ./docs/theme.html
