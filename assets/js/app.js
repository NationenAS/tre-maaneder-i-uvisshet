document.addEventListener("DOMContentLoaded", function(event) { 
	if (!!window.IntersectionObserver) {

		/* Specific Sesongarbeidere */
		document.querySelector("#unmute-button").onclick = function(){
			document.querySelector("video[data-video-id='1']").muted = false;
		};

		/* Video play/stop on scroll into view */
		let video = document.querySelectorAll('.story-text[data-video-control]');
		let observeVideo = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				let storyLine = entry.target.parentNode;
				let videoId = entry.target.dataset.videoControl;
				let videoObj = storyLine.querySelector("video[data-video-id='" + videoId + "']");
				if (!entry.isIntersecting && !videoObj.paused) {
					videoObj.pause();
				} else if (entry.isIntersecting && videoObj.paused) {
					videoObj.play();
				}
			});
		}, {
			threshold: 0.5
		});
		video.forEach((element, index) => {
			observeVideo.observe(element);
		});

		/* Nat Story v2 */
		var elementObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {

				if (entry.isIntersecting) {
					let storyLine = entry.target.parentNode;
					let targetId = parseInt(entry.target.dataset.storyControl);
					let targetObj = storyLine.querySelector(".story-background[data-story-id='" + targetId + "']");
					let prevObj = storyLine.querySelector(".story-background[data-story-id='" + (targetId - 1) + "']");
					let nextObj = storyLine.querySelector(".story-background[data-story-id='" + (targetId + 1) + "']");

					let currentStateObjs = storyLine.querySelectorAll('.story-background[data-story-state]');
					currentStateObjs.forEach(element => {
						element.removeAttribute("data-story-state");
					});

					entry.target.dataset.storyState = "active";
					targetObj.dataset.storyState = "active";
					if (prevObj !== null) prevObj.dataset.storyState = "prev";
					if (nextObj !== null) nextObj.dataset.storyState = "next";
				}

				else {
					entry.target.removeAttribute("data-story-state");
				}

			});
		}, { 
			threshold: 0.5 
		});
		var storyElement = document.querySelectorAll('.story-text');
		storyElement.forEach((element) => {
			elementObserver.observe(element);
		});

	}
});