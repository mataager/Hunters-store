async function submitOrder() {
  try {
    // Ensure the user is signed in and fetch their token
    const user = firebase.auth().currentUser;
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const body = document.body;
    if (!user) {
      // Set the modal content for non-authenticated users
      modalContent.innerHTML = `
      <div class="guestmodalarea">
        <h2>Sign in for better experience</h2>
        <p class="mt-30">You can sign in to save your details,track your order,add items to favourite etc.</p>
        <div class="modal-buttons">
          <button id="goToAccount" class="modal-btn Gotoaccountbtn">Go to Account</button>
        </div>
        <h2 class="mt-40">OR</h2>
        <p>Continue as guest for quick and easy checkout</p>
        <div class="modal-buttons">
          <button id="continueGuest" class="modal-btn continueasguest">Continue as Guest</button>
        </div>
      </div>
      `;

      // Show the modal and disable background interactions
      body.classList.add("modal-open");
      modal.classList.add("show");

      // Add event listeners to the buttons
      document.getElementById("goToAccount").addEventListener("click", () => {
        window.location.href = "./account.html";
        closeModal();
      });

      document.getElementById("continueGuest").addEventListener("click", () => {
        sessionStorage.setItem("isGuest", "true");
        removeaddressarea();
        prepareguestbtn();
        closeModal();
      });

      // Close modal when clicking outside content (optional)
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
      function closeModal() {
        modal.classList.remove("show");
        body.classList.remove("modal-open");
      }
    } else {
      // Show the preloader
      document.getElementById("preloader").classList.remove("hidden");
      const idToken = await user.getIdToken();
      const Customeruid = user.uid; // Fetch the UID of the logged-in user
      // Get the cart from local storage
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart || cart.length === 0) {
        document.getElementById("preloader").classList.add("hidden");
        Swal.fire({
          icon: "warning",
          title: "Your cart is empty",
          text: "Please add items to your cart before placing an order.",
        });
        return;
      }

      const cartTotalElement = document.getElementById("cart-total");
      let cartTotal = 0;

      if (cartTotalElement) {
        const cartTotalText = cartTotalElement.innerText.match(/\d+/)
          ? cartTotalElement.innerText.match(/\d+/)[0]
          : "0";
        cartTotal = parseInt(cartTotalText, 10);
      }

      const unavailableItems = [];
      const updatedCart = [];

      for (const item of cart) {
        // Fetch the product data from Firebase
        const productResponse = await fetch(
          `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`
        );
        const productData = await productResponse.json();

        if (!productData) {
          unavailableItems.push({
            title: item.title,
            photourl: item.photourl,
            reason: "Product no longer exists in the store.",
          });
          continue;
        }
        // if (vanishedstock) {
        //   const stockQty =
        //     productData.sizes[item.productSize]?.[item.productColor]?.qty || 0;

        //   if (stockQty < item.quantity) {
        //     unavailableItems.push({
        //       title: item.title,
        //       photourl: item.photourl,
        //       reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
        //     });
        //     continue;
        //   }

        //   // Update the stock in Firebase
        //   const newStockQty = stockQty - item.quantity;

        //   if (newStockQty > 0) {
        //     await fetch(
        //       `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
        //       {
        //         method: "PATCH",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ qty: newStockQty }),
        //       }
        //     );
        //   } else {
        //     // Delete the size/color if stock is depleted
        //     await fetch(
        //       `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`,
        //       {
        //         method: "DELETE",
        //       }
        //     );
        //   }
        // }

        if (vanishedstock) {
          const stockQty =
            productData.sizes[item.productSize]?.[item.productColor]?.qty || 0;

          if (stockQty < item.quantity) {
            unavailableItems.push({
              title: item.title,
              photourl: item.photourl,
              reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
            });
            continue;
          }

          // Update the stock in Firebase
          const newStockQty = stockQty - item.quantity;

          if (newStockQty > 0) {
            await fetch(
              `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ qty: newStockQty }),
              }
            );
          } else {
            // Delete the size/color if stock is depleted and vanishedstock is true
            await fetch(
              `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`,
              {
                method: "DELETE",
              }
            );
          }
        }

        if (outofstock && !vanishedstock) {
          const stockQty =
            productData.sizes[item.productSize]?.[item.productColor]?.qty || 0;

          if (stockQty < item.quantity) {
            unavailableItems.push({
              title: item.title,
              photourl: item.photourl,
              reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
            });
            continue;
          }

          // Update the stock in Firebase
          const newStockQty = stockQty - item.quantity;

          // For outofstock, we always set the quantity (either reduced or 0 if depleted)
          await fetch(
            `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                qty: newStockQty > 0 ? newStockQty : 0,
              }),
            }
          );
        }

        updatedCart.push(item);
      }

      if (unavailableItems.length > 0) {
        document.getElementById("preloader").classList.add("hidden");

        const unavailableList = unavailableItems
          .map(
            (item) =>
              `<li>
              <img src="${item.photourl}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
              <strong>${item.title}</strong> - ${item.reason}
            </li>`
          )
          .join("");

        Swal.fire({
          icon: "warning",
          title: "Some items are unavailable",
          html: `<ul>${unavailableList}</ul>`,
        }).then(() => {
          location.reload();
        });

        return;
      }

      // Get personal information and shipping fees
      const personalInfo = await getPersonalInfo(Customeruid, idToken);
      const shippingFees =
        parseFloat(localStorage.getItem("shippingFees")) || 0;
      const matagerCut = parseFloat(localStorage.getItem("cut")) || 0;
      const payment = localStorage.getItem("Payment") || "N/A";

      // Construct a preliminary order object
      const preliminaryOrder = {
        cart: updatedCart,
        personal_info: personalInfo,
        shippingFees,
        payment,
      };

      // Add order to customer history and get the order UID
      const orderUID = await addOrderToCustomerHistory(
        Customeruid,
        idToken,
        preliminaryOrder
      );

      // Construct the final order object
      const order = {
        ...preliminaryOrder, // Spread the preliminary order properties
        Customeruid: Customeruid,
        orderUID: orderUID, // Add the order UID
        Date: formattedDate,
      };

      // Submit the order to Firebase
      const orderResponse = await fetch(
        `${url}/Stores/${uid}/orders.json?auth=${idToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to submit order");
      }

      // Clear the cart
      localStorage.removeItem("cart");
      document.getElementById("preloader").classList.add("hidden");

      Swal.fire({
        icon: "success",
        title: "Order submitted successfully!",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.href = "./index.html";
      });
    }
  } catch (error) {
    console.error("Error during order submission:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while processing your order. Please try again.",
    });
  }
}

async function guestSubmitorder() {
  try {
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const body = document.body;

    // Check if cart exists and has items
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Your cart is empty",
        text: "Please add items to your cart before placing an order.",
      });
      return;
    }

    // Show guest checkout form modal
    modalContent.innerHTML = `
      <div class="guestmodalarea">
        <button type="button" id="cancelGuestOrder">
          <i class="bi bi-x-lg"></i>
        </button>
        <h2>Guest Checkout</h2>
        <form class="mt-10" id="guestCheckoutForm">
          <div class="form-group">
            <input type="text" id="guest-name" class="form-input" placeholder="Full Name" required>
          </div>
          <div class="form-group">
            <input type="tel" id="guest-phone1" class="form-input" placeholder="Phone Number (required)" required>
          </div>
          <div class="form-group">
            <input type="tel" id="guest-phone2" class="form-input" placeholder="Alternative Phone (optional)">
          </div>
          <div class="form-group">
  <select id="Gityandgovernment" class="form-input bg-white" required>
    <option value="" disabled selected>Select your Government</option>
    <option value="Cairo">Cairo</option>
    <option value="Giza">Giza</option>
    <option value="Alexandria">Alexandria</option>
    <option value="Port Said">Port Said</option>
    <option value="Suez">Suez</option>
    <option value="Damietta">Damietta</option>
    <option value="Fayoum">Fayoum</option>
    <option value="Dakahlia">Dakahlia</option>
    <option value="Sharqia">Sharqia</option>
    <option value="Qalyubia">Qalyubia</option>
    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
    <option value="Gharbia">Gharbia</option>
    <option value="Monufia">Monufia</option>
    <option value="Beheira">Beheira</option>
    <option value="Ismailia">Ismailia</option>
    <option value="Other">Other</option>
  </select>
</div>
          <div class="form-group">
            <textarea id="guest-address" class="form-textarea" placeholder="Full Address" required></textarea>
          </div>
          <div class="form-group flex center">
           <div class="Addnotesbtn" id="Addnotesbtn" onclick="handleNotesToggle()">Add Notes <i class="bi bi-journal-plus"></i></div>
           </div>
           <div class="form-group hidden" id="orderNotes">
            <textarea id="guest-notes" class="form-textarea mt-10" placeholder="Order Notes (optional)"></textarea>
          </div>
          <div id="shippingFeesDisplaychecout"></div>
          <div class="modal-buttons">
            <button type="submit" id="submitGuestOrder" class="modal-btn suborderasguest">
              <span id="submitButtonText">Place Order</span>
              <div class="preloader hidden" id="preloader">
                <div class="loader"></div>
              </div>
            </button>
          </div>
        </form>
      </div>
    `;
    renderShippingFeesDisplay();
    // Show the modal
    body.classList.add("modal-open");
    modal.classList.add("show");

    // Handle form submission
    document
      .getElementById("guestCheckoutForm")
      .addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitButton = document.getElementById("submitGuestOrder");
        const submitText = document.getElementById("submitButtonText");
        const preloader = document.getElementById("preloader");

        // Get form values
        const name = document.getElementById("guest-name").value;
        const phone1 = document.getElementById("guest-phone1").value;
        const phone2 = document.getElementById("guest-phone2").value;
        const city = document.getElementById("Gityandgovernment").value;
        const address = document.getElementById("guest-address").value;
        const notes = document.getElementById("guest-notes").value;

        // Validate required fields
        if (!name || !phone1 || !address || !city) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill out all required fields: Name, Phone, City and Address.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
          });
          return;
        }

        // Show loading state
        submitText.classList.add("hidden");
        preloader.classList.remove("hidden");
        submitButton.disabled = true;

        try {
          // Sign in guest user
          const userCredential = await firebase
            .auth()
            .signInWithEmailAndPassword(GuestEmail, GuestEmail);
          const idToken = await userCredential.user.getIdToken();

          // Process cart items (similar to submitOrder)
          const unavailableItems = [];
          const updatedCart = [];
          let cartTotal = 0;

          for (const item of cart) {
            // Fetch product data from Firebase
            const productResponse = await fetch(
              `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`
            );
            const productData = await productResponse.json();

            if (!productData) {
              unavailableItems.push({
                title: item.title,
                photourl: item.photourl,
                reason: "Product no longer exists in the store.",
              });
              continue;
            }
            // if (vanishedstock) {
            //   const stockQty =
            //     productData.sizes[item.productSize]?.[item.productColor]?.qty ||
            //     0;

            //   if (stockQty < item.quantity) {
            //     unavailableItems.push({
            //       title: item.title,
            //       photourl: item.photourl,
            //       reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
            //     });
            //     continue;
            //   }

            //   // Update stock in Firebase
            //   const newStockQty = stockQty - item.quantity;

            //   if (newStockQty > 0) {
            //     await fetch(
            //       `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
            //       {
            //         method: "PATCH",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ qty: newStockQty }),
            //       }
            //     );
            //   } else {
            //     // Delete the size/color if stock is depleted
            //     await fetch(
            //       `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
            //       {
            //         method: "DELETE",
            //       }
            //     );
            //   }
            // }

            if (vanishedstock) {
              const stockQty =
                productData.sizes[item.productSize]?.[item.productColor]?.qty ||
                0;

              if (stockQty < item.quantity) {
                unavailableItems.push({
                  title: item.title,
                  photourl: item.photourl,
                  reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
                });
                continue;
              }

              // Update the stock in Firebase
              const newStockQty = stockQty - item.quantity;

              if (newStockQty > 0) {
                await fetch(
                  `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
                  {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ qty: newStockQty }),
                  }
                );
              } else {
                // Delete the size/color if stock is depleted and vanishedstock is true
                await fetch(
                  `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`,
                  {
                    method: "DELETE",
                  }
                );
              }
            }

            if (outofstock && !vanishedstock) {
              const stockQty =
                productData.sizes[item.productSize]?.[item.productColor]?.qty ||
                0;

              if (stockQty < item.quantity) {
                unavailableItems.push({
                  title: item.title,
                  photourl: item.photourl,
                  reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
                });
                continue;
              }

              // Update the stock in Firebase
              const newStockQty = stockQty - item.quantity;

              // For outofstock, we always set the quantity (either reduced or 0 if depleted)
              await fetch(
                `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
                {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    qty: newStockQty > 0 ? newStockQty : 0,
                  }),
                }
              );
            }
            updatedCart.push(item);
            cartTotal += (parseFloat(item.price) || 0) * item.quantity;
          }

          if (unavailableItems.length > 0) {
            const unavailableList = unavailableItems
              .map(
                (item) =>
                  `<li>
                <img src="${item.photourl}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
                <strong>${item.title}</strong> - ${item.reason}
              </li>`
              )
              .join("");

            Swal.fire({
              icon: "warning",
              title: "Some items are unavailable",
              html: `<ul>${unavailableList}</ul>`,
            }).then(() => {
              location.reload();
            });

            return;
          }

          const shippingFeeElement = document.getElementById(
            "shipping-fees-guest"
          );
          const shippingFee = shippingFeeElement
            ? parseInt(shippingFeeElement.dataset.fee) || 0
            : 0;
          // Get shipping fees (you might want to calculate this differently for guests)

          const payment = localStorage.getItem("Payment") || "N/A";

          // Prepare order data
          const order = {
            Customeruid: "Guest User",
            Date: new Date().toISOString(),
            cart: updatedCart,
            payment: payment,
            personal_info: {
              address: address,
              name: name,
              email: "Guest",
              phone: phone1,
              phone2: phone2 || "N/A",
              city: city,
              notes: notes || "N/A",
            },
            shippingFees: shippingFee,
            isGuest: true,
          };

          // Submit order to Firebase
          const orderResponse = await fetch(
            `${url}/Stores/${uid}/orders.json?auth=${idToken}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(order),
            }
          );

          if (!orderResponse.ok) {
            throw new Error("Failed to submit order");
          }

          // Clear the cart
          localStorage.removeItem("cart");
          closeModal();

          Swal.fire({
            icon: "success",
            title: "Order submitted successfully!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.href = "./index.html";
          });
        } catch (error) {
          console.error("Error during guest order submission:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while processing your order. Please try again.",
          });
        } finally {
          // Reset button state
          submitText.classList.remove("hidden");
          preloader.classList.add("hidden");
          submitButton.disabled = false;

          // Log out guest user
          try {
            await firebase.auth().signOut();
          } catch (error) {
            console.error("Error signing out guest user:", error);
          }
        }
      });

    // Handle cancel button
    document
      .getElementById("cancelGuestOrder")
      .addEventListener("click", () => {
        closeModal();
      });

    // Close modal when clicking outside content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    function closeModal() {
      modal.classList.remove("show");
      body.classList.remove("modal-open");
    }
  } catch (error) {
    console.error("Error in guestSubmitorder:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while starting the checkout process. Please try again.",
    });
  }
}

async function getPersonalInfo(Customeruid, idToken) {
  try {
    // Fetch personal info from Firebase
    const response = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/users/${Customeruid}/personalInfo.json?auth=${idToken}`
    );
    const data = await response.json();

    if (!data) {
      throw new Error("Failed to fetch personal information.");
    }

    // Extract personal info key and details
    const personalInfoKey = Object.keys(data)[0];
    const personalInfo = data[personalInfoKey];
    const userid = Customeruid;
    const name = `${personalInfo.firstName} ${personalInfo.lastName}`;
    const { email, phone, phone2 } = personalInfo;

    // Retrieve address, city, and shipping fees from local storage
    const address = localStorage.getItem("Address") || "N/A";
    const city = localStorage.getItem("City") || "N/A";
    const shippingFees = parseFloat(localStorage.getItem("shippingFees")) || 0;

    // Combine all information into a single object
    return {
      userid,
      name,
      email,
      phone,
      phone2,
      address,
      city,
      shippingFees,
    };
  } catch (error) {
    console.error("Error fetching personal information:", error);
    throw error;
  }
}

async function addOrderToCustomerHistory(Customeruid, idToken, order) {
  try {
    // Use `push()` to generate a random unique key automatically
    const saveResponse = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/users/${Customeruid}/orderHistory/${uid}.json?auth=${idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          order: order.cart.map((item) => ({
            id: item.id,
            brand: item.brand,
            title: item.title,
            photo: item.photourl,
            price: item.price,
            qty: item.quantity,
            size: item.productSize,
            color: item.productColor,
          })),
          progress: "Pending", // Add progress with a default value of "Pending"
          payment: order.payment,
          Date: formattedDate,
        }),
      }
    );

    if (!saveResponse.ok) throw new Error("Order history couldn't save");

    // Retrieve the unique key from the Firebase response
    const saveData = await saveResponse.json();
    const orderUID = saveData.name; // Firebase's generated key

    return orderUID; // Return the UID if needed elsewhere
  } catch (error) {
    console.error("Error updating order history:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
function handleNotesToggle() {
  const Addnotesbtn = document.getElementById("Addnotesbtn");
  const orderNotesTextArea = document.getElementById("orderNotes");
  if (orderNotesTextArea.classList.contains("hidden")) {
    // Show notes
    orderNotesTextArea.classList.remove("hidden");

    // Force reflow to enable transition
    void orderNotesTextArea.offsetHeight;

    // Add show class to trigger transition
    orderNotesTextArea.classList.add("show");

    // Update button
    Addnotesbtn.innerHTML = 'Hide Notes <i class="bi bi-journal-minus"></i>';

    // Focus textarea
    setTimeout(() => {
      const textarea = orderNotesTextArea.querySelector("textarea");
      if (textarea) textarea.focus();
    }, 100);
  } else {
    // Start hiding process
    orderNotesTextArea.classList.remove("show");

    // After transition completes
    setTimeout(() => {
      orderNotesTextArea.classList.add("hidden");
    }, 300);

    // Update button immediately
    Addnotesbtn.innerHTML = 'Add Notes <i class="bi bi-journal-plus"></i>';
  }
}
function renderShippingFeesDisplay() {
  const container = document.getElementById("shippingFeesDisplaychecout");
  const cartTotalElement = document.getElementById("cart-total");
  const citySelect = document.getElementById("Gityandgovernment");

  if (!container) {
    console.error("Shipping fees container not found");
    return;
  }

  // Get cart total value (remove " EGP" and convert to number)
  let cartTotal = 0;
  if (cartTotalElement) {
    cartTotal =
      parseFloat(cartTotalElement.textContent.replace(" EGP", "")) || 0;
  }

  // Check if cart qualifies for free shipping
  const qualifiesForFreeShipping = cartTotal >= parseFloat(freeshipping);

  // Create shipping display HTML
  let shippingHtml = "";
  if (qualifiesForFreeShipping) {
    shippingHtml = `
      <p id="shippingText" class="BuyItNowForm-shipping-message">
        <span class="BuyItNowForm-shipping-message">You've got free shipping!</span> 
        (Order amount exceeds ${freeshipping} EGP)
      </p>
      <p id="shipping-fees-guest" data-fee="0" style="display: none;">free</p>
    `;
  } else {
    // Default message before city is selected
    shippingHtml = `
      <p id="shippingText" class="BuyItNowForm-shipping-message">
        Please select your government to calculate shipping fees
      </p>
      <p id="shipping-fees-guest" data-fee="0" style="display: none;"></p>
    `;
  }

  container.innerHTML = `
    <div class="shippingFeesDisplay">
      ${shippingHtml}
    </div>
  `;

  // Add event listener if city select exists
  if (citySelect) {
    citySelect.addEventListener("change", updateShippingFeesguestcheckout);
  }

  // Function to update shipping fees based on selected city
  // function updateShippingFeesguestcheckout() {
  //   const selectedCity = citySelect.value;
  //   const shippingText = document.getElementById("shippingText");
  //   const shippingFeeValue = document.getElementById("shipping-fees");

  //   if (!selectedCity || qualifiesForFreeShipping) return;

  //   let shippingFee = maincities.includes(selectedCity)
  //     ? minshipping
  //     : maxshipping;

  //   shippingText.textContent = `Shipping fees: ${shippingFee} EGP`;
  //   shippingFeeValue.dataset.fee = shippingFee;
  //   shippingFeeValue.textContent = `${shippingFee} EGP`;
  // }
  function updateShippingFeesguestcheckout() {
    const selectedCity = document.getElementById("Gityandgovernment").value;
    const shippingText = document.getElementById("shippingText");
    const shippingFeeValue = document.getElementById("shipping-fees-guest");
    const cartTotal =
      parseFloat(
        document.getElementById("cart-total").textContent.replace(" EGP", "")
      ) || 0;

    // Check for free shipping qualification
    const qualifiesForFreeShipping = cartTotal >= parseFloat(freeshipping);

    if (qualifiesForFreeShipping) {
      // Free shipping case
      shippingText.innerHTML = `
            <span class="BuyItNowForm-shipping-message">
                You've got free shipping!
            </span> (Order amount exceeds ${freeshipping} EGP)
        `;
      shippingFeeValue.dataset.fee = "0";
      shippingFeeValue.textContent = "free";
      return;
    }

    if (!selectedCity) {
      // No city selected case
      shippingText.textContent =
        "Please select your government to calculate shipping fees";
      shippingFeeValue.dataset.fee = "0";
      shippingFeeValue.textContent = "";
      return;
    }

    // Regular shipping case
    const shippingFee = maincities.includes(selectedCity)
      ? minshipping
      : maxshipping;

    shippingText.textContent = `Shipping fees: ${shippingFee} EGP`;
    shippingFeeValue.dataset.fee = shippingFee.toString();
    shippingFeeValue.textContent = `${shippingFee} EGP`;
  }

  // Initial update if city is already selected
  if (citySelect && citySelect.value && !qualifiesForFreeShipping) {
    updateShippingFeesguestcheckout();
  }
}
