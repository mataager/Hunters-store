function setupHoverEffect(productItem) {
  if (!flippedimages) return;
  const images = productItem.querySelectorAll(".image-contain");
  const cardBanner = productItem.querySelector(".card-banner");

  // Only proceed if there are exactly 2 images
  if (images.length === 2) {
    // Create dots container
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "image-dots";
    dotsContainer.style.cssText = `
      position: absolute;
      bottom: 15px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      z-index: 2;
    `;

    // Create dots - REVERSED INITIAL STATE
    const dot1 = document.createElement("span");
    dot1.className = "image-dot";
    dot1.dataset.index = "1"; // Now points to second image
    dot1.style.cssText = `
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border:1px solid #333;
      background: #333;
      cursor: pointer;
      box-shadow: 0 0 3px rgba(0,0,0,0.5);
    `;

    const dot2 = document.createElement("span");
    dot2.className = "image-dot active";
    dot2.dataset.index = "0"; // Now points to first image
    dot2.style.cssText = dot1.style.cssText;
    dot2.style.background = "#fff"; // Active dot is white

    dotsContainer.appendChild(dot1);
    dotsContainer.appendChild(dot2);
    cardBanner.appendChild(dotsContainer);

    // REVERSED Function to switch images
    function switchImage(index) {
      // Reverse the display logic
      images[0].style.display = index === 0 ? "none" : "block";
      images[1].style.display = index === 0 ? "block" : "none";

      // Update dot states
      dotsContainer.querySelectorAll(".image-dot").forEach((dot) => {
        // Active dot is the one NOT matching the current image
        const isActive = parseInt(dot.dataset.index) !== index;
        dot.style.background = isActive ? "#fff" : "#333";
      });
    }

    // Click/touch events for dots (no change needed)
    dotsContainer.querySelectorAll(".image-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        switchImage(parseInt(dot.dataset.index));
      });
    });

    // Touch swipe support (no change needed)
    let touchStartX = 0;
    let touchEndX = 0;

    cardBanner.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    cardBanner.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        // Swipe left - show next image (reversed logic)
        switchImage(images[0].style.display === "none" ? 1 : 0);
      } else if (touchEndX > touchStartX + threshold) {
        // Swipe right - show previous image (reversed logic)
        switchImage(images[0].style.display === "none" ? 1 : 0);
      }
    }

    // // Mouse hover effect for non-touch devices (reversed logic)
    // if (!("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
    //   productItem.addEventListener("mouseenter", () => switchImage(0)); // Show second image on hover
    //   productItem.addEventListener("mouseleave", () => switchImage(1)); // Show first image on leave
    // }
  }
}
