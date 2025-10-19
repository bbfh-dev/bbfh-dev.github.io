EYECONS_DIR=/tmp/eyecons

# LOCATION=$(curl -s https://api.github.com/repos/bbfh-dev/eyecons/releases/latest | jq -r '.assets.[0].browser_download_url')
# echo $LOCATION
# curl -L -o /tmp/eyecons.tar.gz $LOCATION
# rm -rf $EYECONS_DIR
# mkdir -p $EYECONS_DIR
# tar -xzf /tmp/eyecons.tar.gz -C $EYECONS_DIR
# ls $EYECONS_DIR/symbolic/web/ > $EYECONS_DIR/INDEX

echo "" > ./src/gen/__eyecons.html
for file in ${EYECONS_DIR}/symbolic/web/*; do
    name=$(basename $file)
    name=${name%.svg}

    echo '<button class="eyecons-icon" onclick="downloadIcon(this)" title="Click to copy HTML">' >> ./src/gen/__eyecons.html
    cat ${EYECONS_DIR}/symbolic/web/${name}.svg >> ./src/gen/__eyecons.html
    echo '</button>' >> ./src/gen/__eyecons.html
done
