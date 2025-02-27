var TOTAL = 5;
var CORRECT = 0;

function answer(element) {
	let selected = "";
	element.parentElement.querySelectorAll("input").forEach((input) => {
		if (input.checked) {
			if (input.dataset.correct === "true") {
				CORRECT += 1;
			}
			selected = input.id;
		}
	});
	if (!selected) {
		return;
	}

	element.parentElement.querySelectorAll(".result").forEach((result) => {
		if (result.dataset.opt === selected) {
			result.hidden = false;
			element.disabled = true;
		}
	});
}

function finish() {
	alert(`You got ${CORRECT} out of ${TOTAL} right!`);
}
