/**
 * @param {HTMLElement} node
 */
function onPreviewSizeChanged(node) {
	document.getElementById("eyecons").dataset.size = node.value;
}

onPreviewSizeChanged(document.getElementById("size"));

/**
 * @param {HTMLElement} node
 */
function getCleanInnerHTML(node) {
	const lines = node.innerHTML.split("\n");

	// Remove empty leading/trailing lines
	while (lines.length && !lines[0].trim()) lines.shift();
	while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

	// Find smallest indentation level (number of leading spaces/tabs)
	const indent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^[ \t]*/)[0].length));

	return lines.map((line) => line.slice(indent)).join("\n");
}

let timeoutId;
/**
 * @param {HTMLElement} node
 */
function downloadIcon(node) {
	self.clearTimeout(timeoutId);
	navigator.clipboard.writeText(getCleanInnerHTML(node));

	const popup = document.getElementById("copied-popup");
	popup.style.removeProperty("display");
	timeoutId = self.setTimeout(() => {
		popup.style.setProperty("display", "none");
	}, 500);
}
