// Make the observer available globally or pass it to your rendering function
let observer;

document.addEventListener("DOMContentLoaded", function () {
  // Set up IntersectionObserver
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        } else {
          entry.target.classList.remove("animated");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Apply to existing elements
  const elements = document.querySelectorAll(".animateonscroll");
  elements.forEach((el, index) => {
    const delay = index * 200;
    el.style.setProperty("--delay", delay);
    el.style.transitionDelay = `${delay}ms`; // Fixed: Properly closed backtick
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // For auto-animate elements
  const autoElements = document.querySelectorAll(".animate-on-scroll-auto");
  autoElements.forEach(function (element) {
    element.classList.add("show");
  });

  // For scroll-triggered elements with show/hide functionality
  function checkScroll() {
    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    const windowHeight = window.innerHeight;
    const triggerOffset = windowHeight * 0.8; // Trigger point at 80% of viewport height

    scrollElements.forEach(function (element) {
      const position = element.getBoundingClientRect().top;
      const elementHeight = element.offsetHeight;

      // Check if element is in view (with some offset)
      if (position < triggerOffset && position > -elementHeight) {
        element.classList.add("show");
      } else {
        element.classList.remove("show");
      }
    });
  }

  // Initial check on load
  checkScroll();

  // Listen for scroll events
  window.addEventListener("scroll", checkScroll);
});

function showInitialVisibleProducts() {
  // Get all product items with animate-on-scroll
  const productItems = document.querySelectorAll(
    ".product-item.animate-on-scroll"
  );

  // Only take the first 4 (or fewer if there aren't enough)
  const maxInitialItems = 4;
  const itemsToShow = Math.min(productItems.length, maxInitialItems);

  // Add the 'show' class to each of them
  for (let i = 0; i < itemsToShow; i++) {
    productItems[i].classList.add("show");
  }
}
