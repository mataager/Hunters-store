"use strict";

/**
 * navbar toggle
 */

// Global variables to keep track of current page and products per page
let currentPageSale = 1;
const itemsPerPageSale = 100;
let totalSaleProducts = 0;
let allSaleProducts = [];
let allSaleData = {};

function fetchAndRenderSaleProducts() {
  fetch(`${url}/Stores/${uid}/Products.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Check if data is not empty
      if (data) {
        allSaleData = data;
        allSaleProducts = Object.keys(data)
          .filter((key) => data[key]["sale-amount"]) // Filter out products without sale amount
          .reverse(); // Reverse the product keys to sort from end to first
        totalSaleProducts = allSaleProducts.length;
        // Update the counter
        document.getElementById(
          "itemscounter"
        ).textContent = `${totalSaleProducts} ${
          totalSaleProducts === 1 ? "Item" : "Items"
        }`;

        // Call handleProductRendering instead of renderSaleProducts
        return handleProductRendering();
      } else {
        console.log("No products found");
        return Promise.resolve(); // Resolve if no products
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
function renderSaleProducts() {
  return new Promise((resolve) => {
    const saleProductList = document.querySelector(".product-list");
    saleProductList.innerHTML = ""; // Clear existing products from the list

    const start = (currentPageSale - 1) * itemsPerPageSale;
    const end = Math.min(start + itemsPerPageSale, totalSaleProducts);
    const productKeys = allSaleProducts.slice(start, end);

    // Counter to track rendered products
    let renderedCount = 0;
    const totalToRender = productKeys.length;

    // Helper function to check if all products are rendered
    function checkCompletion() {
      renderedCount++;
      if (renderedCount === totalToRender) {
        updateSalePaginationButtons();
        setupCartButtonListeners();
        resolve(); // Resolve the promise when all products are rendered
      }
    }

    // Iterate through the product data and render each product
    productKeys.forEach((key) => {
      const product = allSaleData[key];
      const productCard = document.createElement("li");
      productCard.classList.add("product-item", "animate-on-scroll");

      // ... [keep all your existing product rendering code] ...

      // Get colors for all sizes if sizes property exists
      const allColors = new Set();
      const colorValues = {};
      if (product.sizes) {
        Object.values(product.sizes).forEach((sizeDetails) => {
          if (sizeDetails) {
            // Ensure sizeDetails is not null or undefined
            Object.keys(sizeDetails).forEach((color) => {
              allColors.add(color);
              colorValues[color] = sizeDetails[color]["color-value"];
            });
          }
        });
      }

      const saleAmount = product["sale-amount"];
      const originalPrice = product["Product-Price"];

      const salePrice = calculateSalePrice(originalPrice, saleAmount);
      // Check if the product is a best seller
      const bestSellerHTML = product["bestseller"]
        ? `<div class="best-seller" id="best-seller">Bestseller<i class="bi bi-lightning-charge"></i></div>`
        : "";
      //
      // Get category and sizes information
      const category = product["category"] || "Unknown category"; // Default to 'Unknown category' if not present
      const sizes = product.sizes
        ? Object.keys(product.sizes).join(",")
        : "No sizes available";

      // Check and set default image source if necessary
      setDefaultImageSource(product);
      const { colorOptionsContainer, outOfStockBadge } =
        getColorOptionsAndStockInfo(product);
      // Construct product card HTML
      productCard.innerHTML = `
      <div class="product-card" tabindex="0">
        <figure class="card-banner" id="cardBanner">
          <img src="${
            product["product-photo"]
          }" width="312" height="350" alt="${
        product["product-title"]
      }" class="image-contain" id="swipe1">
          <img src="${
            product["product-photo2"]
          }" width="312" height="350" id="swipe2" class="image-contain" style="display: none;">
           ${outOfStockBadge}
          
                    ${
                      saleAmount
                        ? `<div class="card-badge"><div id="saleAmountbadge">-${saleAmount}%</div>${bestSellerHTML}</div>`
                        : ""
                    }
          <ul class="card-action-list">
            <li class="card-action-item">
              <button class="card-action-btn add-to-cart-btn" data-product-id="${key}" aria-labelledby="card-label-1">
                <ion-icon name="cart-outline" role="img" class="md hydrated" aria-label="cart outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
            </li>
            <li class="card-action-item" onclick="productDetails('${key}')">
              <button class="card-action-btn" aria-labelledby="card-label-3">
                <ion-icon name="eye-outline" role="img" class="md hydrated" aria-label="eye outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-3">Quick View</div>
            </li>
            <li class="card-action-item" onclick="addfavouriteproduct('${key}')">
              <button class="card-action-btn" aria-labelledby="card-label-3">
                <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart-outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-3">Add to Favourite</div>
            </li>
          </ul>
        </figure>
        <div class="card-content">
          ${colorOptionsContainer}
          <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
            <a class="title" href="#">${product["product-title"]}</a>
          </h3>
          <div class="price-animation-container">
          ${
            saleAmount
              ? `<del class="pre-sale-animation">${originalPrice} EGP</del>`
              : ""
          }
          <p class="card-price-animation">${salePrice} EGP</p>
          </div>
          <a href="#" class="card-price hidden font-small">${key}</a>
        </div>
         <div class="hidden" data-category="${category}" data-sizes="${sizes}">sorting helper</div>
      </div>`;

      // Append product card to the product list
      saleProductList.appendChild(productCard);
      setupHoverEffect(productCard);

      // Check if this was the last product to render
      checkCompletion();
    });
    setupBadgeAnimations();
    setupPriceAnimations();

    // Handle case where there are no products to render
    if (totalToRender === 0) {
      updateSalePaginationButtons();
      resolve();
    }
  });
}
function setupCartButtonListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const productId =
        event.target.closest(".add-to-cart-btn").dataset.productId;
      openCartModal(productId);
    })
  );
}
async function handleProductRendering() {
  try {
    // Execute render function and wait for it to complete
    await renderSaleProducts();

    // Add slight delay to ensure DOM is fully updated
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Modify first 4 items
    const productItems = document.querySelectorAll(
      ".product-item.animate-on-scroll"
    );

    productItems.forEach((item, index) => {
      if (index < 4) {
        item.classList.remove("animate-on-scroll");
        item.classList.add("animate-on-scroll-auto", "show");
      }
    });
  } catch (error) {
    console.error("Error during product rendering:", error);
  }
}
function updateSalePaginationButtons() {
  document.getElementById("prevPageBtn").disabled = currentPageSale === 1;
  document.getElementById("nextPageBtn").disabled =
    currentPageSale * itemsPerPageSale >= totalSaleProducts;
}

// Function to set up hover effect
function setupHoverEffect(productCard) {
  const swipe1 = productCard.querySelector("#swipe1");
  const swipe2 = productCard.querySelector("#swipe2");

  productCard.addEventListener("mouseenter", () => {
    swipe1.style.display = "none";
    swipe2.style.display = "block";
  });
  productCard.addEventListener("mouseleave", () => {
    swipe1.style.display = "block";
    swipe2.style.display = "none";
  });
}

// Function to handle "Next" button click event
document.getElementById("nextPageBtn").addEventListener("click", () => {
  const productList = document.querySelector(".product-list");
  currentPageSale++;
  productList.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the top of the product list
  renderSaleProducts(); // Render products for the next page
});

// Function to handle "Previous" button click event
document.getElementById("prevPageBtn").addEventListener("click", () => {
  const productList = document.querySelector(".product-list");
  currentPageSale = Math.max(1, currentPageSale - 1);
  productList.scrollIntoView({ behavior: "smooth", block: "start" }); // Scroll to the top of the product list
  renderSaleProducts(); // Render products for the previous page
});

// Fetch and render sale products on page load
fetchAndRenderSaleProducts();
