const slide = document.querySelector(".slider");
const nextBtns = document.querySelectorAll(".btn-next");
const previousBtns = document.querySelectorAll(".btn-previous");
const progressSteps = document.querySelectorAll(".progress-step");
const progress = document.getElementById("progress");

let currentStep = 0;

nextBtns.forEach((button) => {
	button.addEventListener("click", () => {
		if (currentStep < 3) {
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
