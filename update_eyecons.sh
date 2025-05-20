LOCATION=$(curl -s https://api.github.com/repos/bbfh-dev/eyecons/releases/latest | jq -r '.assets.[0].browser_download_url')
echo $LOCATION
curl -L -o /tmp/eyecons.tar.gz $LOCATION
rm -rf /tmp/eyecons/
mkdir -p /tmp/eyecons/
tar -xzf /tmp/eyecons.tar.gz -C /tmp/eyecons/

rm -rf ./docs/assets/images/eyecons/
rm -rf ./docs/assets/images/eyecons_pixelart/
mv /tmp/eyecons/symbolic/web/ ./docs/assets/images/eyecons/
mv /tmp/eyecons/raster/pixelart/64x64/ ./docs/assets/images/eyecons_pixelart/

ls ./docs/assets/images/eyecons_pixelart/ > ./docs/assets/images/eyecons_pixelart/.index
ls ./docs/assets/images/eyecons/ > ./docs/assets/images/eyecons/.index

cat ./docs/assets/images/eyecons/*.svg > ./docs/assets/images/eyecons/.all.svg
