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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhbmltSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFuaW1hdGVcIik7XHJcbmNvbnN0IHBhcmFsbGF4SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBhcmFsbGF4XCIpO1xyXG5jb25zdCBjb3VudEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hZHZhbnRhZ2VJdGVtX19jb3VudFwiKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHBhcmFsbGF4SXRlbXMubGVuZ3RoID4gMCkge1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRhbmltT25TY3JvbGwoKTtcclxuXHRcdFx0cGFyYWxsYXhFZmZlY3QoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRhbmltT25TY3JvbGwoKTtcclxuXHRcdH0sIDMwMCk7XHJcblxyXG5cdFx0cGFyYWxsYXhFZmZlY3QoKTtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBwYXJhbGxheEVmZmVjdCgpIHtcclxuXHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcGFyYWxsYXhJdGVtcy5sZW5ndGg7IGluZGV4KyspIHtcclxuXHRcdGNvbnN0IHBhcmFsbGF4SXRlbSA9IHBhcmFsbGF4SXRlbXNbaW5kZXhdO1xyXG5cdFx0Y29uc3QgcGFyYWxsYXhJdGVtQ29udGVudCA9IHBhcmFsbGF4SXRlbS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicGFyYWxsYXhfX2NvbnRlbnRcIilbMF07XHJcblx0XHRjb25zdCBwYXJhbGxheEl0ZW1IZWlnaHQgPSBwYXJhbGxheEl0ZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cdFx0Y29uc3QgcGFyYWxsYXhJdGVtV2lkdGggPSBwYXJhbGxheEl0ZW0ub2Zmc2V0V2lkdGg7XHJcblx0XHRjb25zdCBwYXJhbGxheEl0ZW1Db250ZW50SGVpZ2h0ID0gcGFyYWxsYXhJdGVtQ29udGVudC5vZmZzZXRIZWlnaHQ7XHJcblx0XHRjb25zdCBwYXJhbGxheEl0ZW1Db250ZW50V2lkdGggPSBwYXJhbGxheEl0ZW1Db250ZW50Lm9mZnNldFdpZHRoO1xyXG5cdFx0Y29uc3QgcGFyYWxsYXhJdGVtT2Zmc2V0ID0gb2Zmc2V0KHBhcmFsbGF4SXRlbSkudG9wO1xyXG5cclxuXHRcdGNvbnN0IHdpbmRvd0JvdHRvbSA9IHNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5cdFx0aWYgKHdpbmRvd0JvdHRvbSA+IHBhcmFsbGF4SXRlbU9mZnNldCAmJiBzY3JvbGxZIDwgcGFyYWxsYXhJdGVtT2Zmc2V0ICsgcGFyYWxsYXhJdGVtSGVpZ2h0KSB7XHJcblx0XHRcdHBhcmFsbGF4SXRlbUNvbnRlbnQuc3R5bGUubGVmdCA9IC0xICogKHNjcm9sbFkgLyBwYXJhbGxheEl0ZW1IZWlnaHQpICogKChwYXJhbGxheEl0ZW1Db250ZW50V2lkdGggLyBwYXJhbGxheEl0ZW1XaWR0aCAtIDEpICogMTAwKSArIFwiJVwiO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYW5pbU9uU2Nyb2xsKCkge1xyXG5cdGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbmltSXRlbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcblx0XHRjb25zdCBhbmltSXRlbSA9IGFuaW1JdGVtc1tpbmRleF07XHJcblx0XHRjb25zdCBhbmltSXRlbUhlaWdodCA9IGFuaW1JdGVtLm9mZnNldEhlaWdodDtcclxuXHRcdGNvbnN0IGFuaW1JdGVtT2Zmc2V0ID0gb2Zmc2V0KGFuaW1JdGVtKS50b3A7XHJcblx0XHRjb25zdCBhbmltU3RhcnQgPSA0O1xyXG5cclxuXHRcdGxldCBhbmltSXRlbVBvaW50ID0gYW5pbUl0ZW1IZWlnaHQgLyBhbmltU3RhcnQ7XHJcblx0XHRpZiAoYW5pbUl0ZW1IZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuXHRcdFx0YW5pbUl0ZW1Qb2ludCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIGFuaW1TdGFydDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWFuaW1JdGVtLmNsYXNzTGlzdC5jb250YWlucyhcImFuaW1hdGVfYWN0aXZlXCIpKSB7XHJcblx0XHRcdGlmIChzY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0ID4gYW5pbUl0ZW1PZmZzZXQgKyBhbmltSXRlbVBvaW50ICYmIHNjcm9sbFkgPCBhbmltSXRlbU9mZnNldCArIGFuaW1JdGVtSGVpZ2h0IC0gYW5pbUl0ZW1Qb2ludCkge1xyXG5cdFx0XHRcdGFuaW1JdGVtLmNsYXNzTGlzdC5hZGQoXCJhbmltYXRlX2FjdGl2ZVwiKTtcclxuXHJcblx0XHRcdFx0aWYgKGFuaW1JdGVtLmNsYXNzTGlzdC5jb250YWlucyhcImNvdW50QW5pbWF0ZVwiKSkge1xyXG5cdFx0XHRcdFx0YW5pbWF0ZUNvdW50KGFuaW1JdGVtLCAxLjUsIDEwMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAoc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodCAtIDUgPCBhbmltSXRlbU9mZnNldCB8fCBzY3JvbGxZID4gYW5pbUl0ZW1PZmZzZXQgKyBhbmltSXRlbUhlaWdodCkge1xyXG5cdFx0XHRcdGlmICghYW5pbUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbWF0ZV9hbmltTm9IaWRlXCIpKSB7XHJcblx0XHRcdFx0XHRhbmltSXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYW5pbWF0ZV9hY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBvZmZzZXQoZWwpIHtcclxuXHRjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0Y29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHRjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdHRvcDogcmVjdC50b3AgKyBzY3JvbGxUb3AsXHJcblx0XHRsZWZ0OiByZWN0LmxlZnQgKyBzY3JvbGxMZWZ0LFxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGVDb3VudChlbCwgdGltZSwgbGVuZ3RoKSB7XHJcblx0Y29uc3QgbWF4Q291bnQgPSBOdW1iZXIoZWwudGV4dENvbnRlbnQpO1xyXG5cdGxldCBzdGFydENvdW50ID0gTWF0aC5yb3VuZChtYXhDb3VudCAtIChtYXhDb3VudCAvIDEwMCkgKiBsZW5ndGgpO1xyXG5cdGxldCB0aW1lU3RlcCA9ICh0aW1lICogMTAwMCkgLyBNYXRoLnJvdW5kKChtYXhDb3VudCAvIDEwMCkgKiBsZW5ndGgpO1xyXG5cdGlmICh0aW1lU3RlcCA8IDE2KSB7XHJcblx0XHRzdGFydENvdW50ID0gTWF0aC5yb3VuZChtYXhDb3VudCAtICh0aW1lICogMTAwMCkgLyAxNik7XHJcblxyXG5cdFx0dGltZVN0ZXAgPSAxNjtcclxuXHR9XHJcblx0bGV0IG51bWJlciA9IHN0YXJ0Q291bnQ7XHJcblxyXG5cdGZ1bmN0aW9uIGRyYXdTdGVwKCkge1xyXG5cdFx0ZWwudGV4dENvbnRlbnQgPSBudW1iZXI7XHJcblx0XHRudW1iZXIrKztcclxuXHJcblx0XHRpZiAobnVtYmVyID4gbWF4Q291bnQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2V0VGltZW91dChkcmF3U3RlcCwgdGltZVN0ZXApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZHJhd1N0ZXAoKTtcclxufVxyXG4iXX0=
