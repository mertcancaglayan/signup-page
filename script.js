const slide = document.querySelector(".slider");
const lastNextBtn = document.querySelector("#next-btn-4");
const nextBtns = document.querySelectorAll(".btn-next");
const previousBtns = document.querySelectorAll(".btn-previous");
const submitBtn = document.querySelector(".btn-submit");
const notification = document.querySelector(".notification")
const toast = document.querySelector(".toast")

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

function validatePassword(password) {
	if (password.length < 8) {
		return "Password must be at least 8 characters long.";
	}

	const uppercaseRegex = /[A-Z]/;
	if (!uppercaseRegex.test(password)) {
		return "Password must contain at least one uppercase letter.";
	}

	const lowercaseRegex = /[a-z]/;
	if (!lowercaseRegex.test(password)) {
		return "Password must contain at least one lowercase letter.";
	}

	const numericRegex = /[0-9]/;
	if (!numericRegex.test(password)) {
		return "Password must contain at least one numeric digit.";
	}

	const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
	if (!specialCharacterRegex.test(password)) {
		return "Password must contain at least one special character.";
	}

	return true;
}

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
			const genderInfoValue = genderInfo.value;
			removeErrorMessage(buttonElement);

			if (dateValue === "") {
				setError(date, "Date is required");
				return false;
			} else if (genderInfoValue === "") {
				setError(genderInfo, "Gender is required");
				return false;
			} else {
				user.personal = { gender: genderInfoValue, birthdate: dateValue };
				console.log(user);
			}
			break;
		case "next-btn-4":
			const userNameValue = userName.value.trim();
			const passwordValue = password.value;
			removeErrorMessage(buttonElement);

			const passwordValidationResult = validatePassword(passwordValue);
			if (passwordValidationResult !== true) {
				setError(password, passwordValidationResult);
				return false;
			} else {
				user.username = { username: userNameValue, password: passwordValue };
				console.log(user);
				buttonElement.style.display = "none";
				submitBtn.style.display = "flex";
			}
			break;

		default:
			break;
	}

	return true;
}

let currentStepInputs;

function focusOnFirstInput(param) {
	currentStepInputs = document.querySelectorAll(`.form-area:nth-child(${currentStep + 1}) .form-input`);

	console.log(currentStepInputs);
	if (currentStepInputs.length > 0) {
		currentStepInputs[0].focus();
	}
}

function generateUniqueId(user) {
	const timestamp = new Date().getTime();
	const uniqueId = `${user.username.username}_${timestamp}`;
	return uniqueId;
}

function submitted() {
	const userId = generateUniqueId(user);
	user.userId = userId;
	localStorage.setItem("users", JSON.stringify(user));
	notification.style.display = "flex"
	setTimeout(() => {
		notification.style.display = "none"
		location.reload()
	}, 5500);


}

window.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		const buttonId = `next-btn-${currentStep + 1}`;
		const valid = formValidation(buttonId, document.getElementById(buttonId));
		event.preventDefault();

		if (currentStep < 3 && valid) {
			currentStep++;
			updateSlidePosition();
			progressFilling();
			setTimeout(() => {
				focusOnFirstInput();
			}, 500);
		} else if (currentStep === 3) {
			progressFilling();
		}

		event.preventDefault();
	}
});

nextBtns.forEach((button) => {
	button.addEventListener("click", (event) => {
		const buttonId = button.getAttribute("id");
		const valid = formValidation(buttonId, button);
		event.preventDefault();

		if (currentStep < 3 && valid) {
			currentStep++;
			updateSlidePosition();
			progressFilling();
			setTimeout(() => {
				focusOnFirstInput();
			}, 500);
		} else if (currentStep === 3) {
			progressFilling();
		}
	});
});

submitBtn.addEventListener("click", (event) => {
	event.preventDefault();
	submitted();
});

previousBtns.forEach((button) => {
	button.addEventListener("click", () => {
		if (currentStep > 0) {
			currentStep--;
			updateSlidePosition();
			progressFilling();
			setTimeout(() => {
				focusOnFirstInput();
			}, 500);
		}

		lastNextBtn.style.display = "flex";
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
