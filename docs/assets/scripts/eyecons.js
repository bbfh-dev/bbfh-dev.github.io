/**
 * @param {string} path
 * @returns {string[]}
 */
async function GetIndex(path) {
	const response = await fetch(`${path}/INDEX`);
	const body = await response.text();
	return body.split("\n").filter((value) => value);
}

/**
 * @param {string} endpoint
 * @returns {string}
 */
async function GetHTML(endpoint) {
	const response = await fetch(endpoint);
	const body = await response.text();
	return body;
}

GetIndex("/assets/images/eyecons_pixelart").then((filenames) => {
	document.getElementById("eyecons_pixelart").innerHTML = "";

	for (const filename of filenames) {
		document.getElementById("eyecons_pixelart").innerHTML +=
			`<img src="/assets/images/eyecons_pixelart/${filename}" alt="${filename}" />`;
	}
});

GetHTML("/assets/images/eyecons/ALL").then((body) => {
	document.getElementById("eyecons").innerHTML = body;
});

/**
 * @param {HTMLElement} node
 */
function onPreviewSizeChanged(node) {
	document.getElementById("eyecons").dataset.size = node.value;
	document.getElementById("eyecons_pixelart").dataset.size = node.value;
}

onPreviewSizeChanged(document.getElementById("size"));
