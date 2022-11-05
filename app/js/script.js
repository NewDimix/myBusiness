const animItems = document.querySelectorAll(".animate");
const parallaxItems = document.querySelectorAll(".parallax");
const countItems = document.querySelectorAll(".advantageItem__count");

window.onload = function () {
	if (parallaxItems.length > 0) {
		window.addEventListener("scroll", function () {
			animOnScroll();
			parallaxEffect();
		});

		setTimeout(() => {
			animOnScroll();
		}, 300);

		parallaxEffect();
	}
};

function parallaxEffect() {
	for (let index = 0; index < parallaxItems.length; index++) {
		const parallaxItem = parallaxItems[index];
		const parallaxItemContent = parallaxItem.getElementsByClassName("parallax__content")[0];
		const parallaxItemHeight = parallaxItem.offsetHeight;
		const parallaxItemWidth = parallaxItem.offsetWidth;
		const parallaxItemContentHeight = parallaxItemContent.offsetHeight;
		const parallaxItemContentWidth = parallaxItemContent.offsetWidth;
		const parallaxItemOffset = offset(parallaxItem).top;

		const windowBottom = scrollY + window.innerHeight;

		if (windowBottom > parallaxItemOffset && scrollY < parallaxItemOffset + parallaxItemHeight) {
			parallaxItemContent.style.left = -1 * (scrollY / parallaxItemHeight) * ((parallaxItemContentWidth / parallaxItemWidth - 1) * 100) + "%";
		}
	}
}

function animOnScroll() {
	for (let index = 0; index < animItems.length; index++) {
		const animItem = animItems[index];
		const animItemHeight = animItem.offsetHeight;
		const animItemOffset = offset(animItem).top;
		const animStart = 4;

		let animItemPoint = animItemHeight / animStart;
		if (animItemHeight > window.innerHeight) {
			animItemPoint = window.innerHeight / animStart;
		}

		if (!animItem.classList.contains("animate_active")) {
			if (scrollY + window.innerHeight > animItemOffset + animItemPoint && scrollY < animItemOffset + animItemHeight - animItemPoint) {
				animItem.classList.add("animate_active");

				if (animItem.classList.contains("countAnimate")) {
					animateCount(animItem, 1.5, 100);
				}
			}
		} else {
			if (scrollY + window.innerHeight - 5 < animItemOffset || scrollY > animItemOffset + animItemHeight) {
				if (!animItem.classList.contains("animate_animNoHide")) {
					animItem.classList.remove("animate_active");
				}
			}
		}
	}
}

function offset(el) {
	const rect = el.getBoundingClientRect();
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	return {
		top: rect.top + scrollTop,
		left: rect.left + scrollLeft,
	};
}

function animateCount(el, time, length) {
	const maxCount = Number(el.textContent);
	let startCount = Math.round(maxCount - (maxCount / 100) * length);
	let timeStep = (time * 1000) / Math.round((maxCount / 100) * length);
	if (timeStep < 16) {
		startCount = Math.round(maxCount - (time * 1000) / 16);

		timeStep = 16;
	}
	let number = startCount;

	function drawStep() {
		el.textContent = number;
		number++;

		if (number > maxCount) {
			return;
		} else {
			setTimeout(drawStep, timeStep);
		}
	}

	drawStep();
}
