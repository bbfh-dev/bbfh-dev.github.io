#!/bin/sh

rm -rf ./_site
mkdir -p ./_site
cp ./src/robots.txt ./_site/.

# Assets
cp -r ./assets ./_site/.
for file in ./_site/assets/styles/*.css; do
	dest=${file%.css}.min.css
	esbuild --minify $file >$dest &
done

function get_checksum {
	file=$1
	sha256sum $file | cut -d ' ' -f1
}

input='{}'

function set_checksum {
	name=$1
	file=$2
	echo $input | jq -M ".checksums.$1 |= \"$(get_checksum $2)\""
}

input=$(set_checksum "style_reset" ./_site/assets/styles/01_reset.min.css)
input=$(set_checksum "style_fonts" ./_site/assets/styles/02_fonts.min.css)
input=$(set_checksum "style_utils" ./_site/assets/styles/03_utils.min.css)
input=$(set_checksum "style_main" ./_site/assets/styles/50_main.min.css)
input=$(set_checksum "style_shared" ./_site/assets/styles/51_shared.min.css)
input=$(set_checksum "style_responsive" ./_site/assets/styles/99_responsive.min.css)
input=$(set_checksum "script_index" ./_site/assets/scripts/index.js)

# Pages
mend -i "$input" ./src/index.html >./_site/index.html &

wait
echo "Done."
