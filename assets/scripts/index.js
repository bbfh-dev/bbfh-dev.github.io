/** @type {HTMLDivElement} */
const root_element = document.getElementById("root");

/**
 * @param {boolean} is_right
 */
function scrollOnMobile(is_right) {
	root_element.scrollTo({
		left: is_right ? root_element.scrollLeftMax : 0,
		top: 0,
		behavior: "smooth",
	});
}

// Default to the page
scrollOnMobile(true);
