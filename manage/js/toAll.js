// Notification Sound
const notificationSound = new Audio("./assets/soundEffects/neworder.mp3");
// Function to get the current date and time in "DD/MM/YYYY HH:MM AM/PM" format
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
function cantdonethis() {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "info",
    title: "Can't do this operation",
    text: "You must reload the page first.",
    showConfirmButton: true,
    confirmButtonText: "Reload",
    confirmButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload(); // Reloads the page when the button is clicked
    }
  });
}

// External function to play notification sound
function playNotificationSound() {
  notificationSound.currentTime = 0; // Reset sound to start
  notificationSound
    .play()
    .catch((err) => console.error("Audio play failed:", err));
}

//function for get the eg now date
const now = new Date();

const day = now.getDate();
const month = now.getMonth() + 1; // Months are zero-based, so add 1
const year = now.getFullYear();

let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? "pm" : "am";

// Convert hours to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // Handle midnight (0 hours)

const formattedDate = `${day}/${month}/${year}-${hours}:${minutes
  .toString()
  .padStart(2, "0")} ${ampm}`;

//
// increament or decrement btn
function increment(inputId) {
  const input = document.getElementById(inputId);
  let value = parseInt(input.value, 10);
  if (isNaN(value)) {
    value = 0;
  }
  input.value = value + 1;
}

function decrement(inputId) {
  const input = document.getElementById(inputId);
  let value = parseInt(input.value, 10);
  if (isNaN(value)) {
    value = 0;
  }
  if (value > 0) {
    input.value = value - 1;
  }
}

function animateTruck(button) {
  const truckIcon = button.querySelector("i");

  // Reset animation if it was already running
  truckIcon.style.animation = "none";
  void truckIcon.offsetWidth; // Trigger reflow

  // Apply the animation
  truckIcon.style.animation = "truckDrive 1s forwards";

  // Reset after animation completes
  setTimeout(() => {
    truckIcon.style.animation = "none";
    truckIcon.style.opacity = "1";
    truckIcon.style.transform = "translateX(0)";
  }, 1000);
}

function animatereturned(button) {
  const icon = button.querySelector(".bi-arrow-return-left");

  // Only animate if not already in "Returned" state
  if (!icon.classList.contains("text-danger")) {
    icon.style.transition = "transform 0.4s ease";
    icon.style.transform = "translateX(-8px) rotate(-20deg)";

    setTimeout(() => {
      icon.style.transform = "translateX(0) rotate(0)";

      // Remove inline styles after animation
      setTimeout(() => {
        icon.style.transition = "";
        icon.style.transform = "";
      }, 400);
    }, 400);
  }
}
function animateFlag(button) {
  const icon = button.querySelector(".bi-flag");
  if (!icon.classList.contains("text-danger")) {
    icon.style.transition = "transform 0.4s ease";
    icon.style.transform = "rotate(-15deg) translateY(-3px)";

    setTimeout(() => {
      icon.style.transform = "rotate(10deg) translateY(0)";
      setTimeout(() => {
        icon.style.transform = "rotate(0deg)";
        setTimeout(() => {
          icon.style.transition = "";
          icon.style.transform = "";
        }, 200);
      }, 200);
    }, 200);
  }
}
function animateprint(button) {
  const icon = button.querySelector(".bi-printer");

  if (!icon.dataset.animating) {
    icon.dataset.animating = "true";

    icon.style.transition = "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
    icon.style.transform = "translateY(15px) scale(0.95)";

    setTimeout(() => {
      icon.style.transform = "translateY(0) scale(1)";

      icon.addEventListener("transitionend", function handler() {
        icon.style.transition = "";
        icon.style.transform = "";
        icon.removeEventListener("transitionend", handler);
        delete icon.dataset.animating;
      });
    }, 350);
  }
}
// function requestNotificationPermission() {
//   if (Notification.permission === "granted") {
//     return Promise.resolve();
//   } else if (Notification.permission !== "denied") {
//     return Notification.requestPermission();
//   }
//   return Promise.reject("Notifications blocked");
// }
// // Function to handle the sound toggle change
// function handleSoundToggleChange() {
//   const soundToggle = document.getElementById("soundToggle");
//   const isEnabled = soundToggle.checked;

//   // Save to localStorage
//   localStorage.setItem("notificationsEnabled", isEnabled);

//   if (isEnabled) {
//     // Request notification permission
//     requestNotificationPermission()
//       .then(() => {
//         console.log("Notification permission granted");
//       })
//       .catch((error) => {
//         console.error("Notification permission error:", error);
//         soundToggle.checked = false;
//         localStorage.setItem("notificationsEnabled", false);
//       });
//   } else {
//   }
// }
// // Initialize on page load
// document.addEventListener("DOMContentLoaded", function () {
//   requestNotificationPermission();
//   const soundToggle = document.getElementById("soundToggle");

//   // Load saved preference
//   const notificationsEnabled =
//     localStorage.getItem("notificationsEnabled") === "true";
//   soundToggle.checked = notificationsEnabled;

//   // Set up event listener
//   soundToggle.addEventListener("change", handleSoundToggleChange);
// });

function requestNotificationPermission() {
  if (Notification.permission === "granted") {
    return Promise.resolve();
  } else if (Notification.permission !== "denied") {
    return Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        return Promise.reject("User denied notification permission");
      }
      return Promise.resolve();
    });
  }
  return Promise.reject("Notifications blocked");
}

// Function to handle the sound toggle change
function handleSoundToggleChange() {
  const soundToggle = document.getElementById("soundToggle");
  const isEnabled = soundToggle.checked;

  // Save to localStorage
  localStorage.setItem("notificationsEnabled", isEnabled);

  if (isEnabled) {
    // Request notification permission
    requestNotificationPermission()
      .then(() => {
        console.log("Notification permission granted");
      })
      .catch((error) => {
        console.error("Notification permission error:", error);
        soundToggle.checked = false;
        localStorage.setItem("notificationsEnabled", false);
        // Optional: Show feedback to user
        alert("Notifications are required to enable this feature");
      });
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  const soundToggle = document.getElementById("soundToggle");

  // Load saved preference
  const notificationsEnabled =
    localStorage.getItem("notificationsEnabled") === "true";
  soundToggle.checked = notificationsEnabled;

  // Check current permission state and adjust switch accordingly
  if (Notification.permission === "denied") {
    soundToggle.checked = false;
    localStorage.setItem("notificationsEnabled", false);
  }

  // Set up event listener
  soundToggle.addEventListener("change", handleSoundToggleChange);

  // Optional: If notifications were previously enabled but now denied, update UI
  if (notificationsEnabled && Notification.permission === "denied") {
    soundToggle.checked = false;
    localStorage.setItem("notificationsEnabled", false);
  }
});
