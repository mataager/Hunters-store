function addToCart() {
  const title = document.getElementById("productTitle").innerText;
  const brandName = document.getElementById("BrandName").innerText;
  const productPrice = document.getElementById("productPrice").innerText;
  const productSize = document.getElementById("product-Size").innerText;
  const productColor = document.getElementById("product-color").innerText;
  const productID = document.getElementById("productID").innerText;

  // Get the reference to the img element
  const productImage = document.getElementById("productImage");

  // Get the src attribute value
  const srcValue = productImage.getAttribute("src");

  const newItem = {
    id: productID,
    brand: brandName,
    title: title,
    productSize: productSize,
    productColor: productColor,
    price: productPrice,
    photourl: srcValue,
    quantity: 1, // Initialize quantity
  };

  // Retrieve cart from local storage or initialize it as an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if an item with the same ID, size, and color already exists
  const existingItem = cart.find(
    (item) =>
      item.id === newItem.id &&
      item.productSize === newItem.productSize &&
      item.productColor === newItem.productColor
  );

  if (existingItem) {
    // If the item exists, increase its quantity
    existingItem.quantity += 1;
  } else {
    // If the item doesn't exist, add it as a new item
    cart.push(newItem);
  }

  // Store the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  Swal.fire({
    html: `
     <p class="swal-success-message">
      The item was added to cart successfully
    </p>
    <div class="swal-product-container">
      <img src="${productImage.getAttribute("src")}" class="swal-product-image">
      <div class="swal-product-content">
        <p class="swal-product-title">${title}</p>
        <div class="swal-button-group">
          <button id="continueBtn" class="swal-continue-btn">
            Continue Shopping
          </button>
          <button id="cartBtn" class="swal-cart-btn">
            View Cart
          </button>
        </div>
      </div>
    </div>
  `,
    icon: "success",
    showConfirmButton: false,
    timer: 30000,
    timerProgressBar: true,
    background: "#fff",
    width: "400px",
    padding: "1rem",
    customClass: {
      popup: "custom-swal-toast",
      container: "swal-container",
    },
    didOpen: () => {
      document
        .getElementById("continueBtn")
        .addEventListener("click", () => Swal.close());
      document.getElementById("cartBtn").addEventListener("click", () => {
        window.location.href = "./Cart.html";
      });
    },
  });
  updateCartCount();
}

function openCartModal(productId) {
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

  fetch(`${url}/Stores/${uid}/Products/${productId}.json`)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((product) => {
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

        // Rest of your product rendering code...
        const saleAmount = product["sale-amount"];
        const originalPrice = product["Product-Price"];

        function calculateSalePrice(originalPrice, saleAmount) {
          return originalPrice * (1 - saleAmount / 100);
        }

        let salePrice = originalPrice;

        if (saleAmount) {
          salePrice = calculateSalePrice(originalPrice, saleAmount);
        }

        modalContent.productDetails = product; // Store product details in the modal content

        // Check and set default image source if necessary
        setDefaultImageSource(product);

        // Render product content
        modalContent.innerHTML = `
        <div class="flex justify-content-space-between width-available modal-header">
        <div class="flex center flex-end " onclick="productDetails('${productId}')">
          <button type="button" class="modalbtnL" id="perv4Button">
          <i class="bi bi-box-arrow-in-down-right"></i>
          </button>
      </div>
      <div class="flex center flex-end" onclick="closeModal()">
          <button type="button" class="modalbtnR" id="perv4Button">
             <i class="bi bi-x"></i>
          </button>
      </div>
      </div>
      <h5 class="m-5 BrandName-p pointer" id="BrandName" onclick="brand('${
        product["Brand-Name"]
      }')">${product["Brand-Name"]}</h5>
       <h2 class="m-5 pointer title" onclick="productDetails('${productId}')" id="productTitle">${
          product["product-title"]
        }</h2>
         <div>
      <div class="price-animation-modal-container">
          ${
            saleAmount
              ? `<del class="pre-sale-animation">${originalPrice} EGP</del>`
              : ""
          }
          <p class="card-price-animation" id="productPrice">${salePrice} EGP</p>
          </div>
           </div>
          
        </div>
     
          <div style="width:200px">
           <div class="hidden outofstockmessagebannermodal" id="outofstockmessagebanner">out of stock</div>
            <img id="productImage" class="m-5 product-image radius-5 width-available active" src="${
              product["product-photo"]
            }" alt="Product Image">
          </div>

          <div class="size m-5"><h3 class="m-5 flex pb-7 center align-items">Size: <p id="product-Size"></p></h3><div id="size-hint-text" style="display: none; font-size: 16px; color: #333; margin-top: 10px;"></div></div>
          <ul class="mt-5 flex flex-wrap">${Object.keys(product.sizes)
            .map(
              (size) =>
                `<div class="size-radio m-5" onclick="SizeRef('${size}')"><label class="radio-input_option"><span class="size-value">${size}</span></label></div>`
            )
            .join("")}</ul>
          <div class="size m-5"><h3 class="m-5 flex pb-7 center align-items hidden">Color: <p id="product-color"></p></h3><div id="color-hint-text" style="display: none; font-size: 16px; color: #333; margin-top: 10px;"></div></div>

          <ul id="product-colors" class="m-5 flex flex-wrap hidden"></ul>
          <div class="m-5 flex align-items hidden">
           SKU:<p id="productID">${productId}</p>
          </div>
           <h5 id="stockContainer" class="mb-10 m-5 flex pl-0 hidden">
                                        <p class="stockMessage-p" id="stockMessage"></p>
                                    </h5>
          <div class="flex center flex-direction-column align-items" id="buybuttonsarea">
          <div class="m-5 hidden">
              <div id="BuyNowButton" class="Buyitnow">Buy Now
                <i class="bi bi-lightning"></i>
              </div>
            </div>
          <div class="m-5">
            <button id="addToCartButton" onclick="addToCart()" class="Add-to-Cart" disabled style="opacity: 0.5;">Add to Cart <i class="bi bi-exclamation-lg"></i></button>
          </div>
           
            </div>
        `;
        setupPricemodalAnimations();
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
    })
    .catch((error) => {
      console.error("Error:", error);
      setTimeout(() => {
        preloader.classList.add("hidden");
      }, minLoadTime);
    });
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");

  setTimeout(() => {
    document.body.style.overflow = "auto";
    document.body.classList.remove("modal-open");
  }, 400); // Match transition duration
}

function colorRef(color) {
  const modalContent = document.querySelector(".modal-content");
  const product = modalContent.productDetails;
  const size = document.getElementById("product-Size").innerText;
  const choosedColor = document.getElementById("product-color");

  // Get the clicked color element
  const clickedColorOption = document.querySelector(
    `.color-option[data-color-name="${color}"]`
  );

  choosedColor.innerText = color;

  // Update the images for the selected color
  if (product.sizes[size] && product.sizes[size][color]) {
    const colorDetails = product.sizes[size][color];
    document.getElementById("productImage").src = colorDetails.img1;
  }

  // Highlight the selected color
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    option.style.borderBottom =
      option.dataset.colorName === color ? "5px solid #c1c1c1" : "none";
  });

  // Check stock status using the data-qty attribute
  if (clickedColorOption) {
    const qty = clickedColorOption.getAttribute("data-qty");
    checkStockStatus(qty);
  }

  updateAddToCartButtonState();
}
function SizeRef(size) {
  const modalContent = document.querySelector(".modal-content");
  const product = modalContent.productDetails;
  const choosedSize = document.getElementById("product-Size");
  const choosedColor = document.getElementById("product-color");

  // Clear the color when size changes
  choosedColor.innerText = "";
  choosedSize.innerText = size;

  // Update size buttons' styles
  const sizeButtons = document.querySelectorAll(".size-radio");
  sizeButtons.forEach((button) => {
    button.style.backgroundColor =
      button.textContent.trim() === size ? "#333" : "";
    button.style.color = button.textContent.trim() === size ? "#fff" : "#000";
  });

  // Display available colors for the selected size
  const colorsForSize = product.sizes[size];
  const colorList = modalContent.querySelector("#product-colors");
  colorList.innerHTML = Object.keys(colorsForSize)
    .map((color) => {
      const qty = colorsForSize[color]["qty"];
      return `
          <div class="color-option" 
               data-color-name="${color}" 
               data-qty="${qty}"
               style="background-color: ${colorsForSize[color]["color-value"]}" 
               onclick="colorRef('${color}')">
          </div>`;
    })
    .join("");
  colorList.classList.remove("hidden");

  updateAddToCartButtonState();
}

function updateAddToCartButtonState() {
  const size = document.getElementById("product-Size").innerText.trim(); // Get the selected size
  const color = document.getElementById("product-color").innerText.trim(); // Get the selected color
  const addToCartButton = document.getElementById("addToCartButton");
  const sizeHintTextElement = document.getElementById("size-hint-text");
  const colorHintTextElement = document.getElementById("color-hint-text");

  addToCartButton.classList.add("flex", "align-items", "gap-5");
  // Handle size hint
  if (!size) {
    if (sizeHintTextElement) {
      sizeHintTextElement.innerText = "Must choose a size!";
      sizeHintTextElement.style.display = "block";
      sizeHintTextElement.classList.add("rolling-animation");

      // Add underline animation
    }

    // Disable "Add to Cart" button
    addToCartButton.disabled = true;
    addToCartButton.style.opacity = 0.5;
    addToCartButton.innerHTML =
      'Add to Cart <i class="bi bi-exclamation-lg"></i>';
    addToCartButton.onclick = null;
    return;
  }

  // Hide size hint if size is selected
  if (sizeHintTextElement) {
    sizeHintTextElement.style.display = "none";
    sizeHintTextElement.classList.remove("rolling-animation");
    sizeHintTextElement.innerHTML = ""; // Clear dynamically added underline
  }

  // Handle color hint
  if (!color) {
    if (colorHintTextElement) {
      colorHintTextElement.innerText = "Must choose a color!";
      colorHintTextElement.style.display = "block";
      colorHintTextElement.classList.add("rolling-animation");

      // Add underline animation
    }

    // Disable "Add to Cart" button
    addToCartButton.disabled = true;
    addToCartButton.style.opacity = 0.5;
    addToCartButton.innerHTML =
      'Add to Cart <i class="bi bi-exclamation-lg"></i>';
    addToCartButton.onclick = null;
    return;
  }

  // Hide color hint if color is selected
  if (colorHintTextElement) {
    colorHintTextElement.style.display = "none";
    colorHintTextElement.classList.remove("rolling-animation");
    colorHintTextElement.innerHTML = ""; // Clear dynamically added underline
  }

  // Enable "Add to Cart" button when both size and color are selected
  addToCartButton.disabled = false;
  addToCartButton.style.opacity = 1;
  addToCartButton.innerHTML =
    'Add to Cart <ion-icon name="cart-outline" role="img" class="md hydrated" aria-label="cart outline"></ion-icon>';
  addToCartButton.onclick = addToCart;
}

let currentIndex = 0;

// Array of image element IDs
const imageIds = ["productImage"];

// Function to show the previous image
function previousImage() {
  // Get the current image element and remove the "active" class
  document.getElementById(imageIds[currentIndex]).classList.remove("active");

  // Decrement the index (wrap around if needed)
  currentIndex = (currentIndex - 1 + imageIds.length) % imageIds.length;

  // Add the "active" class to the new current image
  document.getElementById(imageIds[currentIndex]).classList.add("active");
}

// Function to show the next image
function nextImage() {
  // Get the current image element and remove the "active" class
  document.getElementById(imageIds[currentIndex]).classList.remove("active");

  // Increment the index (wrap around if needed)
  currentIndex = (currentIndex + 1) % imageIds.length;

  // Add the "active" class to the new current image
  document.getElementById(imageIds[currentIndex]).classList.add("active");
}
