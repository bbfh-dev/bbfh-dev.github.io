const root = document.querySelector("#root");

/**
 * @param {boolean} is_right
 */
function scrollOnMobile(is_right) {
	root.scrollTo({
		left: is_right ? root.scrollLeftMax : 0,
		top: 0,
		behavior: "smooth",
	});
}

// Default to the page
scrollOnMobile(true);
