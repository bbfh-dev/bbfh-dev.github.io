build:
	mend build -s '{"space": "Home", "title": "Index", "filename": "index.html"}' ./src/index.html > ./docs/index.html
	mend build -s '{"space": "Home", "title": "Artwork", "filename": "artwork.html"}' ./src/artwork.html > ./docs/artwork.html
	mend build -s '{"space": "Home", "title": "Minecraft projects", "filename": "minecraft.html"}' ./src/minecraft.html > ./docs/minecraft.html
	mend build -s '{"space": "Home", "title": "Website theme", "filename": "theme.html"}' ./src/theme.html > ./docs/theme.html
	mend build -s '{"space": "Home", "title": "Eyecons", "filename": "eyecons.html"}' ./src/eyecons.html > ./docs/eyecons.html

	mend build -s '{"space": "Generators", "title": "Index", "filename": "index.html"}' ./src/gen/index.html > ./docs/gen/index.html
	mend build -s '{"space": "Generators", "title": "Replay browser", "filename": "rl_replays.html"}' ./src/gen/rl_replays.html > ./docs/gen/rl_replays.html
	@echo "Finished building"

watch:
	reflex -r 'src/' make build
