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
const date = document.getElementById("dateInput");
const genderInfo = document.getElementById("gender");
const userName = document.getElementById("username");
const password = document.getElementById("password");

let currentStep = 0;
let user = {};

function setError(element, message) {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".errors");

	errorDisplay.innerText = message;
}

function removeErrorMessage(element) {
	const btnContainer = element.parentElement;
	const inputControl = btnContainer.parentElement;
	if (inputControl) {
		const errorDisplay = inputControl.querySelectorAll(".errors");

		if (errorDisplay) {
			errorDisplay.forEach((element) => {
				element.innerText = "";
			});
		}
	}
}

const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	);
};

function formValidation(buttonId, buttonElement) {
	switch (buttonId) {
		case "next-btn-1":
			const firstNameValue = document.getElementById("firstName").value.trim();
			const lastNameValue = document.getElementById("lastName").value.trim();
			removeErrorMessage(buttonElement);

			if (firstNameValue === "") {
				setError(document.getElementById("firstName"), "First Name is required");
				return false;
			} else if (lastNameValue === "") {
				setError(document.getElementById("lastName"), "Last Name is required");
				return false;
			} else {
				user.name = { firstName: firstNameValue, lastName: lastNameValue };
				console.log(user);
			}
			break;
		case "next-btn-2":
			const phoneNumberValue = phoneNumber.value.trim();
			const mailAddressValue = mailAddress.value.trim();
			removeErrorMessage(buttonElement);

			if (isNaN(phoneNumberValue) || phoneNumberValue === "") {
				setError(phoneNumber, "Phone should be only numbers");
				return false;
			} else if (!validateEmail(mailAddressValue) || mailAddressValue === "") {
				setError(mailAddress, "Invalid email address");
				return false;
			} else {
				user.contact = { phone: phoneNumberValue, email: mailAddressValue };
				console.log(user);
			}
			break;
		case "next-btn-3":
			const dateValue = date.value.trim();
			const genderInfoValue = genderInfo.value.trim();
			removeErrorMessage(buttonElement);

			if (dateValue === "Date is required") {
				setError(dateValue, "");
				return false;
			} else if (genderInfoValue === "") {
				setError(genderInfo, "Gender is required");
				return false;
			} else {
				user.personal = { gender: genderInfoValue, birthdate: dateValue };
				console.log(user);
			}
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
		const valid = formValidation(buttonId, button);

		if (currentStep < 3 && valid) {
			currentStep++;
			updateSlidePosition();
			progressFilling();
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
