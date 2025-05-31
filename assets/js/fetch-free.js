async function fetchAndRenderProducts() {
  document.getElementById("preloader").style.display = "flex";
  fetch(`${url}/Stores/${uid}/Products.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      createSearchIndex(data);
      // Check if data is not empty
      if (data) {
        const productOverview = document.querySelector(".product-overview");
        const Bestsellercontainer = document.querySelector(".BestSellers");
        const newArrivalsContainer = document.getElementById("NewArrivalls");
        const saleContainer = document.getElementById("Sale");

        if (!newArrivalsContainer) {
          console.error("New Arrivals container not found.");
          return;
        }

        if (!saleContainer) {
          console.error("Sale container not found.");
          return;
        }

        productOverview.innerHTML = ""; // Clear existing products from the overview
        newArrivalsContainer.innerHTML = ""; // Clear existing new arrivals
        saleContainer.innerHTML = ""; // Clear existing sale items
        Bestsellercontainer.innerHTML = ""; // Clear existing sale items

        // Shuffle the product data
        const shuffledData = shuffle(Object.entries(data));

        // Get the last 15 products for New Arrivals
        const newArrivalsData = shuffledData.slice(-15);

        // Render New Arrivals
        newArrivalsData.forEach(([key, product]) => {
          const newProductItem = document.createElement("li");
          newProductItem.classList.add("product-item");

          const productCard = document.createElement("div");
          productCard.classList.add("fit-content");

          const saleAmount = product["sale-amount"];
          const originalPrice = product["Product-Price"];

          const salePrice = calculateSalePrice(originalPrice, saleAmount);
          // Check if the product is a best seller
          const bestSellerHTML = product["bestseller"]
            ? `<div class="best-seller" id="best-seller">Bestseller<i class="bi bi-lightning-charge"></i></div>`
            : "";
          //

          // Check and set default image source if necessary
          setDefaultImageSource(product);
          const { colorOptionsContainer, outOfStockBadge } =
            getColorOptionsAndStockInfo(product);
          // Adjust this part according to your product card structure
          productCard.innerHTML = `
            <div class="product-card" tabindex="0">
              <figure class="card-banner">
                <img src="${product["product-photo"]}" width="312" height="350" alt=""class="image-contain" id="swipe1">
                <img src="${product["product-photo2"]}" width="312" height="350" alt="" id="swipe2" class="image-contain" style="display: none;">
                ${outOfStockBadge}
                <div class="card-badge"><div class="badge-txt">New</div></div>
               
                <ul class="card-action-list">
                  <li class="card-action-item">
                    <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
              <div class="card-content mt-10">
                ${colorOptionsContainer}
                <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
                  <a class="title" href="#">${product["product-title"]}</a>
                </h3>
                <div class="price-animation-container">
            <del class="pre-sale-animation">${originalPrice} EGP</del>
            <p class="card-price-animation">${salePrice} EGP</p>
            </div>
                <a href="#" class="card-price hidden font-small">${key}</a>
              </div>
            </div>
          `;
          // Observe the new card with staggered delay
          newProductItem.appendChild(productCard);
          newArrivalsContainer.appendChild(newProductItem);

          // Setup hover effect for the new product card
          setupHoverEffect(productCard);
          setupPriceAnimations();
        });
        // Limit the number of products to be displayed in the main product overview to 12
        const limitedData = shuffledData.slice(0, 12);

        // Iterate through the limited data and render each product in the product overview
        limitedData.forEach(([key, product]) => {
          const productCard = document.createElement("div");
          productCard.classList.add(
            "product-card-overview",
            "animate-on-scroll"
          );

          const saleAmount = product["sale-amount"];
          const originalPrice = product["Product-Price"];

          // Check if the product is a best seller
          const bestSellerHTML = product["bestseller"]
            ? `<div class="best-seller" id="best-seller">Bestseller<i class="bi bi-lightning-charge"></i></div>`
            : "";
          //
          const salePrice = calculateSalePrice(originalPrice, saleAmount);
          const { colorOptionsContainer, outOfStockBadge } =
            getColorOptionsAndStockInfo(product);
          setDefaultImageSource(product);

          // Construct product card HTML (your existing logic)
          productCard.innerHTML = `
            <div class="product-card" tabindex="0">
              <figure class="card-banner">
                <img src="${
                  product["product-photo"]
                }" width="312" height="350" alt="" class="image-contain" id="swipe1">
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
                    <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
            <del class="pre-sale-animation">${originalPrice} EGP</del>
            <p class="card-price-animation">${salePrice} EGP</p>
            </div>
                <a href="#" class="card-price hidden font-small">${key}</a>
              </div>
            </div>
          `;

          productOverview.appendChild(productCard);
          setDefaultImageSource(product);
          // Set up hover effect for the product card in the product overview
          setupHoverEffect(productCard);
          setupPriceAnimations();
        });
        setupBadgeAnimations();
        // Render Sale Items
        renderSaleItems(shuffledData, saleContainer);
        renderBestSellers(shuffledData, Bestsellercontainer);

        // Set up event listeners for "Add to Cart" buttons (your existing logic)
        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
        addToCartButtons.forEach((button) =>
          button.addEventListener("click", (event) => {
            const productId =
              event.target.closest(".add-to-cart-btn").dataset.productId;
            openCartModal(productId);
          })
        );
      } else {
        const productOverview = document.getElementById("mainpage");
        document.getElementById("preloader").style.display = "none";
        productOverview.innerHTML = `
    <div class="no-product-message-container">
    <i class="bi bi-exclamation-octagon icon"></i>
        <div class="No-available-items">
            <p>No products available at this time</p>
        </div>
    </div>
`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// function for store products data in local storage to help in the search
function createSearchIndex(productsData) {
  const searchIndex = {};
  const brandCounts = {}; // To track brand popularity

  // First pass: Build search index and count brands
  for (const productId in productsData) {
    const product = productsData[productId];
    const brand = product["Brand-Name"] || "";

    // Count brands for popularity
    if (brand) {
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    }

    // Build search index as before
    searchIndex[productId] = {
      id: productId,
      brand: brand,
      title: product["product-title"] || "",
      photo: product["product-photo"] || "",
      category: product.category || "",
      type: product.type || "",
      price: product["Product-Price"] || "",
      saleAmount: product["sale-amount"] || 0,
    };
  }

  // Store search index
  localStorage.setItem("productSearchIndex", JSON.stringify(searchIndex));

  // Process and store top 20 brands
  const sortedBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 20) // Take top 20
    .map((entry) => entry[0]); // Extract just brand names

  localStorage.setItem("sitepopularbrands", JSON.stringify(sortedBrands));
}

// Helper function to get the popular brands
function getPopularBrands() {
  return JSON.parse(localStorage.getItem("sitepopularbrands")) || [];
}

// Example usage:
// const top20Brands = getPopularBrands();
// Helper function to get color value from the product data (your existing logic)
function getColorValue(product, color) {
  if (product.sizes) {
    for (const size in product.sizes) {
      if (product.sizes[size][color]) {
        return product.sizes[size][color]["color-value"];
      }
    }
  }
  return "#000000"; // Default color if not found
}

// Helper function to calculate sale price

// Function to render sale items (limited to first 20)
function renderSaleItems(products, saleContainer) {
  let saleItemCount = 0;
  products.forEach(([key, product]) => {
    if (product["sale-amount"] && saleItemCount < 20) {
      const saleItem = document.createElement("li");
      saleItem.classList.add("product-item");

      const productCard = document.createElement("div");
      productCard.classList.add("fit-content");

      const saleAmount = product["sale-amount"];
      const originalPrice = product["Product-Price"];
      const salePrice = calculateSalePrice(originalPrice, saleAmount);

      // Check if the product is a best seller
      const bestSellerHTML = product["bestseller"]
        ? `<div class="best-seller" id="best-seller">Bestseller<i class="bi bi-lightning-charge"></i></div>`
        : "";
      //
      const { colorOptionsContainer, outOfStockBadge } =
        getColorOptionsAndStockInfo(product);

      productCard.innerHTML = `
        <div class="product-card" tabindex="0">
          <figure class="card-banner">
            <img src="${
              product["product-photo"]
            }" width="312" height="350" alt="" class="image-contain" id="swipe1">
            <img src="${
              product["product-photo2"]
            }" width="312" height="350" id="swipe2" class="image-contain" style="display: none;">
            ${outOfStockBadge}
           ${
             saleAmount
               ? `<div class="card-badge"><div id="saleAmountbadge">-${saleAmount}%</div></div>`
               : ""
           }
            <ul class="card-action-list">
              <li class="card-action-item">
                <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
          <div class="card-content mt-10">
          ${colorOptionsContainer}
            <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
              <a class="title" href="#">${product["product-title"]}</a>
            </h3>
            <div class="price-animation-container">
            <del class="pre-sale-animation">${originalPrice} EGP</del>
            <p class="card-price-animation">${salePrice} EGP</p>
            </div>
            <a href="#" class="card-price hidden font-small">${key}</a>
          </div>
        </div>
      `;
      setDefaultImageSource(product);
      saleItem.appendChild(productCard);
      saleContainer.appendChild(saleItem);

      // Setup hover effect for the sale product card
      setupHoverEffect(productCard);
      setupPriceAnimations();

      saleItemCount++;
      document.getElementById("preloader").style.display = "none";
    } else {
      document.getElementById("preloader").style.display = "none";
    }
  });
}
//render bestsellers
function renderBestSellers(products, bestSellersContainer) {
  // Clear container and show loading state
  bestSellersContainer.innerHTML = "";
  document.getElementById("preloader").style.display = "flex";

  // Filter products where bestseller is explicitly true
  const bestSellers = products.filter(
    ([key, product]) => product.bestseller === true
  );

  if (bestSellers.length === 0) {
    document.getElementById("BestSellersSection").classList.add("hidden");
    document.getElementById("preloader").style.display = "none";
    return;
  }

  // Limit to 20 bestsellers, shuffle, then reverse the order
  const limitedBestSellers = shuffle(bestSellers).slice(0, 20).reverse();

  limitedBestSellers.forEach(([key, product]) => {
    const bestSellerItem = document.createElement("li");
    bestSellerItem.classList.add("product-card-overview", "animate-on-scroll");

    const productCard = document.createElement("div");

    const saleAmount = product["sale-amount"];
    const originalPrice = product["Product-Price"];
    const salePrice = calculateSalePrice(originalPrice, saleAmount);

    // Check and set default image source
    setDefaultImageSource(product);
    const { colorOptionsContainer, outOfStockBadge } =
      getColorOptionsAndStockInfo(product);

    productCard.innerHTML = `
      <div class="product-card" tabindex="0">
        <figure class="card-banner">
          <img src="${
            product["product-photo"]
          }" width="312" height="350" alt="" class="image-contain" id="swipe1">
          <img src="${
            product["product-photo2"]
          }" width="312" height="350" id="swipe2" class="image-contain" style="display: none;">
          ${outOfStockBadge}
          ${
            saleAmount
              ? `<div class="card-badge"><div id="saleAmountbadge">-${saleAmount}%</div></div>`
              : ""
          }
          <ul class="card-action-list">
            <li class="card-action-item">
              <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
              <button class="card-action-btn" aria-labelledby="card-label-4">
                <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart-outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-4">Add to Favourite</div>
            </li>
          </ul>
        </figure>
        <div class="card-content mt-10">
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
      </div>
    `;

    bestSellerItem.appendChild(productCard);
    bestSellersContainer.appendChild(bestSellerItem);
    setupPriceAnimations();

    // Setup hover effect
    setupHoverEffect(productCard);
  });

  document.getElementById("preloader").style.display = "none";
}

// Fetch and render products including New Arrivals and Sale Items on page load

window.addEventListener("load", fetchAndRenderProducts);

// Shuffle function to randomize the order of elements in an array (your existing logic)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
