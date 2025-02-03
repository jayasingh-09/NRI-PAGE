document.addEventListener("DOMContentLoaded", function () {
  let storyCards = document.querySelectorAll(".story-card");
  let storyModal = new bootstrap.Modal(document.getElementById("storyModal"));
  let storyImage = document.getElementById("storyImage");
  let progressBarContainer = document.getElementById("progressBarContainer");
  let prevButton = document.getElementById("prevStory");
  let nextButton = document.getElementById("nextStory");
  let closeButton = document.getElementById("closeStory");
  let exploreMoreButton = document.getElementById("exploreMore");
  let stories = [];
  let currentStoryIndex = 0;
  let autoPlayTimeout;

  function resetProgressBars() {
    progressBarContainer.innerHTML = "";
    stories.forEach(() => {
      let bar = document.createElement("div");
      bar.className = "progress-bar bg-secondary flex-fill";
      bar.style.height = "2px";
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
    nextButton.classList.toggle(
      "disabled",
      currentStoryIndex === stories.length - 1
    );
  }

  function showStory(index) {
    if (index >= 0 && index < stories.length) {
      currentStoryIndex = index;
      let story = stories[currentStoryIndex];
      storyImage.src = story.img;

      // Update "Explore More" button with link (if available)
      if (story.link) {
        exploreMoreButton.href = story.link;
        exploreMoreButton.style.display = "block";
      } else {
        exploreMoreButton.style.display = "none";
      }

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

  storyCards.forEach((card) => {
    card.addEventListener("click", function () {
      stories = JSON.parse(this.getAttribute("data-content"));
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

  closeButton.addEventListener("click", function () {
    storyModal.hide();
    clearTimeout(autoPlayTimeout);
  });

  document
    .getElementById("storyModal")
    .addEventListener("hidden.bs.modal", function () {
      clearTimeout(autoPlayTimeout);
    });
});
