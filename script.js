// form inputs
const fileInput = document.getElementById("file");
const fullName = document.getElementById("name");
const emailAddress = document.getElementById("email");
const gitName = document.getElementById("githubname");
let imgFile;

const fileButtons = document.querySelector(".file-buttons");
const changeBtn = document.querySelector(".change");
const removeBtn = document.querySelector(".remove");
const submit = document.querySelector(".submit");
let img = "";

const getElement = (selector) => document.querySelector(selector);

const show = (selector) => {
	const el = getElement(selector);
	el.classList.remove("hidden");
	el.classList.add("flex");
	return true;
};

const hide = (selector) => {
	const el = getElement(selector);
	el.classList.remove("flex");
	el.classList.add("hidden");
	return false;
};

function inputValidation(element, pattern, errorSelector) {
	return pattern.test(element.value)
		? hide(errorSelector)
		: show(errorSelector);
}

fullName.addEventListener("focusout", function (e) {
	// debugger
	inputValidation(e.target, /^[^\s@]+\s[^\s@]+$/, ".name-error");
});

emailAddress.addEventListener("focusout", function (e) {
	inputValidation(e.target, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, ".email-error");
});

gitName.addEventListener("focusout", function (e) {
	inputValidation(e.target, /^@{1}[^\s@]+$/, ".git-error");
});

function returnFileSize(number) {
	return (number / 1e3).toFixed(1);
}

submit.addEventListener("click", function (e) {
	e.preventDefault();

	const main = document.querySelector("main");

	if (
		fileInput.files.length &&
		inputValidation(
			fullName.value,
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			".email-error"
		) &&
		inputValidation(emailAddress.value, /^@{1}[^\s@]+$/, ".git-error") &&
		inputValidation(gitName.value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, ".email-error")
	) {
		main.innerHTML = "";
		main.innerHTML = `<img
	src="/assets/images/logo-full.svg"
	alt="logo"
	class="mb-4 laptop:mb-12 mt-8 bg-Neutral-900"
	/>
	
	<h1 class=" text-[7vw] text-center laptop:text-6xl">
	Congrats,<span
	class="text-transparent bg-gradient-to-r from-Gradient-text to-Gradient-text2 bg-clip-text"
	>${fullName.value}!
	</span>
	<br class="hidden laptop:block" />
	Your ticket is ready.
	</h1>
	<h2
	class="text-Neutral-500 text-[1.2rem] laptop:text-[1.5rem] text-center w-[80%] laptop:w-[40%]"
	>
	We've emailed your ticket to
	<span class="text-Gradient-text">${emailAddress.value}</span>
	and will send updates in the run up to the event.
	</h2>
	<section
	class=" text-left mt-20 ticket bg-[url(/assets/images/pattern-ticket.svg)] bg-no-repeat w-[303px] h-[151px] sm:w-[600px] sm:h-[280px] bg-contain p-4 sm:p-10 flex flex-col justify-between gap-4"
	>
	
	<div class="top">
	<img src="/assets/images/logo-full.svg" alt="" />
	<h3 class="ml-12 text-[12px] sm:text-xl text-Neutral-500">Jan 31, 2025 / Austin, TX</h3>
	</div>
	<div class="bottom flex gap-4">
	<img
	src="${imgFile}"
	alt=""
	class="w-[40px] sm:w-[80px] rounded-2xl"
	/>
	<div class="">
	<h3 class="sm:text-3xl">${fullName.value}</h3>
	<div class="flex gap-2">
	<img src="/assets/images/icon-github.svg" alt="" class="sm:w-[30px]"/>
	<h4 class="sm:text-3xl">${gitName.value}</h4>
	</div>
	</div>
	<h3
	class="absolute rotate-90 right-[-3%] top-[38%] sm:top-[45%] sm:right-[5%] text-Neutral-500 text-2xl"
	>
	#01609
	</h3>
	</div>
	<div class='relative'>
		<img
		src="/assets/images/pattern-circle.svg"
		alt=""
		class="fixed laptop:absolute -z-10 right-0 laptop:right-[-30%]"
		/>
	</div>
	</section>`;
	}

	else{

	}
});

document.body.addEventListener("drop", (e) => e.preventDefault());

document.body.addEventListener("dragover", (e) => e.preventDefault());

function toggleInstructions() {
	document.querySelector(".upload-info").classList.toggle("hidden");
}

function hideInstructions() {
	document.querySelector(".upload-info").classList.add("hidden");
}

document.querySelector(".file-box").addEventListener("dragover", (e) => {
	e.preventDefault();
	console.log("dragover");
	if (
		document.querySelector(".file-box").classList.contains("bg-Neutral-700")
	) {
		return;
	} else {
		document.querySelector(".file-box").classList.toggle("bg-Neutral-700");
	}
});

document.querySelector(".file-box").addEventListener("dragleave", function (e) {
	document.querySelector(".file-box").classList.remove("bg-Neutral-700");
});

// repetive as hell will refactor

document.querySelector(".file-box").addEventListener("dragleave", (e) => {
	e.preventDefault();
	console.log("dragover");
	document.querySelector(".file-box").style.backgroundColor = "";
});

function upload(e) {
	// debugger
	console.log(e);
	let file = fileInput.files;
	console.log(fileInput.files);

	// if (!document.querySelector(".upload-info").classList.contains("hidden")) {
	// 	hideInstructions();
	// }

	if (returnFileSize(fileInput.files[0].size) > 500) {
		document.querySelector(".file-info").classList.add("text-Gradient-text");
		document.querySelector(".file-text").textContent =
			"File too large. Please upload a photo under 500KB.";

		document.querySelector(".icon").classList.add("error");
		return;
	}

	// if (returnFileSize(fileInput.files[0].size) <= 500 && document.querySelector(".icon").classList.contains('error')) {
	// 	document.querySelector(".file-info").classList.remove("text-Gradient-text");
	// 	document.querySelector(".file-text").textContent =
	// 		"Upload your photo (JPG or PNG, max size: 500KB).";

	// 	document.querySelector(".icon").classList.remove("error");
	// 	return;
	// }

	if (returnFileSize(fileInput.files[0].size) <= 500) {
		fileButtons.classList.toggle("hidden", false);
		fileButtons.classList.toggle("flex", true);
		console.log(returnFileSize(fileInput.files[0].size));
		imgFile = URL.createObjectURL(fileInput.files[0]);
		img = URL.createObjectURL(fileInput.files[0]);
		document.querySelector(".upload").src = img;
		document.querySelector(".upload").classList.remove("p-2");
		hideInstructions();
	} 
}

fileInput.addEventListener("change", upload);

removeBtn.addEventListener("click", (e) => {
	// debugger;
	console.log("test");
	e.preventDefault();
	fileButtons.classList.toggle("flex");
	fileButtons.classList.toggle("hidden");
	document.querySelector(".upload-info").classList.toggle("hidden");
	document.querySelector(".upload-info").classList.toggle("block");

	document.querySelector(".upload").src = "/assets/images/icon-upload.svg";
	console.log((fileInput.files[0] = ""));
});

document.querySelector(".file-box").addEventListener("drop", (e) => {
	document.querySelector(".file-box").classList.toggle("bg-Neutral-700");
	e.preventDefault();
	console.log("test");
	console.log(e.dataTransfer.files);
	console.log(returnFileSize(e.dataTransfer.files[0].size));
	if (returnFileSize(e.dataTransfer.files[0].size) > 500) {
		document.querySelector(".file-info").classList.add("text-Gradient-text");
		document.querySelector(".file-text").textContent =
			"File too large. Please upload a photo under 500KB.";

		document.querySelector(".icon").classList.add("error");
		return;
	} else {
		document.querySelector(".file-text").textContent =
			"Upload your photo (JPG or PNG, max size: 500KB).";
		img = URL.createObjectURL(e.dataTransfer.files[0]);
		document.querySelector(".upload").src = img;
		document.querySelector(".file-info").classList.remove("text-Gradient-text");

		document.querySelector(".icon").classList.remove("error");
		// debugger
	}
	if (!document.querySelector(".upload-info").classList.contains("hidden")) {
		hideInstructions();
	}

	if (fileButtons.classList.contains("flex")) {
		return;
	}

	if (fileButtons.classList.contains("hidden")) {
		fileButtons.classList.toggle("hidden");
		fileButtons.classList.toggle("flex");
	}
});

changeBtn.addEventListener("click", (e) => {
	console.log("from the change");
	e.preventDefault();
	fileInput.click();
});
