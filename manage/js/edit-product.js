async function searchProduct() {
  const spinner = document.getElementById("sub-spin-edit");
  const searchicon = document.getElementById("sub-txt-edit");
  const message = document.getElementById("warning");
  const editdiv = document.getElementById("edititem-details");
  const productId = document.getElementById("product-id-input").value.trim();

  document
    .getElementById("BestsellerSwitcher")
    .addEventListener("change", function () {
      if (this.checked) {
        this.setAttribute("bestseller", "true");
      } else {
        this.setAttribute("bestseller", "false");
      }
    });

  // Show the spinner
  spinner.classList.remove("hidden");
  searchicon.classList.add("hidden");

  if (!productId) {
    editdiv.classList.add("hidden");
    Swal.fire({
      icon: "warning",
      text: "Please enter a product ID",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Hide the spinner after showing the warning
      spinner.classList.add("hidden");
      searchicon.classList.remove("hidden");
    });
    return;
  }

  try {
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json`
    );
    const data = await response.json();

    if (!data) {
      editdiv.classList.add("hidden");
      Swal.fire({
        icon: "info",
        text: "Product not found",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Hide the spinner after showing the info
        spinner.classList.add("hidden");
        searchicon.classList.remove("hidden");
      });
      return;
    }

    // Fill the form with the fetched data
    document.getElementById("producttitle-2").value =
      data["product-title"] || "";
    document.getElementById("brandname-2").value = data["Brand-Name"] || "";
    document.getElementById("productprice-2").value =
      data["Price-before"] || "";
    document.getElementById("sale-amount-2").value = data["sale-amount"] || "";
    document.getElementById("category-2").value = data["category"] || "";
    document.getElementById("Piece-2").value = data["piece"] || "";
    document.getElementById("Type-2").value = data["type"] || "";
    document.getElementById("productdescription-2").value =
      data["product-description"] || "";
    document.getElementById("mainimg1").src =
      data["product-photo"] ||
      "https://www.svgrepo.com/show/489809/upload-cloud.svg";
    document.getElementById("mainimg2").src =
      data["product-photo2"] ||
      "https://www.svgrepo.com/show/489809/upload-cloud.svg";
    document.getElementById("mainimg3").src =
      data["product-photo3"] ||
      "https://www.svgrepo.com/show/489809/upload-cloud.svg";
    document.getElementById("mainimg4").src =
      data["product-photo4"] ||
      "https://www.svgrepo.com/show/489809/upload-cloud.svg";
    document.getElementById("mainimg5").src =
      data["product-photo5"] ||
      "https://www.svgrepo.com/show/489809/upload-cloud.svg";
    document.getElementById("mainimg6").src =
      data["product-photo6"] ||
      "https://www.svgrepo.com/show/489809/upload-cloud.svg";

    // Set Bestseller Switcher
    const bestsellerSwitcher = document.getElementById("BestsellerSwitcher");
    if (data["bestseller"] === true) {
      bestsellerSwitcher.checked = true;
      bestsellerSwitcher.setAttribute("bestseller", "true");
    } else {
      bestsellerSwitcher.checked = false;
      bestsellerSwitcher.setAttribute("bestseller", "false");
    }

    const categorySelect = document.getElementById("category-2");
    const pieceSelect = document.getElementById("Piece-2");
    const typeSelect = document.getElementById("Type-2");

    categorySelect.value = data["category"] || "";

    calculateFinalPrice2();
    // Update the piece dropdown options and type based on the retrieved category and piece
    updatePieceOptions(categorySelect, pieceSelect, typeSelect);
    pieceSelect.value = data["piece"] || "";
    updateType(categorySelect, pieceSelect, typeSelect);

    renderaddsizeflowbtn();

    // Add event listeners for category and piece change in the edit form
    categorySelect.addEventListener("change", () =>
      updatePieceOptions(categorySelect, pieceSelect, typeSelect)
    );
    pieceSelect.addEventListener("change", () =>
      updateType(categorySelect, pieceSelect, typeSelect)
    );

    const container = document.getElementById("input-container2");
    container.innerHTML = ""; // Clear previous entries

    const sizes = data["sizes"];
    let count = 0;
    for (const size in sizes) {
      for (const color in sizes[size]) {
        count++;
        const product = sizes[size][color];
        const newDiv = document.createElement("div");
        newDiv.classList.add(
          "flex",
          "center",
          "input-set",
          "mb-3",
          "flex-wrap",
          "mb-30",
          "add-product-cart",
          "product-record",
          "shadow"
        );
        newDiv.id = `p${count}`;

        // Improved cleanImageUrl function
        function cleanImageUrl(url) {
          if (!url || url === "undefined" || url === "null") {
            return "";
          }
          return url;
        }

        // Prepare image URLs
        const img1 = cleanImageUrl(product.img1);
        const img2 = cleanImageUrl(product.img2);
        const img3 = cleanImageUrl(product.img3);
        const img4 = cleanImageUrl(product.img4);
        const img5 = cleanImageUrl(product.img5);
        const img6 = cleanImageUrl(product.img6);

        newDiv.innerHTML = `
          <div class="i-div align-items">
            <button type="button" style="border: none; margin-left:5px;margin-bottom: 0px;" class="formbold-form-label point toggle-expand2 cus-btn">
              <i class="bi bi-arrows-angle-contract"></i>
              <i class="bi bi-arrows-angle-expand none"></i>
            </button>
            <button type="button" style="border: none; margin-left:auto" class=" point no-bg-i toggle-delete2 ml-auto cus-btn">
              <i class="bi bi-x-lg"></i>
            </button>

            <div class="flex center align-items ml-auto">
              <h5 class="mr-3 none" id="Quantity2">Qty:</h5>
              <h5 class="none" id="QuantityValue2">${product.qty}</h5>
            </div>
            <div class="flex center align-items ml-auto">
              <h5 class="mr-3 none" id="size2">Size:</h5>
              <h5 class="none" id="sizevalue2">${size}</h5>
            </div>

            <div class="flex center align-items ml-auto">
              <label class="circle mr-3 none" id="Colorcircle2" style="background-color: ${
                product["color-value"]
              };"></label>
              <h5 class="color-value none" id="colorvalue2">${
                product["color-value"]
              }</h5>
            </div>
          </div>
          <div class="product-data" id="product-data2" style="max-height: 1300px; opacity: 1; padding: 10px 0px;">
            <div class="flex center mb-3">

<div class="flex mb-10 minline-140 p5 center align-items gap-10 align-flex-start-SQ">

<div class="input-group flex column">
    <label class="font-sm m510" for="size${count}">Size</label>
    <div class="input-with-buttons column">
        <input id="size2" type="text" name="size2" class="formbold-form-input m-LR-2 max-150" value="${size}">
        
    </div>
</div>

<div class="input-group flex column">
    <label class="font-sm m510" for="quantity${count}">Quantity</label>
    <div class="input-with-buttons">
        <input id="quantity2" type="text" name="quantity" class="formbold-form-input m-LR-2 max-200" value="${
          product.qty
        }">
         <div class="flex column gap-10 hidden">
        <button type="button" class="decrement-btn" onclick="decrement('quantity${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('quantity${count}')"><i class="bi bi-plus-circle"></i></button>
        </div>
    </div>
</div>
      </div>
            </div>
            <div class="flex center">
              <button type="button" class="show-img-url" onclick="toggleImageInputs(${count})">Show Images Urls <i class="bi bi-eye-fill"></i></button>
            </div>
           <div class="flex flex-wrap mb-3 imgids" id="image-inputs-${count}">
              <input type="text" id="img1_p${count}" name="product-photo2" placeholder="pic Url 1" class="formbold-form-input m-LR-2 mb-10" value="${img1}">
        <input type="text" id="img2_p${count}" name="product-photo2-2" placeholder="pic Url 2" class="formbold-form-input m-LR-2 mb-10" value="${img2}">
        <input type="text" id="img3_p${count}" name="product-photo2-3" placeholder="pic Url 3" class="formbold-form-input m-LR-2 mb-10" value="${img3}">
        <input type="text" id="img4_p${count}" name="product-photo2-4" placeholder="pic Url 4" class="formbold-form-input m-LR-2 mb-10" value="${img4}">
        <input type="text" id="img5_p${count}" name="product-photo2-5" placeholder="pic Url 5" class="formbold-form-input m-LR-2 mb-10" value="${img5}">
        <input type="text" id="img6_p${count}" name="product-photo2-6" placeholder="pic Url 6" class="formbold-form-input m-LR-2 mb-10" value="${img6}">
            </div>
            <div class="flex center flex-wrap mb-3">
              <div class="flex flex-column align-items relative">
                <div class="drop-zone" id="dropZone1_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                ${
                  product.img1
                    ? `<img id="editimg1_p${count}" src="${product.img1}" onclick="triggerFileSelect2(this)">`
                    : `<div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>`
                }
                  <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
                  
                </div>
              </div>
              <div class="flex flex-column align-items relative">
                <div class="drop-zone" id="dropZone2_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                 ${
                   product.img2
                     ? `<img id="editimg1_p${count}" src="${product.img2}" onclick="triggerFileSelect2(this)">`
                     : `<div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>`
                 }
                  <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">

                </div>
              </div>

            <div class="flex flex-column align-items relative">
              <div class="drop-zone" id="dropZone3_p${count}" ondragover="handleDragOve2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
               ${
                 product.img3
                   ? `<img id="editimg1_p${count}" src="${product.img3}" onclick="triggerFileSelect2(this)">`
                   : `<div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>`
               }
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">

              </div>
            </div>

            <div class="flex flex-column align-items relative">
              <div class="drop-zone" id="dropZone4_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
              ${
                product.img4
                  ? `<img id="editimg1_p${count}" src="${product.img4}" onclick="triggerFileSelect2(this)">`
                  : `<div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>`
              }
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">

              </div>
            </div>

            <div class="flex flex-column align-items relative">
              <div class="drop-zone" id="dropZone5_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
              ${
                product.img5
                  ? `<img id="editimg1_p${count}" src="${product.img5}" onclick="triggerFileSelect2(this)">`
                  : `<div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>`
              }
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">

              </div>
            </div>

            <div class="flex flex-column align-items relative">
              <div class="drop-zone" id="dropZone6_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
               ${
                 product.img6
                   ? `<img id="editimg1_p${count}" src="${product.img6}" onclick="triggerFileSelect2(this)"> `
                   : `<div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>`
               }
               <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
             
              </div>
            </div>

            </div>

            <div class="flex center mb-3 mt-12">
        <div class="color-input-wrapper m-LR-2">
          <div class="flex center align-items">
            <input id="Colorbg${count}" style="width:45px;" type="text" name="color${count}" class="formbold-form-input" value="${color}">
            <input id="Color${count}" type="color" name="color-value" class="color-picker" value="${
          product["color-value"]
        }">
            <input type="file" id="imageInput${count}" accept="image/png, image/jpeg" style="display: none;">
          </div>
          <div class="flex column align-items">
          <div class="change-ctib hidden" id="change-ctib-${count}" title="change color as image"> <i class="bi bi-images"></i></div>
          <div class="rtc-ctib" id="ReturnToColor-ctib-${count}" title="save image as color" style="top: 22px;"><i class="bi bi-arrow-left-right"></i></div>

          </div>
        </div>

        <input id="colorname${count}" type="text" name="color-name" style="width: 150px;" placeholder="Black" class="formbold-form-input m-LR-2" value="${color}">
      </div>
          </div>
        `;

        fetchProductAndSizeChart();
        container.appendChild(newDiv);
        setupToggleExpand2(newDiv.querySelector(".toggle-expand2"));
        setupDeleteButton2(newDiv.querySelector(".toggle-delete2"));
        // setupFileInputHandlers2(count);
      }
    }

    editdiv.classList.remove("hidden");
    message.classList.add("hidden");
    searchicon.classList.remove("hidden");
    spinner.classList.add("hidden");
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      text: "An error occurred while fetching product data",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      spinner.classList.add("hidden");
      searchicon.classList.remove("hidden");
    });
  }
}
async function patchProduct() {
  const productId = document.getElementById("product-id-input").value.trim();

  const sizeChartSelect = document.getElementById("size-chart-2");
  const selectedOption = sizeChartSelect.options[sizeChartSelect.selectedIndex];

  const selectedSizeChartUrl = selectedOption ? selectedOption.value : ""; // Get only selected or empty

  // Get the current user
  const user = firebase.auth().currentUser;

  if (!user) {
    Swal.fire({
      title: "Authentication Required!",
      text: "You need to be signed in to update a product.",
      icon: "warning",
      confirmButtonText: "Okay",
      customClass: {
        container: "swal2-custom",
        title: "swal2-custom",
      },
    });
    return; // Exit if the user is not authenticated
  }

  if (!productId) {
    Swal.fire({
      icon: "warning",
      text: "Please enter a product ID",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  try {
    // Get the ID token of the authenticated user
    const idToken = await user.getIdToken();

    const cut = calculateFinalPrice2();

    const productData = {
      "product-title": document.getElementById("producttitle-2").value,
      "Brand-Name": document.getElementById("brandname-2").value,
      "Price-before": document.getElementById("productprice-2").value,
      "Product-Price": document.getElementById("priceplusthecut2").value,
      "matager-Cut": cut, // Add the calculated cut here
      "sale-amount":
        parseFloat(document.getElementById("sale-amount-2").value) || 0,
      category: document.getElementById("category-2").value,
      type: document.getElementById("Type-2").value,
      piece: document.getElementById("Piece-2").value,
      "size-chart-url": selectedSizeChartUrl, // Add the selected size chart URL
      "product-description": document.getElementById("productdescription-2")
        .value,
    };
    // Check if BestsellerSwitcher is marked as "bestseller"
    const bestsellerSwitcher = document.getElementById("BestsellerSwitcher");
    if (bestsellerSwitcher.getAttribute("bestseller") === "true") {
      productData.bestseller = true; // Add bestseller to product data
    } else {
      productData.bestseller = false;
    }

    const inputContainer = document.getElementById("input-container2");
    const products = inputContainer.querySelectorAll(".product-record");
    const sizes = {};

    products.forEach((product) => {
      const getValue = (selector) => {
        const el = product.querySelector(selector);
        return el ? el.value : "";
      };

      const size = getValue('[name^="size"]');
      const qty = parseInt(getValue('[name^="quantity"]'), 10) || 0;
      const color = getValue('[name^="color-name"]');
      const colorValue = getValue('[name^="color-value"]');

      if (!size || !color) return; // Skip if essential fields are missing

      // Collect images into an object with img1, img2, etc.
      const imageData = {};
      for (let i = 1; i <= 6; i++) {
        const imgValue = getValue(
          `[name^="product-photo2${i > 1 ? `-${i}` : ""}"]`
        );
        if (imgValue) {
          imageData[`img${i}`] = imgValue;
        }
      }

      if (!sizes[size]) sizes[size] = {};
      sizes[size][color] = {
        qty,
        "color-value": colorValue,
        ...imageData, // Spread the image properties
      };
    });

    productData["sizes"] = sizes;

    // Perform the PATCH request with the ID token
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    Swal.fire({
      icon: "success",
      title: "Updated",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Hide the edit div and reset its content
      const editdiv = document.getElementById("edititem-details");
      editdiv.classList.add("hidden");
      document.getElementById("edit-product-form").reset();
      document.getElementById("input-container2").innerHTML = ""; // Clear dynamic fields
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      showConfirmButton: false,
      timer: 1500,
    });
    console.error(error);
  }
}

function triggerFileSelect2(dropZone) {
  const hiddenInput = dropZone.querySelector(".hidden-file-input");
  if (hiddenInput) {
    hiddenInput.click();
  } else {
  }
}

async function handleFileSelect2(event, dropZone) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  const preloader = document.createElement("div");
  preloader.classList.add("uploadloader");
  dropZone.appendChild(preloader);

  // Remove any existing upload status elements
  const existingUploadStatus =
    dropZone.parentElement.querySelector(".upload-status");
  if (existingUploadStatus) {
    existingUploadStatus.remove();
  }
  const fileselect = `<input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">`;
  const dropZoneId = dropZone.id;
  const count = dropZoneId.split("_").pop(); // Extract the count from the drop zone ID

  try {
    // Upload the image using Cloudinary
    const result = await uploadToCloudinary(file, uploadPreset, cloudName);
    preloader.remove();

    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status", "upload-ico");

    if (result.success) {
      const imageUrl = result.data?.link; // Retrieve the image URL
      dropZone.innerHTML = `<img src="${imageUrl}" style="height: auto;">${fileselect}`;

      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // Extract the number from dropZoneId
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        // Update the corresponding hidden input field
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      }

      uploadStatus.innerHTML = `<p><i class="bi bi-cloud-check"></i></p>`;
    } else {
      uploadStatus.innerHTML = `<p><i class="bi bi-cloud-slash red-check"></i></p><p class="hidden">${result.data.error}</p>`;
    }

    // Append upload status to the parent of the drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();

    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

function handleDragOver2(event, dropZone) {
  event.preventDefault();
  dropZone.classList.add("drag-over");
}

function handleDragLeave2(event, dropZone) {
  dropZone.classList.remove("drag-over");
}

async function handleDrop2(event, dropZone) {
  event.preventDefault();
  dropZone.classList.remove("drag-over");

  const files = event.dataTransfer.files;
  if (files.length === 0) return;

  const formData = new FormData();
  formData.append("image", files[0]);

  const preloader = document.createElement("div");
  preloader.classList.add("uploadloader");
  dropZone.appendChild(preloader);

  // Remove any existing upload status elements
  const existingUploadStatus =
    dropZone.parentElement.querySelector(".upload-status");
  if (existingUploadStatus) {
    existingUploadStatus.remove();
  }

  const fileselect = `<input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">`;

  const dropZoneId = dropZone.id;
  const count = dropZoneId.split("_").pop(); // Extract the count from the drop zone ID

  try {
    // Upload the image using Cloudinary
    const result = await uploadToCloudinary(file, uploadPreset, cloudName);
    preloader.remove();

    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");

    if (result.success) {
      const imageUrl = result.data?.link; // Retrieve the image URL
      dropZone.innerHTML = `<img src="${imageUrl}" style="height: auto;">${fileselect}`;

      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // Extract the number from dropZoneId
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        // Update the corresponding hidden input field
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      }

      uploadStatus.innerHTML = `<p><i class="bi bi-check-circle-fill blue-check"></i></p>`;
    } else {
      uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
    }

    // Append upload status to the parent of the drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();

    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

document.getElementById("add-more2").addEventListener("click", function () {
  const icon = document.getElementById("add-more-rotate2");
  icon.classList.add("rotate-icon");

  // Remove the class after the animation completes to allow re-adding on next click
  icon.addEventListener("animationend", () => {
    icon.classList.remove("rotate-icon");
  });

  let count = document.querySelectorAll(".input-set").length + 1;
  const inputContainer = document.getElementById("input-container2");

  const newInputSet = document.createElement("div");
  newInputSet.classList.add(
    "flex",
    "center",
    "input-set",
    "mb-3",
    "flex-wrap",
    "mb-30",
    "add-product-cart",
    "product-record",
    "shadow"
  );
  newInputSet.id = `p${count}`;

  newInputSet.innerHTML = `
    <div class="i-div align-items mb-10i">
      <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-expand2 cus-btn">
        <i class="bi bi-arrows-angle-contract"></i>
        <i class="bi bi-arrows-angle-expand none"></i>
      </button>
      <button type="button" style="border: none; margin-left:auto" class="point no-bg-i toggle-delete2 ml-auto cus-btn">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="Quantity2">Qty:</h5>
        <h5 class="none" id="QuantityValue2"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="size2">Size:</h5>
        <h5 class="none" id="sizevalue2"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <label class="circle none mr-3" id="Colorcircle2"></label>
        <h5 class="none color-value" id="colorvalue2"></h5>
      </div>
    </div>
    <div class="product-data" style="max-height: 1300px; opacity: 1; padding: 10px 0px;"  id="product-data2">
      <div class="flex mb-10 minline-140 p5 center align-items gap-10 align-flex-start-SQ">

<div class="input-group flex column">
    <label class="font-sm m510" for="size${count}">Size</label>
    <div class="input-with-buttons column">
        <input id="size${count}" type="text" name="size" placeholder="Size" class="formbold-form-input m-LR-2 max-150 " value="0">
        <div class="flex gap-20 mt-20">
        <button type="button" class="decrement-btn" onclick="decrement('size${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('size${count}')"><i class="bi bi-plus-circle"></i></button>
        <button type="button" class="duplicatePlus-btn" onclick="duplicatePlus2('size${count}')">
            <i class="bi bi-chevron-double-down"></i>
        </button>
        <button type="button" class="duplicatePlus-btn" onclick="duplicateInRange('size${count}')">
            <i class="bi bi-collection"></i>
        </button>
        </div>
    </div>
</div>

<div class="input-group flex column">
    <label class="font-sm m510" for="quantity${count}">Quantity</label>
    <div class="input-with-buttons">
        <input id="quantity${count}" type="text" name="quantity" placeholder="Quantity" class="formbold-form-input m-LR-2 max-200" value="3">
         <div class="flex column gap-10">
        <button type="button" class="decrement-btn" onclick="decrement('quantity${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('quantity${count}')"><i class="bi bi-plus-circle"></i></button>
        </div>
    </div>
</div>
      </div>
      <div class="flex center">
      <button type="button" class="show-img-url" onclick="toggleImageInputs(${count})">Show Images Urls <i class="bi bi-eye-fill"></i></button>
      </div>
      <div class="flex flex-wrap mb-3 imgids" id="image-inputs-${count}">
        <input type="text" id="img1_${count}" name="product-photo2" placeholder="pic url 1" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img2_${count}" name="product-photo2-2" placeholder="pic url 2" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img3_${count}" name="product-photo2-3" placeholder="pic url 3" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img4_${count}" name="product-photo2-4" placeholder="pic url 4" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img5_${count}" name="product-photo2-5" placeholder="pic url 5" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img6_${count}" name="product-photo2-6" placeholder="pic url 6" class="formbold-form-input m-LR-2 mb-10">
      </div>

      <div class="flex flex-wrap center mb-3">
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone1_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus1_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone2_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus2_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone3_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus3_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone4_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus4_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone5_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus5_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone6_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus6_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="adddropzone_${count}"> <div class="flex flex-column"><i class="bi bi-plus"></i>Add More Image</div></div>

        </div>
      </div>
      <div id="imageContainer"></div>
      <div class="flex center mb-3 mt-12">
        <div class="color-input-wrapper m-LR-2">
          <div class="flex center align-items">
            <input id="Colorbg${count}" style="width:45px;" type="text" name="color" class="formbold-form-input">
            <input id="Color${count}" type="color" name="color-value" class="color-picker">
            <input type="file" id="imageInput${count}" accept="image/png, image/jpeg" style="display: none;">
          </div>
          <div class="flex column align-items">
          <div class="change-ctib hidden" id="change-ctib-${count}" title="change color as image"> <i class="bi bi-images"></i></div>
          <div class="rtc-ctib" id="ReturnToColor-ctib-${count}" title="save image as color"style="top: 22px;"><i class="bi bi-arrow-left-right"></i></div>

          </div>
        </div>

        <input id="colorname${count}" type="text" name="color-name" style="width: 150px;" placeholder="Black" class="formbold-form-input m-LR-2">
      </div>
      <input type="file" id="cameraInput1_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput1_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput2_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput2_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput3_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput3_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput4_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput4_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput5_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput5_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput6_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput6_${count}" accept="image/*" style="display: none;">

    </div>
  `;
  // Call the reusable function to set up image upload
  setupImageUpload(newInputSet, count);
  // Set initial state for animation
  newInputSet.style.opacity = "0";
  newInputSet.style.transform = "translateY(-20px)";
  newInputSet.style.transition =
    "opacity 0.4s ease-out, transform 0.4s ease-out";

  inputContainer.appendChild(newInputSet);

  // Call the external function to set up the click handler for rtc-ctib
  setupRtcCtibClickHandler(count);

  // Trigger the transition after appending
  setTimeout(() => {
    newInputSet.style.opacity = "1";
    newInputSet.style.transform = "translateY(0)";
  }, 10);
  // setupToggleExpand(newInputSet.querySelector(".toggle-expand"));
  // setupDeleteButton(newInputSet.querySelector(".toggle-delete"));
  // setupDuplicateButton(newInputSet.querySelector(".toggle-duplicate"));

  setupToggleExpand2(newInputSet.querySelector(".toggle-expand2"));
  setupDeleteButton2(newInputSet.querySelector(".toggle-delete2"));

  setupFileInputHandlers(count);
});

const productPriceInput2 = document.getElementById("productprice-2");
const saleAmountInput2 = document.getElementById("sale-amount-2");
const finalPriceInput2 = document.getElementById("finalprice-2");
const pricePlusCutInput2 = document.getElementById("priceplusthecut2");

// function calculateFinalPrice2() {
//   const productPrice2 = parseFloat(productPriceInput2.value) || 0;
//   const saleAmount2 = parseFloat(saleAmountInput2.value) || 0;

//   // Calculate price with tax (price + matager cut)
//   const priceWithTax = productPrice2 + productPrice2 * matager_percentage;

//   // Display price with tax (before discount) in the hidden field
//   // Round up and remove .00 if whole number
//   const priceWithTaxRounded = Math.ceil(priceWithTax);
//   if (priceWithTaxRounded % 1 === 0) {
//     pricePlusCutInput2.value = priceWithTaxRounded.toString();
//   } else {
//     pricePlusCutInput2.value = priceWithTaxRounded.toFixed(2);
//   }

//   // Apply sale discount if any
//   const discount = priceWithTax * (saleAmount2 / 100);
//   let finalPrice2 = priceWithTax - discount;

//   // Round up to the nearest integer
//   finalPrice2 = Math.ceil(finalPrice2);

//   // Display final price (after discount)
//   if (finalPrice2 % 1 === 0) {
//     finalPriceInput2.value = finalPrice2.toString();
//   } else {
//     finalPriceInput2.value = finalPrice2.toFixed(2);
//   }
// }

function calculateFinalPrice2() {
  const productPrice2 = parseFloat(productPriceInput2.value) || 0;
  const saleAmount2 = parseFloat(saleAmountInput2.value) || 0;

  // Calculate Matager's Cut (1.5% of product price)
  const matagerCut = productPrice2 * 0.015;

  // Calculate price with tax (price + matager cut)
  const priceWithTax = productPrice2 + matagerCut;

  // Display price with tax (before discount)
  const priceWithTaxRounded = Math.ceil(priceWithTax);
  pricePlusCutInput2.value =
    priceWithTaxRounded % 1 === 0
      ? priceWithTaxRounded.toString()
      : priceWithTaxRounded.toFixed(2);

  // Calculate sale-adjusted cut
  const cut =
    saleAmount2 > 0
      ? Math.ceil(matagerCut - matagerCut * (saleAmount2 / 100))
      : Math.ceil(matagerCut);

  // Apply sale discount if any
  const discount = priceWithTax * (saleAmount2 / 100);
  let finalPrice2 = priceWithTax - discount;

  // Round up final price
  finalPrice2 = Math.ceil(finalPrice2);
  finalPriceInput2.value =
    finalPrice2 % 1 === 0 ? finalPrice2.toString() : finalPrice2.toFixed(2);

  return cut; // Return the calculated cut
}

productPriceInput2.addEventListener("input", calculateFinalPrice2);
saleAmountInput2.addEventListener("input", calculateFinalPrice2);

function setupToggleExpand2(button) {
  button.addEventListener("click", function () {
    const expandIcon = button.querySelector(".bi-arrows-angle-expand");
    const contractIcon = button.querySelector(".bi-arrows-angle-contract");
    const inputSet = button.closest(".input-set");
    const productData = inputSet.querySelector("#product-data2");

    // Determine the dynamic ID for the elements inside `product-data`
    const idSuffix = inputSet.id.replace(/^p/, ""); // Extracts the numeric part of the ID

    const sizeInput = productData.querySelector(`#size${idSuffix}`);
    const quantityInput = productData.querySelector(`#quantity${idSuffix}`);
    const colorInput = productData.querySelector(`#Color${idSuffix}`);

    const sizeLabel = inputSet.querySelector("#size2");
    const quantityLabel = inputSet.querySelector("#Quantity2");
    const colorCircleLabel = inputSet.querySelector("#Colorcircle2");
    const sizeValue = inputSet.querySelector("#sizevalue2");
    const colorValue = inputSet.querySelector("#colorvalue2");
    const quantityValue = inputSet.querySelector("#QuantityValue2");

    // Ensure `max-height` is properly initialized if not set
    if (!productData.style.maxHeight) {
      productData.style.maxHeight = "1300px"; // Ensure it starts open
      productData.style.opacity = "1";
      productData.style.padding = "10px 0";
    }

    const isExpanded = productData.style.maxHeight !== "0px";

    if (isExpanded) {
      // Collapse product data
      productData.style.maxHeight = "0px";
      productData.style.opacity = "0";
      productData.style.padding = "0";

      expandIcon.style.display = "inline";
      contractIcon.style.display = "none";

      sizeLabel.classList.remove("none");
      colorCircleLabel.classList.remove("none");
      quantityLabel.classList.remove("none");
      sizeValue.classList.remove("none");
      colorValue.classList.remove("none");
      quantityValue.classList.remove("none");

      // Display the values from the inputs
      if (sizeInput) sizeValue.textContent = sizeInput.value;
      if (quantityInput) quantityValue.textContent = quantityInput.value;
      if (colorInput) {
        colorCircleLabel.style.backgroundColor = colorInput.value;
        colorValue.textContent = colorInput.value;
      }
    } else {
      // Expand product data
      productData.style.maxHeight = "1300px";
      productData.style.opacity = "1";
      productData.style.padding = "10px 0";

      expandIcon.style.display = "none";
      contractIcon.style.display = "inline";

      sizeLabel.classList.add("none");
      colorCircleLabel.classList.add("none");
      quantityLabel.classList.add("none");
      sizeValue.classList.add("none");
      colorValue.classList.add("none");
      quantityValue.classList.add("none");
    }
  });
}

function setupDeleteButton2(button) {
  button.addEventListener("click", function () {
    const element = button.closest(".product-record");
    const inputContainer = document.getElementById("input-container2");

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this size item?",
      icon: "warning",
      toast: true,
      position: "top-end",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      timer: 5000, // Auto close in 5 seconds if no action
    }).then((result) => {
      if (result.isConfirmed) {
        // Apply transition effects
        element.style.transition =
          "border-color 0.3s ease-in, transform 0.6s ease-in-out";
        element.style.transform = "translateX(150%)"; // Swipe right

        // Wait before reducing height
        setTimeout(() => {
          element.style.transition =
            "height 0.4s ease-out, margin 0.4s ease-out";
          element.style.height = "0px";
          element.style.margin = "0px";
          element.style.padding = "0px";
          element.style.overflow = "hidden";
        }, 500);

        // Remove the element after the height animation
        setTimeout(() => {
          element.remove();
          adjustContainerHeight(inputContainer);
        }, 900);

        // Show a success toast
        Swal.fire({
          title: "Deleted!",
          text: "The size item has been removed.",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  });
}
function updateElementIds2(container) {
  const records = container.querySelectorAll(".product-record");
  records.forEach((record, index) => {
    const id = `p${index + 1}`;
    record.id = id;

    record.querySelectorAll("input").forEach((input) => {
      input.id = input.id.replace(/p\d+/, id);
    });

    record.querySelectorAll("img").forEach((img) => {
      img.id = img.id.replace(/p\d+/, id);
    });

    record.querySelectorAll(".drop-zone").forEach((dropZone) => {
      dropZone.id = dropZone.id.replace(/p\d+/, id);
    });
  });
}

async function handleFileChange(event, imgId) {
  const file = event.target.files[0];

  if (file) {
    try {
      // Upload the image to Cloudinary
      const uploadResponse = await uploadToCloudinary(
        file,
        uploadPreset,
        cloudName
      );

      if (uploadResponse.success) {
        const imgUrl = uploadResponse.data.link;

        // Update the image source with the new URL
        document.getElementById(imgId).src = imgUrl;

        // Call the function to update Firebase with the new image URLs
        updateMainProductImages();
      } else {
        console.error("Error uploading image:", uploadResponse.data.error);
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  } else {
    console.error("No file selected for upload");
  }
}

async function updateMainProductImages() {
  const productId = document.getElementById("product-id-input").value.trim();

  // Get the current user
  const user = firebase.auth().currentUser;

  if (!user) {
    Swal.fire({
      title: "Authentication Required!",
      text: "You need to be signed in to update product images.",
      icon: "warning",
      confirmButtonText: "Okay",
      customClass: {
        container: "swal2-custom",
        title: "swal2-custom",
      },
    });
    return;
  }

  if (!productId) {
    Swal.fire({
      icon: "warning",
      text: "Please enter a product ID",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  // Get file inputs
  const fileInput1 = document.getElementById("fileInput1").files[0];
  const fileInput2 = document.getElementById("fileInput2").files[0];
  const fileInput3 = document.getElementById("fileInput3").files[0];
  const fileInput4 = document.getElementById("fileInput4").files[0];
  const fileInput5 = document.getElementById("fileInput5").files[0];
  const fileInput6 = document.getElementById("fileInput6").files[0];

  if (
    !fileInput1 &&
    !fileInput2 &&
    !fileInput3 &&
    !fileInput4 &&
    !fileInput5 &&
    !fileInput6
  ) {
    Swal.fire({
      icon: "warning",
      text: "Please select at least one image to upload",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  try {
    // Get the ID token of the authenticated user
    const idToken = await user.getIdToken();

    const uploadImage = async (file, imgElement) => {
      if (!file) return null; // Return null if no file is provided

      // Create a preloader
      const preloader = document.createElement("div");
      preloader.classList.add("uploadloader");
      imgElement.parentElement.appendChild(preloader); // Add preloader in the image container

      const uploadResult = await uploadToCloudinary(
        file,
        uploadPreset,
        cloudName
      );

      if (!uploadResult.success) throw new Error(uploadResult.data.error);

      // Wait for the image to load before removing the preloader
      const imageUrl = uploadResult.data.link;
      const img = new Image();
      img.src = imageUrl;

      // Remove the preloader once the image is fully loaded
      img.onload = () => {
        preloader.remove(); // Remove preloader when image is loaded
      };

      return imageUrl;
    };

    const imgUrl1 = fileInput1
      ? await uploadImage(fileInput1, document.getElementById("mainimg1"))
      : document.getElementById("mainimg1").src;
    const imgUrl2 = fileInput2
      ? await uploadImage(fileInput2, document.getElementById("mainimg2"))
      : document.getElementById("mainimg2").src;
    const imgUrl3 = fileInput3
      ? await uploadImage(fileInput3, document.getElementById("mainimg3"))
      : document.getElementById("mainimg3").src;
    const imgUrl4 = fileInput4
      ? await uploadImage(fileInput4, document.getElementById("mainimg4"))
      : document.getElementById("mainimg4").src;
    const imgUrl5 = fileInput5
      ? await uploadImage(fileInput5, document.getElementById("mainimg5"))
      : document.getElementById("mainimg5").src;
    const imgUrl6 = fileInput6
      ? await uploadImage(fileInput6, document.getElementById("mainimg6"))
      : document.getElementById("mainimg6").src;

    // Prepare data for Firebase
    const productData = {
      "product-photo": imgUrl1,
      "product-photo2": imgUrl2,
      "product-photo3": imgUrl3,
      "product-photo4": imgUrl4,
      "product-photo5": imgUrl5,
      "product-photo6": imgUrl6,
    };

    // Update Firebase with the ID token
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product images");
    }

    Swal.fire({
      icon: "success",
      title: "Images Updated",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Reset the file inputs
      document.getElementById("fileInput1").value = "";
      document.getElementById("fileInput2").value = "";
      document.getElementById("fileInput3").value = "";
      document.getElementById("fileInput4").value = "";
      document.getElementById("fileInput5").value = "";
      document.getElementById("fileInput6").value = "";
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed to Update Images",
      text: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

const fetchProductAndSizeChart = async () => {
  try {
    // Fetch size chart data
    const sizeChartResponse = await fetch(
      `${url}/Stores/${uid}/sizecharts.json`
    );
    const sizeChartData = await sizeChartResponse.json();
    // Get the select element
    const selectElement = document.getElementById("size-chart-2");

    // Clear existing options except the first one
    selectElement.innerHTML = `<option value="" disabled selected>Size Charts</option>`;

    // Check if size charts exist
    if (sizeChartData) {
      Object.entries(sizeChartData).forEach(([id, chart]) => {
        const option = document.createElement("option");
        option.value = chart.sizeChartUrl;
        option.setAttribute("data-id", id);
        option.textContent = chart.chartName;
        selectElement.appendChild(option);
      });
    }

    // Add event listener to handle selection
    selectElement.addEventListener("click", function () {
      const selectedOption = this.options[this.selectedIndex];

      // Remove 'selected' attribute from all options
      Array.from(this.options).forEach((opt) => {
        opt.removeAttribute("selected");
      });

      // Set 'selected' attribute to the clicked option
      selectedOption.setAttribute("selected", "selected");
    });
  } catch (error) {
    console.error("Error fetching size charts:", error);
  }
};

function duplicatePlus2(sizeInputId) {
  const sizeInput = document.getElementById(sizeInputId);
  const sizeValue = sizeInput.value.trim();

  if (isNaN(sizeValue)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Size",
      text: "Size must be a number to use this feature.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return;
  }

  const productRecord = sizeInput.closest(".product-record");
  if (!productRecord) return;

  const newProductRecord = productRecord.cloneNode(true);
  const currentCount = document.querySelectorAll(".product-record").length + 1;

  // First update the main record ID
  newProductRecord.id = `p${currentCount}`;

  // Update all element IDs in the new record
  updateElementIds2(newProductRecord);

  // Get the new size input and increment its value
  const newSizeInput = newProductRecord.querySelector(`input[name="size"]`);
  if (newSizeInput) {
    const newSizeValue = parseInt(newSizeInput.value, 10) + 1;
    newSizeInput.value = newSizeValue;
    newSizeInput.id = `size${currentCount}`;

    // Update the size input's label
    const sizeLabel = newProductRecord.querySelector(`label[for^="size"]`);
    if (sizeLabel) {
      sizeLabel.setAttribute("for", `size${currentCount}`);
    }

    // Update all buttons that reference this size input
    const buttons = newProductRecord.querySelectorAll(
      `button[onclick*="${sizeInput.id}"]`
    );
    buttons.forEach((button) => {
      button.setAttribute(
        "onclick",
        button
          .getAttribute("onclick")
          .replace(sizeInput.id, `size${currentCount}`)
      );
    });
  }

  // Update quantity input and its label
  const newQuantityInput = newProductRecord.querySelector(
    `input[name="quantity"]`
  );
  if (newQuantityInput) {
    newQuantityInput.id = `quantity${currentCount}`;
    const quantityLabel = newProductRecord.querySelector(
      `label[for^="quantity"]`
    );
    if (quantityLabel) {
      quantityLabel.setAttribute("for", `quantity${currentCount}`);
    }

    // Update quantity buttons
    const qtyButtons = newProductRecord.querySelectorAll(
      `button[onclick*="quantity"]`
    );
    qtyButtons.forEach((button) => {
      button.setAttribute(
        "onclick",
        button
          .getAttribute("onclick")
          .replace(/quantity\d+/, `quantity${currentCount}`)
      );
    });
  }

  // Update image inputs
  const imageInputs = newProductRecord.querySelectorAll('input[id^="img"]');
  imageInputs.forEach((input, index) => {
    input.id = `img${index + 1}_${currentCount}`;
  });

  // Update drop zones
  const dropZones = newProductRecord.querySelectorAll(".drop-zone");
  dropZones.forEach((zone, index) => {
    if (zone.id.includes("adddropzone")) {
      zone.id = `adddropzone_${currentCount}`;
    } else {
      zone.id = `dropZone${index + 1}_${currentCount}`;
    }
    // Rebind drag/drop events
    zone.setAttribute("ondrop", `handleDrop(event, this)`);
    zone.setAttribute("ondragover", `handleDragOver(event, this)`);
    zone.setAttribute("ondragleave", `handleDragLeave(event, this)`);
  });

  // Update upload status elements
  const uploadStatuses = newProductRecord.querySelectorAll(
    '[id^="uploadStatus"]'
  );
  uploadStatuses.forEach((status, index) => {
    status.id = `uploadStatus${index + 1}_${currentCount}`;
  });

  // SPECIAL HANDLING FOR COLOR ELEMENTS - ALWAYS USE ID "2"
  const colorElements = [
    { selector: 'input[id^="Colorbg"]', newId: "Colorbg2" },
    { selector: 'input[id^="Color"]', newId: "Color2" },
    { selector: 'input[id^="colorname"]', newId: "colorname2" },
    { selector: 'input[id^="imageInput"]', newId: "imageInput2" },
    { selector: '[id^="change-ctib"]', newId: "change-ctib-2" },
    { selector: '[id^="ReturnToColor-ctib"]', newId: "ReturnToColor-ctib-2" },
    { selector: '[id^="Colorcircle"]', newId: "Colorcircle2" },
    { selector: '[id^="colorvalue"]', newId: "colorvalue2" },
  ];

  colorElements.forEach(({ selector, newId }) => {
    const element = newProductRecord.querySelector(selector);
    if (element) {
      element.id = newId;
    }
  });

  // Update file inputs (camera and gallery)
  const fileInputs = newProductRecord.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input, index) => {
    const isCamera = input.id.includes("cameraInput");
    const num = Math.ceil((index + 1) / 2);
    input.id = isCamera
      ? `cameraInput${num}_${currentCount}`
      : `galleryInput${num}_${currentCount}`;
  });

  // Update the show-img-url button
  const showImgBtn = newProductRecord.querySelector(".show-img-url");
  if (showImgBtn) {
    showImgBtn.setAttribute("onclick", `toggleImageInputs(${currentCount})`);
  }

  // Update the image inputs container
  const imgInputsContainer = newProductRecord.querySelector(".imgids");
  if (imgInputsContainer) {
    imgInputsContainer.id = `image-inputs-${currentCount}`;
  }

  // Remove the duplicate button from the original record
  const originalDuplicateBtn =
    productRecord.querySelector(".duplicatePlus-btn");
  if (originalDuplicateBtn) {
    originalDuplicateBtn.remove();
  }

  // Animation setup
  newProductRecord.style.opacity = "0";
  newProductRecord.style.transform = "translateY(-20px)";
  newProductRecord.style.transition =
    "opacity 0.4s ease-out, transform 0.4s ease-out";

  // Append to container
  const inputContainer = document.getElementById("input-container2");
  inputContainer.appendChild(newProductRecord);

  // Trigger animation
  setTimeout(() => {
    newProductRecord.style.opacity = "1";
    newProductRecord.style.transform = "translateY(0)";
  }, 10);

  // Scroll to view
  newProductRecord.scrollIntoView({ behavior: "smooth", block: "start" });

  // Reinitialize event handlers
  setupToggleExpand2(newProductRecord.querySelector(".toggle-expand2"));
  setupDeleteButton2(newProductRecord.querySelector(".toggle-delete2"));

  // Setup other handlers after a slight delay
  setTimeout(() => {
    setupRtcCtibClickHandler(2); // Use static ID 2 for color handlers
    setupFileInputHandlers(currentCount);

    // Reinitialize color picker functionality with static ID 2
    const colorPicker = newProductRecord.querySelector("#Color2");
    const colorBg = newProductRecord.querySelector("#Colorbg2");
    const colorCircle = newProductRecord.querySelector("#Colorcircle2");
    const colorValue = newProductRecord.querySelector("#colorvalue2");

    if (colorPicker && colorBg) {
      colorPicker.addEventListener("input", function () {
        colorBg.value = this.value;
        if (colorCircle) colorCircle.style.backgroundColor = this.value;
        if (colorValue) colorValue.textContent = this.value;
      });

      // Initialize with current color if it exists
      if (colorPicker.value) {
        colorBg.value = colorPicker.value;
        if (colorCircle) colorCircle.style.backgroundColor = colorPicker.value;
        if (colorValue) colorValue.textContent = colorPicker.value;
      }
    }
  }, 50);
}

function renderaddsizeflowbtn() {
  // Get the container element
  const container = document.getElementById("scroll-btn-container");

  // Create the new button element
  const addFlowBtn = document.createElement("button");
  addFlowBtn.id = "addFlowBtn";
  addFlowBtn.className = "add-flowed-btn show";
  addFlowBtn.title = "Add Flow";
  addFlowBtn.innerHTML = '<i class="bi bi-plus"></i>';

  // Insert the new button between the existing ones
  if (container && container.children.length >= 2) {
    container.insertBefore(addFlowBtn, container.children[1]);
  } else if (container) {
    container.appendChild(addFlowBtn);
  }

  // Add click event listener that replicates the add-more2 functionality
  addFlowBtn.addEventListener("click", function () {
    // Reuse the exact same code from the add-more2 event listener
    const icon = document.getElementById("add-more-rotate2");
    if (icon) {
      icon.classList.add("rotate-icon");
      icon.addEventListener("animationend", () => {
        icon.classList.remove("rotate-icon");
      });
    }

    let count = document.querySelectorAll(".input-set").length + 1;
    const inputContainer = document.getElementById("input-container2");

    const newInputSet = document.createElement("div");
    newInputSet.classList.add(
      "flex",
      "center",
      "input-set",
      "mb-3",
      "flex-wrap",
      "mb-30",
      "add-product-cart",
      "product-record",
      "shadow"
    );
    newInputSet.id = `p${count}`;

    newInputSet.innerHTML = `
    <div class="i-div align-items mb-10i">
      <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-expand2 cus-btn">
        <i class="bi bi-arrows-angle-contract"></i>
        <i class="bi bi-arrows-angle-expand none"></i>
      </button>
      <button type="button" style="border: none; margin-left:auto" class="point no-bg-i toggle-delete2 ml-auto cus-btn">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="Quantity2">Qty:</h5>
        <h5 class="none" id="QuantityValue2"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="size2">Size:</h5>
        <h5 class="none" id="sizevalue2"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <label class="circle none mr-3" id="Colorcircle2"></label>
        <h5 class="none color-value" id="colorvalue2"></h5>
      </div>
    </div>
    <div class="product-data" style="max-height: 1300px; opacity: 1; padding: 10px 0px;"  id="product-data2">
      <div class="flex mb-10 minline-140 p5 center align-items gap-10 align-flex-start-SQ">

<div class="input-group flex column">
    <label class="font-sm m510" for="size${count}">Size</label>
    <div class="input-with-buttons column">
        <input id="size${count}" type="text" name="size" placeholder="Size" class="formbold-form-input m-LR-2 max-150 " value="0">
        <div class="flex gap-20 mt-20">
        <button type="button" class="decrement-btn" onclick="decrement('size${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('size${count}')"><i class="bi bi-plus-circle"></i></button>
        <button type="button" class="duplicatePlus-btn" onclick="duplicatePlus2('size${count}')">
            <i class="bi bi-chevron-double-down"></i>
        </button>
        <button type="button" class="duplicatePlus-btn" onclick="duplicateInRange('size${count}')">
            <i class="bi bi-collection"></i>
        </button>
        </div>
    </div>
</div>

<div class="input-group flex column">
    <label class="font-sm m510" for="quantity${count}">Quantity</label>
    <div class="input-with-buttons">
        <input id="quantity${count}" type="text" name="quantity" placeholder="Quantity" class="formbold-form-input m-LR-2 max-200" value="3">
         <div class="flex column gap-10">
        <button type="button" class="decrement-btn" onclick="decrement('quantity${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('quantity${count}')"><i class="bi bi-plus-circle"></i></button>
        </div>
    </div>
</div>
      </div>
      <div class="flex center">
      <button type="button" class="show-img-url" onclick="toggleImageInputs(${count})">Show Images Urls <i class="bi bi-eye-fill"></i></button>
      </div>
      <div class="flex flex-wrap mb-3 imgids" id="image-inputs-${count}">
        <input type="text" id="img1_${count}" name="product-photo" placeholder="pic url 1" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img2_${count}" name="product-photo2" placeholder="pic url 2" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img3_${count}" name="product-photo3" placeholder="pic url 3" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img4_${count}" name="product-photo4" placeholder="pic url 4" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img5_${count}" name="product-photo5" placeholder="pic url 5" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img6_${count}" name="product-photo6" placeholder="pic url 6" class="formbold-form-input m-LR-2 mb-10">
      </div>

      <div class="flex flex-wrap center mb-3">
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone1_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus1_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone2_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus2_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone3_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus3_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone4_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus4_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone5_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus5_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone6_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus6_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="adddropzone_${count}"> <div class="flex flex-column"><i class="bi bi-plus"></i>Add More Image</div></div>

        </div>
      </div>
      <div id="imageContainer"></div>
      <div class="flex center mb-3 mt-12">
        <div class="color-input-wrapper m-LR-2">
          <div class="flex center align-items">
            <input id="Colorbg${count}" style="width:45px;" type="text" name="color" class="formbold-form-input">
            <input id="Color${count}" type="color" name="color-value" class="color-picker">
            <input type="file" id="imageInput${count}" accept="image/png, image/jpeg" style="display: none;">
          </div>
          <div class="flex column align-items">
          <div class="change-ctib hidden" id="change-ctib-${count}" title="change color as image"> <i class="bi bi-images"></i></div>
          <div class="rtc-ctib" id="ReturnToColor-ctib-${count}" title="save image as color"style="top: 22px;"><i class="bi bi-arrow-left-right"></i></div>

          </div>
        </div>

        <input id="colorname${count}" type="text" name="color-name" style="width: 150px;" placeholder="Black" class="formbold-form-input m-LR-2">
      </div>
      <input type="file" id="cameraInput1_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput1_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput2_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput2_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput3_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput3_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput4_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput4_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput5_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput5_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput6_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput6_${count}" accept="image/*" style="display: none;">

    </div>`;

    // Call the reusable function to set up image upload
    // setupImageUpload(newInputSet, count);
    // Set initial state for animation
    newInputSet.style.opacity = "0";
    newInputSet.style.transform = "translateY(-20px)";
    newInputSet.style.transition =
      "opacity 0.4s ease-out, transform 0.4s ease-out";

    inputContainer.appendChild(newInputSet);

    // Call the external function to set up the click handler for rtc-ctib
    setupRtcCtibClickHandler(count);

    // Trigger the transition after appending
    setTimeout(() => {
      newInputSet.style.opacity = "1";
      newInputSet.style.transform = "translateY(0)";
    }, 10);

    setupToggleExpand2(newInputSet.querySelector(".toggle-expand2"));
    setupDeleteButton2(newInputSet.querySelector(".toggle-delete2"));
    setupFileInputHandlers(count);
  });
}
