#!/bin/bash

rm -rf ./_site
mkdir -p ./_site
cp ./src/robots.txt ./_site/.
cp ./src/CNAME ./_site/.

# Assets
cp -r ./assets ./_site/.
for file in ./_site/assets/styles/*.css; do
	dest=${file%.css}.min.css
	esbuild --minify $file >$dest &
done

get_checksum() {
	file=$1
	sha256sum $file | cut -d ' ' -f1
}

input='debug=true'

set_checksum() {
	name=$1
	file=$2
	printf "%s,checksums.%s=%s" $input $1 "$(get_checksum $2)"
}

input=$(set_checksum "style_reset" ./_site/assets/styles/01_reset.min.css)
input=$(set_checksum "style_fonts" ./_site/assets/styles/02_fonts.min.css)
input=$(set_checksum "style_utils" ./_site/assets/styles/03_utils.min.css)
input=$(set_checksum "style_main" ./_site/assets/styles/50_main.min.css)
input=$(set_checksum "style_shared" ./_site/assets/styles/51_shared.min.css)
input=$(set_checksum "style_responsive" ./_site/assets/styles/99_responsive.min.css)
input=$(set_checksum "script_index" ./_site/assets/scripts/index.js)

# Pages
mend --input "$input" ./src/index.html >./_site/index.html &
mend --input "$input" ./src/artwork.html >./_site/artwork.html &
mend --input "$input" ./src/minecraft_unicode.html >./_site/minecraft_unicode.html &

wait
echo "Done."
