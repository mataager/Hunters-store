document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const overlay = document.querySelector("[data-overlay]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const megaMenu = document.querySelector("[data-mega-menu]");

  // Event listeners for opening and closing the navbar
  navOpenBtn.addEventListener("click", function () {
    navbar.classList.add("active");
    overlay.classList.add("active");
  });

  navCloseBtn.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Prevent closing the navbar when clicking inside the mega menu
  if (megaMenu) {
    megaMenu.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from propagating to the document
    });
  }

  // Handle category selection
  const showMenu = function (category) {
    const menMenu = document.getElementById("men-menu");
    const womenMenu = document.getElementById("women-menu");
    const kidsMenu = document.getElementById("kids-menu");
    const menLabel = document.getElementById("men-label");
    const womenLabel = document.getElementById("women-label");
    const kidsLabel = document.getElementById("kids-label");

    // Hide all menus and reset labels
    menMenu.classList.add("hidden");
    womenMenu.classList.add("hidden");
    kidsMenu.classList.add("hidden");
    menLabel.style.fontWeight = "400";
    womenLabel.style.fontWeight = "400";
    kidsLabel.style.fontWeight = "400";

    // Show the selected category menu and highlight the label
    if (category === "men") {
      menMenu.classList.remove("hidden");
      menLabel.style.fontWeight = "700";
    } else if (category === "women") {
      womenMenu.classList.remove("hidden");
      womenLabel.style.fontWeight = "700";
    } else if (category === "kids") {
      kidsMenu.classList.remove("hidden");
      kidsLabel.style.fontWeight = "700";
    }
  };

  // Add event listeners to category labels
  document.getElementById("men-label").addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click from propagating to the document
    showMenu("men");
  });

  document
    .getElementById("women-label")
    .addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent click from propagating to the document
      showMenu("women");
    });

  document.getElementById("kids-label").addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click from propagating to the document
    showMenu("kids");
  });

  // Handle scroll behavior
  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-top]");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 80) {
      header.classList.add("active");
      goTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      goTopBtn.classList.remove("active");
    }
  });
});

//handle page title
document.getElementById("store-title").innerHTML = storename;

//
// The function to handle the redirection
function brand(brandName) {
  const encodedBrand = encodeURIComponent(brandName); // Ensure URL safety
  window.location.href = `brand.html?brand=${encodedBrand}`;
}

//infinity brands scroll
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
function calculateSalePrice(originalPrice, saleAmount) {
  const discountedPrice = originalPrice - originalPrice * (saleAmount / 100);

  if (!autopricehandle) {
    return Math.round(discountedPrice);
  }

  // Small prices (≤ 999): round UP to nearest 50
  if (discountedPrice <= 999) {
    return Math.ceil(discountedPrice / 50) * 50;
  }

  // Medium prices (1,000-9,999): round UP to nearest 100
  if (discountedPrice <= 9999) {
    return Math.ceil(discountedPrice / 100) * 100;
  }

  // Large prices (≥10,000): round UP to nearest 1000
  return Math.ceil(discountedPrice / 1000) * 1000;
}

//cities

const cityOptions = [
  "Alexandria",
  "Aswan",
  "Asyut",
  "Beheira",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Faiyum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr El Sheikh",
  "Luxor",
  "Matruh",
  "Minya",
  "Monufia",
  "New Valley",
  "North Sinai",
  "Port Said",
  "Qalyubia",
  "Qena",
  "Red Sea",
  "Sharqia",
  "Sohag",
  "South Sinai",
  "Suez",
];
//using them in cart checkout page
function removeaddressarea() {
  const addressarea = document.getElementById("address-sec");
  addressarea.remove();
}
function hideshippingarea() {
  const shippingarea = document.getElementById("shipping-fees-total-area");
  shippingarea.classList.add("hidden");
}
function prepareguestbtn() {
  const removedbtn = document.getElementById("checkoutByAccount");
  const addedbtn = document.getElementById("checkoutWithoutAccount");
  addedbtn.classList.remove("hidden");

  if (removedbtn) removedbtn.remove();

  if (addedbtn) {
    addedbtn.innerHTML = `
      <button id="guestSubmitorderbtn" class="Add-to-Cart">
        Order Now As Guest
        <i class="bi bi-check2-all"></i>
      </button>
    `;

    // Add event listener properly
    document
      .getElementById("guestSubmitorderbtn")
      .addEventListener("click", guestSubmitorder);
  }
}
// Configuration object for store hints
const storeHintsConfig = {
  currentPromos: [], // Will be populated from Firebase
  rotationInterval: 3000, // 3 seconds rotation
  apiUrl: `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/Promocodes.json`,
};

// DOM elements
let hintsContainer;
let rotationInterval;

// Function to render the free shipping hint
function renderFreeShippingHint(threshold) {
  return `
        <div class="store-hint">
            <div class="flex items-center">
                <p>Free Shipping On Orders Over</p>
                <div class="m-x-3 highlight-shipping-amount">${threshold}</div>
                <p>EGP</p>
            </div>
        </div>
    `;
}

// Function to render a promo code hint
function renderPromoHint(promo) {
  return `
        <div class="store-hint">
            <div class="flex items-center">
                <p>Use Promo Code:</p>
                <div class="m-x-3 highlight-promo-code">${promo.promoName}</div>
                <p>for ${promo.promoAmount} EGP Off</p>
            </div>
        </div>
    `;
}

// Fetch promo codes from Firebase
async function fetchPromoCodes() {
  try {
    const response = await fetch(storeHintsConfig.apiUrl);
    const data = await response.json();

    // Convert object to array and filter valid promos
    storeHintsConfig.currentPromos = Object.values(data).filter(
      (promo) => promo.promoName && promo.promoAmount
    );

    return true;
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return false;
  }
}

// Main function to render store hints
async function renderStoreHints() {
  hintsContainer = document.getElementById("store-hints");
  if (!hintsContainer) return;

  // Fetch promo codes first
  await fetchPromoCodes();

  // Clear existing content
  hintsContainer.innerHTML = `
        <div class="rotating-store-hints"></div>
    `;

  const rotatingContainer = hintsContainer.querySelector(
    ".rotating-store-hints"
  );

  // Add free shipping hint
  rotatingContainer.insertAdjacentHTML(
    "beforeend",
    renderFreeShippingHint(freeshipping)
  );

  // Add promo code hints if available
  storeHintsConfig.currentPromos.forEach((promo) => {
    rotatingContainer.insertAdjacentHTML("beforeend", renderPromoHint(promo));
  });

  // Start rotation if we have multiple hints
  const hints = rotatingContainer.querySelectorAll(".store-hint");
  if (hints.length > 1) {
    startHintRotation(rotatingContainer);
  } else {
    // If only one hint, just show it
    hints[0].style.opacity = "1";
  }
}

// Rotation function
function startHintRotation(container) {
  const hints = container.querySelectorAll(".store-hint");
  let currentIndex = 0;

  // Clear any existing interval
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }

  // Initially show first hint
  hints[currentIndex].style.opacity = "1";
  hints[currentIndex].style.transform = "translateY(0)";

  // Set up rotation interval
  rotationInterval = setInterval(() => {
    // Fade out current hint
    hints[currentIndex].style.opacity = "0";
    hints[currentIndex].style.transform = "translateY(10px)";

    // Move to next hint (with wrap-around)
    currentIndex = (currentIndex + 1) % hints.length;

    // Fade in next hint
    hints[currentIndex].style.opacity = "1";
    hints[currentIndex].style.transform = "translateY(0)";
  }, storeHintsConfig.rotationInterval);
}

// Initialize the store hints when the page loads
document.addEventListener("DOMContentLoaded", renderStoreHints);

// Public function to update hints
window.updateStoreHints = async function (newConfig) {
  Object.assign(storeHintsConfig, newConfig);
  await renderStoreHints();
};

//rendering pixels
function renderPixels() {
  const url = `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/Pixels.json`;
  if (!uid) {
    console.error("UID is required to fetch pixels");
    return;
  }
  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      if (!data) {
        return;
      }

      const head = document.head;

      Object.values(data).forEach((pixel) => {
        // Add comment with pixel name
        head.appendChild(document.createComment(` ${pixel.pixelName} `));

        // Create a temporary div to parse the HTML
        const temp = document.createElement("div");
        temp.innerHTML = pixel.pixelCode.trim();

        // Move all child nodes to the head
        while (temp.firstChild) {
          head.appendChild(temp.firstChild);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching pixels:", error);
    });
}
// Call the function when the page loads
window.addEventListener("DOMContentLoaded", renderPixels);

//brands scrollbar
function createBrandItems() {
  const brandsScroller = document.getElementById("brandsScroller");
  if (!brandsScroller) return; // Exit if element not found

  // Create first set of brands
  brandsData.forEach((brand) => {
    brandsScroller.innerHTML += `
      <div class="brand-item" onclick="brand('${brand.name.replace(
        /'/g,
        "\\'"
      )}')">
        <img src="${brand.logo}" alt="${brand.name}" class="brand-logo">
      </div>
    `;
  });

  // Create duplicate set for seamless looping
  brandsData.forEach((brand) => {
    brandsScroller.innerHTML += `
      <div class="brand-item" onclick="brand('${brand.name.replace(
        /'/g,
        "\\'"
      )}')">
        <img src="${brand.logo}" alt="${brand.name}" class="brand-logo">
      </div>
    `;
  });
}

window.onload = createBrandItems;

//

function openPolicyModal() {
  // Create preloader overlay if it doesn't exist
  let preloader = document.getElementById("preloader-overlay");
  if (!preloader) {
    preloader = document.createElement("div");
    preloader.id = "preloader-overlay";
    preloader.className = "preloader-overlay";
    preloader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(preloader);
  }

  preloader.classList.remove("hidden");
  document.body.classList.add("modal-open");

  // Start timer for minimum 1 second
  const minLoadTime = 1000;
  const startTime = Date.now();

  setTimeout(() => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);

    setTimeout(() => {
      // Fade out preloader
      preloader.classList.add("hidden");

      // Prepare modal
      const modal = document.querySelector(".modal");
      const modalContent = document.querySelector(".modal-content");

      // Set modal position and styles
      modal.style.display = "block";
      document.body.style.overflow = "hidden";

      // Policy content with improved list styling
      modalContent.innerHTML = `
        <div class="flex justify-content-space-between width-available modal-header">
          <div class="flex center flex-end" onclick="closeModal()">
            <button style="margin: 0px; border-radius: 0px 8px 0px 8px; background: initial !important; color:#333;" type="button" class="Add-to-Cart" id="closeButton">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
        
        <div class="policy-content" style="padding: 20px;overflow-y: auto;">
          <h2 style="margin-bottom: 20px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Return Policy</h2>
          <ul class="policy-list">
            <li class="policy-item"><span class="policy-icon">•</span> You can only return the Order/Item within 24 hours after receiving your order.</li>
            <li class="policy-item"><span class="policy-icon">•</span> When returned, the item must be in the same condition as received.</li>
            <li class="policy-item"><span class="policy-icon">•</span> Shipping fees are non-refundable.</li>
            <li class="policy-item"><span class="policy-icon">•</span> You can try the product before making a payment. If it doesn't fit or you don't like it, you can return it directly with the delivery agent.</li>
          </ul>
          
          <div class="arabic-policy" style="margin-top: 30px; direction: rtl; text-align: right;">
            <h3 style="text-align: center;margin-bottom: 15px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">سياسة الإرجاع</h3>
            <ul class="policy-list" style="padding-right: 20px;">
              <li class="policy-item"><span class="policy-icon">•</span> يمكنك تقديم على إرجاع الطلب / المنتج بعد استلامه خلال 24 ساعة من الاستلام</li>
              <li class="policy-item"><span class="policy-icon">•</span> رسوم الشحن غير قابلة للاسترداد</li>
              <li class="policy-item"><span class="policy-icon">•</span> يمكنك تجربة المنتج قبل الدفع. وإذا لم يكن مناسبًا أو لم يعجبك، يمكنك إرجاعه مباشرة مع مندوب التوصيل</li>
            </ul>
          </div>
          
          <div class="faq-section" style="margin-top: 40px;">
  <h3 style="margin-bottom: 20px; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Frequently Asked Questions</h3>
  
  <div class="faq-item" style="margin-bottom: 20px;">
    <h4 style="color: #555; margin-bottom: 8px; cursor: pointer;" onclick="toggleFAQ(this)">► How to place an Order?</h4>
    <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; padding-left: 20px; color: #666;">
      <p style="margin-top: 10px;">To place an order, simply browse our products, select the items you want, and proceed to checkout.</p>
    </div>
  </div>
  
  <div class="faq-item" style="margin-bottom: 20px;">
    <h4 style="color: #555; margin-bottom: 8px; cursor: pointer;" onclick="toggleFAQ(this)">► What are the Installment options?</h4>
    <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; padding-left: 20px; color: #666;">
      <p style="margin-top: 10px;">We offer various installment plans through select payment providers. Options will be shown at checkout.</p>
    </div>
  </div>
  
  <div class="faq-item" style="margin-bottom: 20px;">
    <h4 style="color: #555; margin-bottom: 8px; cursor: pointer;" onclick="toggleFAQ(this)">► Can I edit or cancel my order?</h4>
    <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; padding-left: 20px; color: #666;">
      <p style="margin-top: 10px;">You can edit or cancel your order within 1 hour of placement by contacting customer service.</p>
    </div>
  </div>
  
  <div class="faq-item" style="margin-bottom: 20px;">
    <h4 style="color: #555; margin-bottom: 8px; cursor: pointer;" onclick="toggleFAQ(this)">► What is the estimated delivery?</h4>
    <div class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; padding-left: 20px; color: #666;">
      <p style="margin-top: 10px;">Delivery typically takes 3-5 business days within major cities, and 5-7 days for other areas.</p>
    </div>
  </div>
</div>
        </div>
      `;

      // Animate modal in from right
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);

      // Close handler
      modal.addEventListener("click", function (event) {
        if (!modalContent.contains(event.target)) {
          closeModal();
        }
      });
    }, remainingTime);
  }, 10);
}

// FAQ toggle function
function toggleFAQ(element) {
  const answer = element.nextElementSibling;

  if (answer.style.display === "none" || !answer.style.display) {
    // First make it visible (but still at 0 height)
    answer.style.display = "block";
    answer.style.maxHeight = "0";

    // Trigger the transition after a small delay
    setTimeout(() => {
      answer.style.maxHeight = answer.scrollHeight + "px";
      element.innerHTML = element.innerHTML.replace("►", "▼");
    }, 10);
  } else {
    // Start the collapse transition
    answer.style.maxHeight = "0";
    element.innerHTML = element.innerHTML.replace("▼", "►");

    // After transition completes, hide it completely
    setTimeout(() => {
      answer.style.display = "none";
    }, 300); // Match this with your transition duration
  }
}
// Reuse the same closeModal function
function closeModal() {
  const modal = document.querySelector(".modal");
  const preloader = document.getElementById("preloader-overlay");

  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    document.body.classList.remove("modal-open");

    if (preloader) {
      preloader.classList.add("hidden");
    }
  }, 300);
}

//handling th card badge and bestseller badge
function setupBadgeAnimations() {
  const badges = document.querySelectorAll(".card-badge");
  badges.forEach((badge) => {
    const saleBadge = badge.querySelector("#saleAmountbadge");
    const bestsellerBadge = badge.querySelector("#best-seller");

    if (saleBadge && bestsellerBadge) {
      // Initial setup
      badge.classList.remove("show-bestseller");
      void badge.offsetHeight; // Trigger reflow
      saleBadge.style.opacity = "1";
      bestsellerBadge.style.opacity = "1";

      // Animation loop function
      const animateBadges = () => {
        // Show sale badge first
        badge.classList.remove("show-bestseller");

        // After 2 seconds, show bestseller
        setTimeout(() => {
          badge.classList.add("show-bestseller");

          // After another 2 seconds, restart animation
          setTimeout(() => {
            animateBadges(); // Recursive call for infinite loop
          }, 2000);
        }, 2000);
      };

      // Start the animation loop
      animateBadges();
    }
  });
}
//funcion for setting up the price nad saled price animition
function setupPriceAnimations() {
  const priceContainers = document.querySelectorAll(
    ".price-animation-container"
  );

  priceContainers.forEach((container) => {
    const originalPrice = container.querySelector(".pre-sale-animation");
    const salePrice = container.querySelector(".card-price-animation");
    let animationTimeout;

    // Cleanup function to stop animations
    const cleanup = () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
      }
      container.classList.remove("show-sale-price");
    };

    // Case 1: Has sale price (both prices exist) - animate
    if (originalPrice && salePrice) {
      // Initial setup
      container.classList.add("has-sale-price");
      container.classList.remove("show-sale-price");

      // Force reflow to ensure transitions work
      void container.offsetHeight;

      // Animation function
      const animatePrices = () => {
        // Show original price
        container.classList.remove("show-sale-price");

        animationTimeout = setTimeout(() => {
          // Show sale price after delay
          container.classList.add("show-sale-price");

          animationTimeout = setTimeout(() => {
            animatePrices(); // Loop
          }, 2000);
        }, 2000);
      };

      // Start animation
      animatePrices();

      // Clean up when container is removed from DOM
      const observer = new MutationObserver(() => {
        if (!document.contains(container)) {
          cleanup();
          observer.disconnect();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    }
    // Case 2: No sale price - just show regular price statically
    else if (salePrice) {
      container.classList.add("show-sale-price"); // Always show the single price
      salePrice.style.opacity = "1"; // Ensure it's visible
    }
  });
}
function setupPricemodalAnimations() {
  const priceContainers = document.querySelectorAll(
    ".price-animation-modal-container"
  );

  priceContainers.forEach((container) => {
    const originalPrice = container.querySelector(".pre-sale-animation");
    const salePrice = container.querySelector(".card-price-animation");
    let animationTimeout;

    // Cleanup function to stop animations
    const cleanup = () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
      }
      container.classList.remove("show-sale-price");
    };

    // Case 1: Has sale price (both prices exist) - animate
    if (originalPrice && salePrice) {
      // Initial setup
      container.classList.add("has-sale-price");
      container.classList.remove("show-sale-price");

      // Force reflow to ensure transitions work
      void container.offsetHeight;

      // Animation function
      const animatePrices = () => {
        // Show original price
        container.classList.remove("show-sale-price");

        animationTimeout = setTimeout(() => {
          // Show sale price after delay
          container.classList.add("show-sale-price");

          animationTimeout = setTimeout(() => {
            animatePrices(); // Loop
          }, 2000);
        }, 2000);
      };

      // Start animation
      animatePrices();

      // Clean up when container is removed from DOM
      const observer = new MutationObserver(() => {
        if (!document.contains(container)) {
          cleanup();
          observer.disconnect();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    }
    // Case 2: No sale price - just show regular price statically
    else if (salePrice) {
      container.classList.add("show-sale-price"); // Always show the single price
      salePrice.style.opacity = "1"; // Ensure it's visible
    }
  });
}

//
//check the item out of stock or not
async function checkStockStatus(qty) {
  const stockMessage = document.getElementById("stockMessage");
  const stockContainer = document.getElementById("stockContainer");

  if (qty === 0) {
    stockMessage.innerText = "Out of stock";
    stockContainer.classList.remove("hidden");
    showOutOfStockBadge();
    hidePurchaseButtons();
    disableProductOptions();
  } else if (qty <= 5) {
    stockMessage.innerText = `Only ${qty} left in stock`;
    stockContainer.classList.remove("hidden");
    removeOutOfStockBadge();
    showPurchaseButtons();
    enableProductOptions();
  } else {
    console.log("Adequate stock", qty);
    stockMessage.innerText = "";
    stockContainer.classList.add("hidden");
    removeOutOfStockBadge();
    showPurchaseButtons();
    enableProductOptions();
  }
}
function showOutOfStockBadge() {
  const mainImageContainer = document.getElementById("outofstockmessagebanner");
  mainImageContainer.classList.remove("hidden");
}

function removeOutOfStockBadge() {
  const mainImageContainer = document.getElementById("outofstockmessagebanner");
  mainImageContainer.classList.add("hidden");
}

function hidePurchaseButtons() {
  document.getElementById("buybuttonsarea").style.display = "none";
  // document.getElementById("BuyNowButton").style.display = "none";
}

function showPurchaseButtons() {
  document.getElementById("buybuttonsarea").style.display = "";
  // document.getElementById("BuyNowButton").style.display = "";
}

function disableProductOptions() {
  document.querySelectorAll(".size-radio, .color-option").forEach((option) => {
    option.classList.add("out-of-stock-option");
  });
}

function enableProductOptions() {
  document.querySelectorAll(".size-radio, .color-option").forEach((option) => {
    option.classList.remove("out-of-stock-option");
  });
}

//check the item out of stock or not
function getColorOptionsAndStockInfo(product) {
  const allColors = new Set();
  const colorValues = {};

  // First pass to collect all colors and their values
  if (product.sizes) {
    Object.values(product.sizes).forEach((sizeDetails) => {
      if (sizeDetails) {
        Object.keys(sizeDetails).forEach((color) => {
          allColors.add(color);
          colorValues[color] = sizeDetails[color]["color-value"];
        });
      }
    });
  }

  // Calculate total available quantity
  let totalAvailableQty = 0;
  if (product.sizes) {
    Object.values(product.sizes).forEach((sizeDetails) => {
      if (sizeDetails) {
        Object.keys(sizeDetails).forEach((color) => {
          const qty = sizeDetails[color].qty || 0;
          totalAvailableQty += qty;
        });
      }
    });
  }

  // Generate color options HTML
  let colorOptionsHTML = "";
  const colorsArray = Array.from(allColors);

  colorsArray.forEach((color) => {
    const colorValue = colorValues[color] || "#000000";
    let maxQty = 0;

    // Calculate max quantity for this color across all sizes
    if (product.sizes) {
      Object.values(product.sizes).forEach((sizeDetails) => {
        if (sizeDetails && sizeDetails[color] && sizeDetails[color].qty) {
          if (sizeDetails[color].qty > maxQty) {
            maxQty = sizeDetails[color].qty;
          }
        }
      });
    }

    colorOptionsHTML += `
      <div class="color-option2 tooltip" 
           style="background-color: ${colorValue};" 
           data-color-name="${color}"
           item-qty="${maxQty}">
      </div>
    `;
  });

  // Optional JavaScript to generate tooltips from data attributes
  document.querySelectorAll(".color-option2.tooltip").forEach((option) => {
    const colorName = option.getAttribute("data-color-name");
    const qty = option.getAttribute("item-qty");
    const tooltip = document.createElement("span");
    tooltip.className = "tooltiptext";
    tooltip.textContent = `${
      colorName.charAt(0).toUpperCase() + colorName.slice(1)
    } (Available: ${qty})`;
    option.appendChild(tooltip);
  });

  const colorOptionsContainer =
    allColors.size > 0
      ? `<div class="color-options m-5 mb-7 center">${colorOptionsHTML}</div>`
      : `<p class="no-color-options mb-7">No color options available</p>`;

  // Generate out of stock badge if needed
  const outOfStockBadge =
    totalAvailableQty === 0
      ? '<div class="out-of-stock-badge">Out of Stock</div>'
      : "";

  return {
    colorOptionsContainer,
    outOfStockBadge,
    totalAvailableQty,
  };
}
