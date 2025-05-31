// // Show or Hide Scroll Button
// window.onscroll = function () {
//   const scrollBtn = document.getElementById("scrollTopBtn");
//   if (document.documentElement.scrollTop > 300) {
//     scrollBtn.classList.add("show");
//     scrollBtn.classList.remove("hide");
//   } else {
//     scrollBtn.classList.add("hide");
//     setTimeout(() => scrollBtn.classList.remove("show"), 300); // Hide after transition
//   }
// };

// // Scroll to Top Function
// function scrollToTop() {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

// Scroll Button Functionality
window.addEventListener("scroll", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const scrollBottomBtn = document.getElementById("scrollBottomBtn");
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Top button appears after scrolling down 300px
  if (scrollPosition > 300) {
    scrollTopBtn.classList.add("show");
    scrollTopBtn.classList.remove("hide");
  } else {
    scrollTopBtn.classList.add("hide");
    setTimeout(() => scrollTopBtn.classList.remove("show"), 300);
  }

  // Bottom button disappears when near bottom
  if (scrollPosition < documentHeight - windowHeight - 100) {
    scrollBottomBtn.classList.add("show");
    scrollBottomBtn.classList.remove("hide");
  } else {
    scrollBottomBtn.classList.add("hide");
    setTimeout(() => scrollBottomBtn.classList.remove("show"), 300);
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}
