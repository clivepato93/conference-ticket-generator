const fullName = document.getElementById("name");
const emailAddress = document.getElementById("email");
const gitName = document.getElementById("githubname");
const fileInput = document.getElementById("file");
let name = ''
let email = ''
let githubname = ''
const fileButtons = document.querySelector(".file-buttons");
const changeBtn = document.querySelector(".change");
const removeBtn = document.querySelector(".remove");
const label = document.querySelector('.label');
const submit = document.querySelector('.submit');
let img = "";

gitName.addEventListener('focusout',function(e){
	// ^\S+@\S+\.\S+$
	if(/^@{1}[^\s@]+$/.test(e.target.value) === false){
		document.querySelector('.git-error').classList.remove('hidden')
		document.querySelector('.git-error').classList.add('block')

		}

	else{
		document.querySelector('.git-error').classList.remove('block')
		document.querySelector('.git-error').classList.add('hidden')

	}
})

emailAddress.addEventListener('focusout',function(e){
	// ^\S+@\S+\.\S+$
	if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value) === false){
		document.querySelector('.email-error').classList.remove('hidden')
		document.querySelector('.email-error').classList.add('block')

		}

	else{
		document.querySelector('.email-error').classList.remove('block')
		document.querySelector('.email-error').classList.add('hidden')

	}
})

function returnFileSize(number) {

		return (number / 1e3).toFixed(1);
	
}

submit.addEventListener('click',function(e){
e.preventDefault();

})

fullName.addEventListener('focusout',function(e){
	// debugger
	if(e.target.value.length==0){
		document.querySelector('.name-error').classList.remove('hidden')
		document.querySelector('.name-error').classList.add('block')

		}

	else{
		document.querySelector('.name-error').classList.remove('block')
		document.querySelector('.name-error').classList.add('hidden')

	}
})


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

document.querySelector(".file-box").addEventListener("dragleave",function(e){
	document.querySelector(".file-box").classList.remove("bg-Neutral-700");

})


// repetive as hell will refactor


document.querySelector(".file-box").addEventListener("dragleave", (e) => {
	e.preventDefault();
	console.log("dragover");
	document.querySelector(".file-box").style.backgroundColor = "";
});

// function testing2(){

// }

// fileInput.addEventListener('click',testing2)

function upload(e){
	// debugger
    console.log(e);
	const file = fileInput.files;
	console.log(fileInput.files);

    if (!document.querySelector(".upload-info").classList.contains("hidden")) {
		hideInstructions();
	}

	if(returnFileSize(fileInput.files[0].size)>500){
		document.querySelector('.file-info').classList.add('text-Gradient-text');
		document.querySelector('.file-text').textContent = 'File too large. Please upload a photo under 500KB.'
		
		document.querySelector('.icon').classList.add('error');
		return
	}

	if (fileInput.files.length) {
		fileButtons.classList.toggle("hidden",false);
		fileButtons.classList.toggle("flex",true);
		console.log(returnFileSize(fileInput.files[0].size));
		img = URL.createObjectURL(fileInput.files[0]);
		document.querySelector(".upload").src = img;
		document.querySelector(".upload").classList.remove('p-2')
     
	} else {
		hideInstructions();
		return;
	}
}

fileInput.addEventListener("change", upload);

removeBtn.addEventListener("click", (e) => {
    // debugger;
    console.log('test')
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
	if(returnFileSize(e.dataTransfer.files[0].size)>500){
document.querySelector('.file-info').classList.add('text-Gradient-text');
document.querySelector('.file-text').textContent = 'File too large. Please upload a photo under 500KB.'

document.querySelector('.icon').classList.add('error');
return
	}

	else{
		document.querySelector('.file-text').textContent = 'Upload your photo (JPG or PNG, max size: 500KB).'
		img = URL.createObjectURL(e.dataTransfer.files[0]);
		document.querySelector(".upload").src = img;
		document.querySelector('.file-info').classList.remove('text-Gradient-text');

document.querySelector('.icon').classList.remove('error');
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


changeBtn.addEventListener('click',(e)=>{
	console.log('from the change')
    e.preventDefault()
	// debugger
    fileInput.click();
//     document.querySelector('.upload').src = URL.createObjectURL(fileInput.files[0])
//     fileButtons.classList.toggle('hidden')
//         fileButtons.classList.toggle('block')
//         document.querySelector('.upload-info').classList.toggle('hidden')
// // need to redo logic a bit
//         fileButtons.classList.toggle('block')
//         fileButtons.classList.toggle('hidden')
    })
