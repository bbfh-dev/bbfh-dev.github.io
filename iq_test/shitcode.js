var IQ = 70;
var QUIZ = [
	{
		question: "What is the best linux distro?",
		image: null,
		answers: [
			{ label: "arch", image: null, diff: +15 },
			{ label: "gentoo", image: null, diff: +30 },
			{ label: "ubuntu", image: null, diff: -40 },
			{ label: "what's a linux distro?", image: null, diff: -55 },
		],
	},
	{
		question: "Select correct answer.",
		image: "images/q1.jpg",
		answers: [
			{ label: null, image: "images/a1-1.jpg", diff: -5 },
			{ label: null, image: "images/a1-2.jpg", diff: -5 },
			{ label: null, image: "images/a1-3.jpg", diff: -5 },
			{ label: null, image: "images/a1-4.jpg", diff: +20 },
		],
	},
	{
		question: "What is a secure password?",
		image: null,
		answers: [
			{ label: "qwerty123", image: null, diff: -10 },
			{ label: "tux1998", image: null, diff: -10 },
			{ label: "Password1", image: null, diff: -5 },
			{ label: "as91nz0al5_12%", image: null, diff: +10 },
		],
	},
	{
		question: "Describe this image.",
		image: "images/tux.png",
		answers: [
			{ label: "wow.", image: null, diff: +8 },
			{ label: "inappropriate! 🤓", image: null, diff: -20 },
			{ label: "me fr 🤤", image: null, diff: +10 },
		],
	},
	{
		question: "Who is the best YouTuber?",
		image: null,
		answers: [
			{ label: "MrBreast", image: null, diff: -15 },
			{ label: "PewdingPie", image: null, diff: -9 },
			{ label: "LernixTV", image: null, diff: +10 },
			{ label: "BubelFish", image: null, diff: +0 },
			{ label: "MetalOutlow", image: null, diff: +6 },
			{ label: "LukSmith", image: null, diff: +6 },
			{ label: "I don't know any of them!", image: null, diff: -15 },
		],
	},
	{
		question: "What person uses this profile picture?",
		image: "images/learnix.webp",
		answers: [
			{ label: "LukeSmith's deepfake", image: null, diff: +6 },
			{ label: "MentalOutlaw's deepfake", image: null, diff: +6 },
			{ label: "None of the above", image: null, diff: -4 },
		],
	},
	{
		question: "Define systemd.",
		image: null,
		answers: [
			{ label: "Bloat.", image: null, diff: +6 },
			{
				label: "Company that tries to standartize linux.",
				image: null,
				diff: -4,
			},
			{
				label: "Reason why linux will become more popular.",
				image: null,
				diff: -6,
			},
			{ label: "I use arch btw.", image: null, diff: -10 },
			{ label: "I use artix btw.", image: null, diff: 0 },
		],
	},
	{
		question: "What OS do you dualboot?",
		image: null,
		answers: [
			{ label: "Windows", image: null, diff: -10 },
			{ label: "MacOS", image: null, diff: -10 },
			{ label: "Another linux distro", image: null, diff: +3 },
			{ label: "None", image: null, diff: +6 },
		],
	},
];

function optional(item, html) {
	if (item === null) {
		return "";
	}
	return String(html).replace("%s", item);
}

function answers(items) {
	const result = [];
	let i = 0;
	for (const answer of items) {
		result.push(`<div>`);
		result.push(
			`<input type="radio" id="${i}" value="${answer.diff}" onchange="answer()" />`,
		);
		result.push(`<label for="${i}">`);
		if (answer.label === null && answer.image !== null) {
			result.push(`<img src="${answer.image}" />`);
		} else {
			result.push(`<span>${answer.label}</span>`);
		}
		result.push(`</label>`);
		result.push(`</div>`);
		i += 1;
	}
	return result.join("\n");
}

// Delete random shit from QUIZ and return it as HTML
// Return null if no more questions are found
function randomQuestion() {
	if (QUIZ.length === 0) {
		return null;
	}

	const item = QUIZ.splice(Math.floor(Math.random() * QUIZ.length), 1);
	return [
		`<h1>${item[0].question}</h1>`,
		optional(item[0].image, `<img src="%s" />`),
		"<div>",
		answers(item[0].answers),
		"</div>",
	].join("\n");
}

function update(element) {
	let question = randomQuestion();
	if (question === null) {
		element.innerHTML = `<h1>Your IQ is ${IQ}</h1>`;
	} else {
		element.innerHTML = question;
	}
}

function answer() {
	document.querySelectorAll("input").forEach((input) => {
		if (input.checked) {
			console.log(input.id);
			IQ += Number(input.value);
			update(document.querySelector("main"));
		}
	});
}
