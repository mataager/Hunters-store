// async function checkavailableitems(user) {
//   try {
//     // Show spinner and hide stock info initially
//     document
//       .querySelectorAll(".spinner-sm-available-items")
//       .forEach((spinner) => spinner.classList.remove("hidden"));
//     document.getElementById("stockCount").classList.add("hidden");
//     document.getElementById("progress-bar-area").classList.add("hidden");

//     // Get the ID token
//     const idToken = await user.getIdToken();
//     const uid = user.uid; // Get the user's UID

//     // Construct the URL with the user's UID
//     const url = `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/Products.json?auth=${idToken}`;

//     // Fetch the product data
//     const response = await fetch(url, {
//       headers: { Authorization: `Bearer ${idToken}` }, // Send token for authentication
//     });

//     // Ensure at least 2.5 seconds of spinner time
//     await new Promise((resolve) => setTimeout(resolve, 2500));

//     if (!response.ok) {
//       throw new Error("Failed to fetch product data.");
//     }

//     const data = await response.json();

//     // Calculate product count and available stock
//     productCount = data ? Object.keys(data).length : 0;
//     availableStock = maxStock - productCount;

//     console.log(
//       `Total products: ${productCount}, Available stock: ${availableStock}`
//     );

//     // Update UI
//     updateStockUI();
//   } catch (error) {
//     console.error("Error fetching available items:", error);
//   }
// }

// Add this CSS to your stylesheet

// Add this CSS to your stylesheet

async function checkavailableitems(user) {
  // Create and show overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  // Create loader container
  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader-container";

  // Create three-dot loader
  const dotLoader = document.createElement("div");
  dotLoader.className = "dot-loader";
  dotLoader.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  // Create text element
  const loaderText = document.createElement("div");
  loaderText.className = "loader-text";
  loaderText.textContent = "Checking available items";

  // Assemble components
  loaderContainer.appendChild(dotLoader);
  loaderContainer.appendChild(loaderText);
  overlay.appendChild(loaderContainer);
  document.body.appendChild(overlay);

  try {
    // Show spinner and hide stock info initially
    document
      .querySelectorAll(".spinner-sm-available-items")
      .forEach((spinner) => spinner.classList.remove("hidden"));
    document.getElementById("stockCount").classList.add("hidden");
    document.getElementById("progress-bar-area").classList.add("hidden");

    // Get the ID token
    const idToken = await user.getIdToken();
    const uid = user.uid;

    // Construct the URL with the user's UID
    const url = `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/Products.json?auth=${idToken}`;

    // Fetch the product data
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    // Ensure at least 2.5 seconds of spinner time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    if (!response.ok) {
      throw new Error("Failed to fetch product data.");
    }

    const data = await response.json();

    // Calculate product count and available stock
    productCount = data ? Object.keys(data).length : 0;
    availableStock = maxStock - productCount;

    console.log(
      `Total products: ${productCount}, Available stock: ${availableStock}`
    );

    // Update UI
    updateStockUI();

    // Remove submit button if no available stock
    const submitButton = document.getElementById("sub-btn");
    if (availableStock <= 0 && submitButton) {
      submitButton.remove();

      // Show message to user
      const message = document.createElement("div");
      message.textContent = "You have reached your maximum product limit";
      message.style.color = "red";
      message.style.marginTop = "20px";
      message.style.textAlign = "center";
      submitButton.parentNode.insertBefore(message, submitButton.nextSibling);
    }
  } catch (error) {
    console.error("Error fetching available items:", error);

    // Show error message in overlay
    overlay.innerHTML = "Error checking available items";
    overlay.classList.add("error-text");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } finally {
    // Fade out and remove overlay
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 500);
  }
}

function updateStockUI() {
  const progressBar = document.getElementById("progressBar");
  const availableStockText = document.getElementById("available-items-stock");
  const totalProductText = document.getElementById("total-products-count");
  const progressBarArea = document.getElementById("progress-bar-area");

  // Hide spinner and show stock info

  document
    .querySelectorAll(".spinner-sm")
    .forEach((spinner) => spinner.classList.add("hidden"));
  document.getElementById("stockCount").classList.remove("hidden");
  document.getElementById("progress-bar-area").classList.remove("hidden");
  setTimeout(() => {
    progressBarArea.classList.add("show"); // Add class after a delay
  }, 100); // Small delay before applying the show class

  // Update available stock and total products
  availableStockText.textContent = availableStock;
  totalProductText.textContent = productCount;

  // Calculate percentage used and update progress bar
  const usedPercentage = ((maxStock - availableStock) / maxStock) * 100;
  progressBar.style.width = usedPercentage + "%";
}

// Decrease available stock when "Sell Item" button is clicked
function decreaseStock() {
  if (availableStock > 0) {
    availableStock--; // Reduce stock
    productCount++; // Increase total products
    updateStockUI(); // Update UI
  } else {
    alert("No stock left!");
  }
}
