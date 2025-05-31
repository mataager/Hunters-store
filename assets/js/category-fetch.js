//v3
function getFilterFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const piece = urlParams.get("piece");
  const type = urlParams.get("type"); // Assuming 'type' is also used
  return { category, piece, type };
}

// Global variables to keep track of current page and products per page
let currentPage = 1;
const itemsPerPage = 100;
let totalProducts = 0;
let allProducts = [];
let allData = {};

function fetchAndRenderProducts() {
  fetch(`${url}/Stores/${uid}/Products.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        allData = data;
        const { category, piece, type } = getFilterFromUrl();
        updateCategoryTitle(category, piece, type);
        filterProducts(category, piece, type); // Filter products based on the URL parameters
        totalProducts = allProducts.length;
        document.getElementById(
          "itemscounter"
        ).textContent = `${totalProducts} ${
          totalProducts === 1 ? "Item" : "Items"
        }`;
        handleProductRendering(); // Render the filtered products
      } else {
        console.log("No products found");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function updateCategoryTitle(category, piece, type) {
  const categoryTitleElement = document.getElementById("category-title");

  // Initialize the base title as "Shop All"
  // let title = "shop all";
  let title = "";

  // If category is present, add it to the title
  if (category) {
    title += ` ${category}`;
  }

  // If piece is present, append it to the title
  if (piece) {
    title += ` ${piece}`;
  }

  // If type is present, append it as well (optional based on your requirement)
  if (type) {
    title += ` ${type}`;
  }

  // Update the category title element with the constructed title
  categoryTitleElement.textContent = title || "Shop All";
}

function filterProducts(category, piece, type) {
  if (category || piece || type) {
    allProducts = Object.keys(allData)
      .filter((key) => {
        const product = allData[key];
        // Check that all specified filters match the product attributes
        const categoryMatch = category
          ? product["category"] === category
          : true;
        const pieceMatch = piece ? product["piece"] === piece : true;
        const typeMatch = type ? product["type"] === type : true;

        // Return products that match all non-empty filter criteria
        return categoryMatch && pieceMatch && typeMatch;
      })
      .reverse(); // Reverse the product keys to sort from latest to earliest
  } else {
    allProducts = Object.keys(allData).reverse(); // Reverse the product keys to sort from latest to earliest
  }
}

function renderProducts() {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = ""; // Clear existing products from the list

  if (totalProducts === 0) {
    const { category, piece } = getFilterFromUrl();
    console.log(category, piece);

    // Create message container
    const noProductsMessage = document.createElement("div");
    noProductsMessage.classList.add("no-product-message-container");

    // Create elegant message with styling
    noProductsMessage.innerHTML = `
        <div class="no-products-content">
           <i class="bi bi-exclamation-diamond-fill"></i>
            <p class="no-products-text">No ${category} ${piece} available in this store</p>
            <p class="no-products-subtext">Please check back later or browse other categories</p>
        </div>
    `;

    // Apply styles
    noProductsMessage.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 300px;
        width: 100%;
    `;

    // Add to DOM
    productList.innerHTML = ""; // Clear existing content
    productList.style.display = "block";
    productList.appendChild(noProductsMessage);

    return;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, totalProducts);
  const productKeys = allProducts.slice(start, end);

  // Iterate through the product data and render each product
  productKeys.forEach((key) => {
    const product = allData[key];
    const productCard = document.createElement("li");
    productCard.classList.add("product-item", "animate-on-scroll");
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
    productList.appendChild(productCard);

    // Set up hover effect for the newly created product card
    setupHoverEffect(productCard);
  });

  updatePaginationButtons();
  setupBadgeAnimations();
  setupPriceAnimations();

  // Set up event listeners for "Add to Cart" buttons
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
    await renderProducts();

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

function updatePaginationButtons() {
  document.getElementById("prevPageBtn").disabled = currentPage === 1;
  document.getElementById("nextPageBtn").disabled =
    currentPage * itemsPerPage >= totalProducts;
}

document.getElementById("prevPageBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts();
  }
});

document.getElementById("nextPageBtn").addEventListener("click", () => {
  if (currentPage * itemsPerPage < totalProducts) {
    currentPage++;
    renderProducts();
  }
});

fetchAndRenderProducts();
