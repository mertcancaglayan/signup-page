const slide = document.querySelector(".slider");
const nextBtns = document.querySelectorAll(".btn-next");
const previousBtns = document.querySelectorAll(".btn-previous");
const progressSteps = document.querySelectorAll(".progress-step");
const progress = document.getElementById("progress");
const form = document.getElementById("form");

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const phoneNumber = document.getElementById("phone");
const mailAddress = document.getElementById("mail");
const date = document.getElementById("date");
const genderInfo = document.getElementById("gender");
const userName = document.getElementById("username");
const password = document.getElementById("password");

let currentStep = 0;

function setError(element, message) {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".errors");

	errorDisplay.innerText = message;
}

function removeErrorMessage(element) {
    const btnContainer = element.parentElement;
	const inputControl = btnContainer.parentElement;
    if (inputControl) {
        const errorDisplay = inputControl.querySelector(".errors");

        if (errorDisplay) {
            errorDisplay.innerText = "";
        } else {
            console.error("Error: '.errors' element not found inside input control.");
        }
    } else {
        console.error("Error: Parent element not found for the provided element.");
    }
}

function formValidation(buttonId) {
	switch (buttonId) {
		case "next-btn-1":
			const firstNameValue = document.getElementById("firstName").value.trim();
			const lastNameValue = document.getElementById("lastName").value.trim();

			if (firstNameValue === "") {
				setError(document.getElementById("firstName"), "First Name is required");
				return false;
			} else if (lastNameValue === "") {
				setError(document.getElementById("lastName"), "Last Name is required");
				return false;
			} 
			break;
		case "next-btn-2":
			console.log("Button btn-2 clicked!");
			break;
		case "next-btn-3":
			console.log("Button btn-3 clicked!");
			break;
		default:
			// Handle default case if needed
			break;
	}

	return true;
}

nextBtns.forEach((button) => {
	button.addEventListener("click", () => {
		const buttonId = button.getAttribute("id");
		const valid = formValidation(buttonId);

		if (currentStep < 3 && valid) {
			currentStep++;
			updateSlidePosition();
			progressFilling();
			removeErrorMessage(button);

		}
	});
});

previousBtns.forEach((button) => {
	button.addEventListener("click", () => {
		if (currentStep > 0) {
			currentStep--;
			updateSlidePosition();
			progressFilling();
		}
	});
});

function updateSlidePosition() {
	slide.style.transition = "margin 0.5s ease-in-out";
	slide.style.marginLeft = `-${currentStep * 100}%`;
}

function progressFilling() {
	progressSteps.forEach((step, index) => {
		if (index < currentStep) {
			step.querySelector(".check").style.display = "flex";
		} else if (index === currentStep) {
			step.classList.add("step-active");

			step.querySelector(".check").style.display = "none";
		} else {
			step.classList.remove("step-active");
			step.querySelector(".check").style.display = "none";
		}
	});

	const progressActive = document.querySelectorAll(".step-active");
	progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

progressFilling();
