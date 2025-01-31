document.addEventListener("DOMContentLoaded", function () {
    let storyCards = document.querySelectorAll(".story-card");
    let storyModal = new bootstrap.Modal(document.getElementById("storyModal"));
    let storyTitle = document.getElementById("storyModalLabel");
    let storyImage = document.getElementById("storyImage");
    let storyDescription = document.getElementById("storyDescription");
    let progressBarContainer = document.getElementById("progressBarContainer");
    let prevButton = document.getElementById("prevStory");
    let nextButton = document.getElementById("nextStory");
    let stories = [];
    let currentStoryIndex = 0;
    let autoPlayTimeout;
    function resetProgressBars() {
        progressBarContainer.innerHTML = "";
        stories.forEach(() => {
            let bar = document.createElement("div");
            bar.className = "progress-bar bg-secondary flex-fill mx-1";
            bar.style.height = "5px";
            let activeBar = document.createElement("div");
            activeBar.className = "progress-bar-fill bg-danger";
            activeBar.style.width = "0%";
            activeBar.style.height = "100%";
            bar.appendChild(activeBar);
            progressBarContainer.appendChild(bar);
        });
    }
    function updateProgressBars(index) {
        let bars = document.querySelectorAll(".progress-bar-fill");
        bars.forEach((bar, i) => {
            bar.style.transition = "none";
            bar.style.width = i < index ? "100%" : "0%";
            if (i === index) {
                setTimeout(() => {
                    bar.style.transition = "width 3s linear";
                    bar.style.width = "100%";
                }, 100);
            }
        });
    }

    function updateNavigationButtons() {
        prevButton.classList.toggle("disabled", currentStoryIndex === 0);
        nextButton.classList.toggle("disabled", currentStoryIndex === stories.length - 1);
    }

    function showStory(index) {
        if (index >= 0 && index < stories.length) {
            currentStoryIndex = index;
            let story = stories[currentStoryIndex];
            storyImage.src = story.img;
            storyDescription.textContent = story.desc;
            updateProgressBars(currentStoryIndex);
            updateNavigationButtons();

            clearTimeout(autoPlayTimeout);
            autoPlayTimeout = setTimeout(() => {
                if (currentStoryIndex < stories.length - 1) {
                    showStory(currentStoryIndex + 1);
                } else {
                    storyModal.hide();
                }
            }, 3000);
        }
    }

    storyCards.forEach(card => {
        card.addEventListener("click", function () {
            let title = this.getAttribute("data-title");
            stories = JSON.parse(this.getAttribute("data-content"));
            storyTitle.innerText = title;

            resetProgressBars();
            setTimeout(() => {
                showStory(0);
            }, 100);
        });
    });

    nextButton.addEventListener("click", function () {
        if (currentStoryIndex < stories.length - 1) {
            showStory(currentStoryIndex + 1);
        }
    });

    prevButton.addEventListener("click", function () {
        if (currentStoryIndex > 0) {
            showStory(currentStoryIndex - 1);
        }
    });

    document.getElementById("storyModal").addEventListener("hidden.bs.modal", function () {
        clearTimeout(autoPlayTimeout);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const soundButton = document.getElementById("toggleSound");
    let soundOn = true; // Default state: Sound is ON

    soundButton.addEventListener("click", function () {
    soundOn = !soundOn; // Toggle sound state
    soundButton.innerHTML = soundOn
        ? '<i class="bi bi-volume-up"></i>' // Sound ON Icon
        : '<i class="bi bi-volume-mute"></i>'; // Sound OFF Icon

    // Here you can control actual sound logic (e.g., mute/unmute video/audio)
    console.log("Sound:", soundOn ? "ON" : "OFF");
    });
});
document.addEventListener("DOMContentLoaded", function () {
  let storyCards = document.querySelectorAll(".story-card");
  let storyModal = new bootstrap.Modal(document.getElementById("storyModal"));
  let storyTitle = document.getElementById("storyModalLabel");
  let storyImage = document.getElementById("storyImage");
  let storyDescription = document.getElementById("storyDescription");
  let progressBarContainer = document.getElementById("progressBarContainer");
  let prevButton = document.getElementById("prevStory");
  let nextButton = document.getElementById("nextStory");
  let toggleSoundButton = document.getElementById("toggleSound");

  let stories = [];
  let currentStoryIndex = 0;
  let isMuted = false;

  toggleSoundButton.addEventListener("click", function () {
    isMuted = !isMuted;
    toggleSoundButton.innerHTML = isMuted
      ? '<i class="bi bi-volume-mute"></i>'
      : '<i class="bi bi-volume-up"></i>';
  });

  function showStory(index) {
    if (index >= 0 && index < stories.length) {
      currentStoryIndex = index;
      storyImage.src = stories[currentStoryIndex].img;
      storyDescription.textContent = stories[currentStoryIndex].desc;
    }
  }

  storyCards.forEach((card) => {
    card.addEventListener("click", function () {
      stories = JSON.parse(this.getAttribute("data-content"));
      storyTitle.innerText = this.getAttribute("data-title");
      showStory(0);
    });
  });

  prevButton.addEventListener("click", function () {
    if (currentStoryIndex > 0) showStory(currentStoryIndex - 1);
  });
  nextButton.addEventListener("click", function () {
    if (currentStoryIndex < stories.length - 1)
      showStory(currentStoryIndex + 1);
  });
});