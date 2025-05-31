document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display orders data
  function checkAndDisplayEmptyMessage(tableBodyId, sectionId, message) {
    const tableBody = document.getElementById(tableBodyId);
    const section = document.getElementById(sectionId);

    // Find the parent table element
    const table = tableBody.closest("table");

    // Clear existing empty message
    const existingMessage = section.querySelector(".no-orders");
    if (existingMessage) {
      existingMessage.remove();
    }

    // If the table is empty, hide the table and show the message
    if (tableBody.children.length === 0) {
      if (table) {
        table.classList.add("hidden"); // Hide the table
      }

      const noOrdersMessage = document.createElement("div");
      noOrdersMessage.innerHTML = `<p>${message}</p>`;
      noOrdersMessage.classList.add(
        "flex",
        "align-items",
        "center",
        "available-height",
        "available-width",
        "no-orders"
      );
      section.appendChild(noOrdersMessage);
    } else {
      // If the table is not empty, ensure the table is visible
      if (table) {
        table.classList.remove("hidden");
      }
    }
  }

  async function fetchOrders() {
    const preloader = document.getElementById("preloader");
    const ordersContent = document.getElementById("orders-content");
    const totalOrdersElement = document.getElementById("Total-orders");
    const pendingOrdersElement = document.getElementById("Pending-orders");
    const CompletedOrdersElement = document.getElementById("Completed-orders");
    const canceldOrdersElement = document.getElementById("Canceld-orders");

    let totalOrdersCount = 0;
    let pendingOrdersCount = 0;
    let completedOrdersCount = 0;
    let CanceldOrdersCount = 0;

    try {
      // Show the preloader
      preloader.classList.remove("hidden");

      const response = await fetch(`${url}/Stores/${uid}/orders.json`);
      const data = await response.json();

      const ordersTableBody = document.getElementById("orders-table-body");
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      const canceledOrdersTableBody = document.getElementById(
        "Canceled-orders-table-body"
      );
      ordersTableBody.innerHTML = ""; // Clear existing content
      completedOrdersTableBody.innerHTML = ""; // Clear existing content
      canceledOrdersTableBody.innerHTML = ""; // Clear existing content

      if (!data) {
        checkAndDisplayEmptyMessage(
          "orders-table-body",
          "orders-content",
          "No pending orders yet."
        );
        checkAndDisplayEmptyMessage(
          "completed-orders-table-body",
          "completed-orders-content",
          "No completed orders yet."
        );
        checkAndDisplayEmptyMessage(
          "Canceled-orders-table-body",
          "Canceled-orders-content",
          "No canceled orders yet."
        );
        return;
      }
      // Reverse the order of orders
      const reversedOrders = Object.entries(data).reverse();
      totalOrderscount = reversedOrders.length; // Get the total number of orders
      totalOrdersElement.innerHTML = totalOrderscount; //

      for (const [orderId, order] of reversedOrders) {
        const customerName = `${order.personal_info.name}`;
        const email = order.personal_info.email;
        const city = order.personal_info.city;
        const address = order.personal_info.address;
        const phoneNumber = order.personal_info.phone;
        const housenumber = order.personal_info.phone2;
        const Customeruid = order.Customeruid;
        const cutomerorderuid = order.orderUID;
        const flaggedtester = order.flage;
        const shippingtester = order.shippingstatus;

        const totalPrice =
          order.cart.reduce(
            (sum, item) =>
              sum + parseFloat(item.price.replace(" EGP", "")) * item.quantity,
            0
          ) + order.shippingFees;

        const totalcuts =
          order.cart.reduce(
            (sum, item) => sum + (parseFloat(item.cut) || 0),
            0
          ) + (order.totalcuts ? parseFloat(order.totalcuts) : 0);

        const row = document.createElement("tr");
        row.classList.add("point", "order-tr");
        row.setAttribute("data-order-id", orderId); // Adding data-order-id attribute

        // Apply color class based on progress
        if (order.progress === "accepted") {
          row.classList.add("green-tr");
          completedOrdersCount++;
        } else if (order.progress === "notaccepted") {
          row.classList.add("red-tr");
          CanceldOrdersCount++;
        } else {
          row.classList.add("yellow-tr");
          pendingOrdersCount++;
        }

        row.innerHTML = `
                        <td>${orderId}</td>
                        <td>${customerName}</td>
                        <td class="w-300">${email}</td>
                        <td>${city}</td>
                        <td>
                            <div class="flex center flex-start">
                                <div class="loc-order-ico m-LR-2" onclick="searchonmap('${address}', event)"><i class="bi bi-geo-alt"></i></div>
                                <div class="loc-order-ico m-LR-2" onclick="copytoclipbarod('${address}', event)"><i class="bi bi-copy"></i></div>
                            </div>
                        </td>

                        <td>${phoneNumber}</td>
                        <td>${housenumber}</td>
                        <td>${order.shippingFees} EGP</td>
                        <td>${totalPrice} EGP</td>
                        <td>${totalcuts} EGP</td>
                        <td class="flex center align items w-600">
                            <button type="button" class="open-orderbtn pointer p-10">
                             <i class="bi bi-plus-circle point" data-order-id="${orderId}"></i>
                            </button>
                            <button type="button" class="addbtn pointer accept-order-btn p-10" data-order-id="${orderId}" id="Activate" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}','${totalcuts}', 'accepted', event)">
                               <p>Accept Order</p><i class="bi bi-box-fill pointer"></i>
                            </button>
                            <button type="button" class="addbtn pointer out-for-shipping accept-order-btn p-10 hidden" data-order-id="${orderId}" id="" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'shipped', event)">
                               <p>Mark As Shipped</p> <i class="bi bi-truck"></i>
                            </button>
                            <button type="button" class="addbtn pointer returned accept-order-btn p-10 hidden" data-order-id="${orderId}" id="" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'returned', event)">
                               <p>Mark As Returned</p> <i class="bi bi-arrow-counterclockwise"></i>
                            </button>
                            <button type="button" class="printbtn pointer p-10" data-order-id="${orderId}" id="print" onclick="print('${orderId}', this, event)" onmouseenter="animateprint(this)">
                                  <i class="bi bi-printer"></i>
                            </button>
                            <button type="button" class="addbtn pointer deaccept-order-btn p-10" data-order-id="${orderId}" id="Deactivate" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}','${totalcuts}', 'notaccepted', event)">
                                <p>Cancel Order</p><i class="bi bi-x-circle pointer"></i>
                            </button>
                            <button type="button" class="addbtn pointer accept-order-btn p-10" data-order-id="${orderId}" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}','${totalcuts}', 'deleted', event)">
                               <p>Delete Order</p><i class="bi bi-x-octagon"></i>
                            </button>

                            <button type="button" class="shippingbtn pointer p-10  ${
                              shippingtester === "Shipped"
                                ? "Shipped-active"
                                : ""
                            }" id="Shipped" onclick="updateshippingStatus('${orderId}','${shippingtester}', event)" onmouseenter="animateTruck(this)">
                                  <i class="bi bi-truck ${
                                    shippingtester === "Shipped"
                                      ? "text-danger"
                                      : ""
                                  }"></i>
                            </button>

                            <button type="button" class="shippingbtn pointer p-10  ${
                              shippingtester === "Returned"
                                ? "Returned-active"
                                : ""
                            }" id="Returned" onclick="updateshippingStatus('${orderId}','${shippingtester}', event)" onmouseenter="animatereturned(this)">
                                  <i class="bi bi-arrow-return-left ${
                                    shippingtester === "Returned"
                                      ? "text-danger"
                                      : ""
                                  }"></i>
                            </button>

                             <button type="button" class="flagged-btn pointer p-10 ${
                               flaggedtester === "flagged"
                                 ? "flagged-active"
                                 : ""
                             }" id="flagged" onclick="flageorder('${orderId}','${totalcuts}','${flaggedtester}', event)" onmouseenter="animateFlag(this)">
                                  <i class="bi bi-flag ${
                                    flaggedtester === "flagged"
                                      ? "text-danger"
                                      : ""
                                  }"></i>
                            </button>
                            
                            
                        </td>
                    `;
        if (order.progress === "accepted") {
          completedOrdersTableBody.appendChild(row);
          removeButtonsFromCompletedOrdersTable(); // Remove buttons from completed orders table
        } else if (order.progress === "notaccepted") {
          canceledOrdersTableBody.appendChild(row);
        } else {
          ordersTableBody.appendChild(row);
        }
        removeButtonsFromPendingTables();
      }

      CompletedOrdersElement.innerHTML = completedOrdersCount;
      canceldOrdersElement.innerHTML = CanceldOrdersCount;
      pendingOrdersElement.innerHTML = pendingOrdersCount;

      // Check for empty tables and display messages
      checkAndDisplayEmptyMessage(
        "orders-table-body",
        "orders-content",
        "No pending orders yet."
      );
      checkAndDisplayEmptyMessage(
        "completed-orders-table-body",
        "completed-orders-content",
        "No completed orders yet."
      );
      checkAndDisplayEmptyMessage(
        "Canceled-orders-table-body",
        "Canceled-orders-content",
        "No canceled orders yet."
      );

      // Add click event listener to all rows
      document.querySelectorAll("tr.point").forEach((row) => {
        row.addEventListener("click", toggleOrderDetails);
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      // Ensure the preloader is hidden
      preloader.classList.add("hidden");
    }
  }

  // const db = firebase.database(); // Get the database reference
  // let previousOrdersCount = 0; // Track the number of orders

  // // Notification Sound
  // const notificationSound = new Audio("./assets/soundEffects/neworder.mp3"); // Replace with your sound file URL
  // function listenForNewOrders() {
  //   const ordersRef = db.ref(`Stores/${uid}/orders`);
  //   ordersRef.on("value", (snapshot) => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       const currentOrdersCount = Object.keys(data).length; // Get the total number of orders

  //       // Play sound only if a new order is added
  //       if (currentOrdersCount > previousOrdersCount) {
  //         // notificationSound.play();
  //       }

  //       previousOrdersCount = currentOrdersCount; // Update the previous count
  //       fetchOrders(); // Update UI
  //       notificationSound.play();
  //     }
  //   });
  //   fetchOrders();
  // }

  // listenForNewOrders();

  const db = firebase.database(); // Get the database reference
  let previousOrdersCount = 0; // Track the number of orders

  // Notification Sound
  const notificationSound = new Audio("./assets/soundEffects/neworder.mp3");

  function listenForNewOrders() {
    const ordersRef = db.ref(`Stores/${uid}/orders`);
    ordersRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const currentOrdersCount = Object.keys(data).length; // Get the total number of orders

        // Play sound and show alert only if a new order is added
        if (currentOrdersCount > previousOrdersCount) {
          const newOrdersCount = currentOrdersCount - previousOrdersCount;

          // Play notification sound
          notificationSound
            .play()
            .catch((e) => console.log("Audio play failed:", e));

          // Show SweetAlert toast
          Swal.fire({
            title: "New Order!",
            text: `You have ${newOrdersCount} new order${
              newOrdersCount > 1 ? "s" : ""
            } waiting for your action`,
            icon: "info",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
        }

        previousOrdersCount = currentOrdersCount; // Update the previous count
        fetchOrders(); // Update UI
      }
    });
    fetchOrders();
  }

  listenForNewOrders();

  // Dark & Light toggle
  document.querySelector(".day-night input").addEventListener("change", () => {
    document.querySelector("body").classList.toggle("dark");
  });

  function removeButtonsFromCompletedOrdersTable() {
    const completedOrdersTableBody = document.getElementById(
      "completed-orders-table-body"
    );
    completedOrdersTableBody
      .querySelectorAll("button#Activate, button#Deactivate")
      .forEach((button) => {
        button.remove();
      });
  }

  function removeButtonsFromPendingTables() {
    const pendingOrdersSection = document.getElementById(
      "pending-orders-section"
    );
    if (pendingOrdersSection) {
      pendingOrdersSection
        .querySelectorAll(
          "button#print, button.flagged-btn ,button.shippingbtn,button.returnbtn"
        )
        .forEach((button) => {
          button.remove();
        });
    }

    // Remove from Canceled Orders Table Body
    const canceledOrdersTableBody = document.getElementById(
      "Canceled-orders-table-body"
    );
    if (canceledOrdersTableBody) {
      canceledOrdersTableBody
        .querySelectorAll("button#print, button.flagged-btn")
        .forEach((button) => {
          button.remove();
        });
    }
  }

  async function updateOrderStatus(
    orderId,
    Customeruid,
    cutomerorderuid,
    totalcuts,
    status,
    event
  ) {
    event.stopPropagation(); // Prevent row click event

    const customerUid = Customeruid;
    const customerOrderUid = cutomerorderuid;

    const row = document.querySelector(`tr[data-order-id="${orderId}"]`);
    if (!row) {
      console.error("Row not found");
      return;
    }

    // Get the current authenticated user
    const user = firebase.auth().currentUser;
    if (!user) {
      Swal.fire({
        title: "Authentication Required!",
        text: "You need to be signed in to update the order status.",
        icon: "warning",
        toast: true,
        position: "top-end", // Positions toast in the top-right corner
        showConfirmButton: false,
        timer: 3000, // Closes after 3 seconds
        timerProgressBar: true, // Adds a progress bar
      });
      return; // Exit if the user is not authenticated
    }

    try {
      // Get the ID token of the authenticated user
      const idToken = await user.getIdToken();
      const shippingFees = parseFloat(
        row
          .querySelector("td:nth-last-child(4)") // Third-to-last <td> for shipping fees
          .textContent.replace(" EGP", "")
      );

      const totalPriceWithShipping = parseFloat(
        row
          .querySelector("td:nth-last-child(3)") // Second-to-last <td> for total price
          .textContent.replace(" EGP", "")
      );

      const totalPrice = totalPriceWithShipping - shippingFees;
      //

      if (status === "accepted") {
        // Update the status in the database with ID token
        const response = await fetch(
          `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ progress: "accepted" }),
          }
        );

        await updateCustomerOrder(
          customerUid,
          customerOrderUid,
          status,
          idToken
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        // Fetch the current Matager data with ID token
        const matagerResponse = await fetch(
          `${url}/Stores/${uid}/Matager.json?auth=${idToken}`
        );
        if (!matagerResponse.ok) {
          throw new Error("Failed to fetch Matager data");
        }
        const matagerData = await matagerResponse.json();
        const matagerCutamount = parseInt(matagerData["matager-cut"]);
        const totalcutsNumber = parseInt(totalcuts || 0);

        // Calculate the new values
        const newAmount = matagerData.Amount + totalPrice;
        const newCount = matagerData.count + 1;
        const newMatagerCut = matagerCutamount + totalcutsNumber;

        // Update the Matager object with ID token
        const updateMatagerResponse = await fetch(
          `${url}/Stores/${uid}/Matager.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Amount: newAmount,
              count: newCount,
              "matager-cut": newMatagerCut,
            }),
          }
        );

        if (!updateMatagerResponse.ok) {
          throw new Error("Failed to update Matager data");
        }

        // Move the row to the completed orders table and remove unwanted buttons
        const completedOrdersTableBody = document.getElementById(
          "completed-orders-table-body"
        );
        const acceptedRow = row.cloneNode(true);
        acceptedRow.querySelector(".accept-order-btn")?.remove();
        acceptedRow.querySelector(".delete-order-btn")?.remove();
        completedOrdersTableBody.appendChild(acceptedRow);
        row.remove(); // Remove from the current table

        Swal.fire({
          title: "Accepted!",
          text: "Order has been accepted.",
          icon: "success",
          toast: true,
          position: "top-end", // Positions toast in the top-right corner
          showConfirmButton: false,
          timer: 3000, // Closes after 3 seconds
          timerProgressBar: true, // Adds a progress bar
        }).then(() => {
          // location.reload(); // Reloads page after toast disappears
        });
      } else if (status === "deleted") {
        // Show confirmation dialog with reason selection
        const { value: deleteReason } = await Swal.fire({
          title: "Delete Order Confirmation",
          html: `
            <p>Why are you deleting this order?</p>
            <div class="delete-reasons" style="margin: 15px 0; display: flex; flex-direction: column; gap: 10px;">
              <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                <input type="radio" name="deleteReason" value="duplicate" checked style="margin-right: 10px;">
                <div>
                  <strong>Duplicate Order</strong>
                  <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
                    This order was created multiple times by mistake.
                  </p>
                </div>
              </label>
              
              <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                <input type="radio" name="deleteReason" value="fraud" style="margin-right: 10px;">
                <div>
                  <strong>Suspected Fraud</strong>
                  <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
                    The order appears to be fraudulent or suspicious.
                  </p>
                </div>
              </label>
              
              <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                <input type="radio" name="deleteReason" value="cancelled" style="margin-right: 10px;">
                <div>
                  <strong>Customer Cancelled</strong>
                  <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
                    The customer requested to cancel this order.
                  </p>
                </div>
              </label>
              
              <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                <input type="radio" name="deleteReason" value="out_of_stock" style="margin-right: 10px;">
                <div>
                  <strong>Items Out of Stock</strong>
                  <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
                    We cannot fulfill this order due to inventory issues.
                  </p>
                </div>
              </label>
              
              <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
                <input type="radio" name="deleteReason" value="other" style="margin-right: 10px;">
                <div>
                  <strong>Other Reason</strong>
                  <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
                    Please specify the reason in the notes below.
                  </p>
                </div>
              </label>
            </div>
            
            <div id="otherReasonNotes" style="margin-top: 15px; display: none;">
              <textarea id="deleteNotes" class="swal2-textarea" placeholder="Please provide details..." style="
    width: -webkit-fill-available;
    margin: 0;
"></textarea>
            </div>
          `,
          focusConfirm: false,
          toast: true,
          position: "top-end",
          showCancelButton: true,
          confirmButtonText: "Confirm Delete",
          cancelButtonText: "Cancel",
          icon: "question",
          preConfirm: () => {
            const reason = document.querySelector(
              'input[name="deleteReason"]:checked'
            ).value;
            const notes =
              reason === "other"
                ? document.getElementById("deleteNotes").value
                : "";

            if (!reason) {
              Swal.showValidationMessage("Please select a reason for deletion");
              return false;
            }

            if (reason === "other" && !notes.trim()) {
              Swal.showValidationMessage(
                "Please provide details for your reason"
              );
              return false;
            }

            return { reason, notes };
          },
          didOpen: () => {
            const radioButtons = document.querySelectorAll(
              'input[name="deleteReason"]'
            );
            const notesContainer = document.getElementById("otherReasonNotes");

            radioButtons.forEach((radio) => {
              radio.addEventListener("change", (e) => {
                notesContainer.style.display =
                  e.target.value === "other" ? "block" : "none";
              });
            });
          },
        });

        // If user confirmed deletion
        if (deleteReason) {
          const { reason, notes } = deleteReason;
          const deletionData = {
            progress: status,
            deletionReason: reason,
            deletionNotes: notes,
            deletedAt: new Date().toISOString(),
          };

          // Update the status with deletion details
          const response = await fetch(
            `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          await updateCustomerOrder(
            customerUid,
            customerOrderUid,
            status,
            idToken,
            deletionData
          );

          if (!response.ok) {
            throw new Error("Failed to update order status");
          }

          // Get human-readable reason text
          const reasonTexts = {
            duplicate: "Duplicate Order",
            fraud: "Suspected Fraud",
            cancelled: "Customer Cancelled",
            out_of_stock: "Items Out of Stock",
            other: "Other Reason",
          };

          Swal.fire({
            title: "Order Deleted",
            text: `Order #${orderId} has been deleted (Reason: ${reasonTexts[reason]})`,
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } else {
        // Update the status and show only pending or deleted rows with ID token
        const response = await fetch(
          `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ progress: status }),
          }
        );
        await updateCustomerOrder(
          customerUid,
          customerOrderUid,
          status,
          idToken
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        // Update the row class based on the new status
        row.classList.remove("red-tr", "green-tr", "yellow-tr");
        if (status === "accepted") {
          row.classList.add("green-tr");
          moveRow(row, "completed");
        } else if (status === "pending") {
          row.classList.add("yellow-tr");
          moveRow(row, "orders");
        } else if (status === "notaccepted") {
          row.classList.add("red-tr");
          moveRow(row, "canceled");
        }

        Swal.fire({
          title: "Success",
          text: `Order status updated to ${status}`,
          icon: "success",
          toast: true,
          position: "top-end", // Top-right corner
          showConfirmButton: false,
          timer: 3000, // Closes after 3 seconds
          timerProgressBar: true, // Shows a progress bar
        }).then(() => {
          // location.reload(); // Reloads the page after the toast disappears
        });
      }
      // Update table visibility
      updateTableVisibility();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: `Failed to update order status: ${error.message}`,
        icon: "error",
        toast: true,
        position: "top-end", // Top-right corner
        showConfirmButton: false,
        timer: 4000, // Closes after 4 seconds
        timerProgressBar: true, // Shows a progress bar
      });
    }
  }

  function moveRow(row, tableId) {
    const ordersTableBody = document.getElementById("orders-table-body");
    const completedOrdersTableBody = document.getElementById(
      "completed-orders-table-body"
    );
    const CanceledOrdersTableBody = document.getElementById(
      "Canceled-orders-table-body"
    );

    if (tableId === "completed") {
      if (row.parentNode !== completedOrdersTableBody) {
        row.remove();
        completedOrdersTableBody.appendChild(row);
      }
    } else if (tableId === "orders") {
      if (row.parentNode !== ordersTableBody) {
        row.remove();
        ordersTableBody.appendChild(row);
      }
    } else if (tableId === "notaccepted") {
      if (row.parentNode !== CanceledOrdersTableBody) {
        row.remove();
        ordersTableBody.appendChild(row);
      }
    }
  }

  // Function to update table visibility
  function updateTableVisibility() {
    const ordersTableBody = document.getElementById("orders-table-body");
    const completedOrdersTableBody = document.getElementById(
      "completed-orders-table-body"
    );
    const canceledOrdersTableBody = document.getElementById(
      "Canceled-orders-table-body"
    );

    // Show only pending or deleted orders in the orders table
    ordersTableBody.querySelectorAll("tr").forEach((row) => {
      if (
        row.classList.contains("red-tr") ||
        row.classList.contains("yellow-tr")
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Show only accepted orders in the completed orders table
    completedOrdersTableBody.querySelectorAll("tr").forEach((row) => {
      if (row.classList.contains("green-tr")) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Show only canceled orders in the canceled orders table
    canceledOrdersTableBody.querySelectorAll("tr").forEach((row) => {
      if (row.classList.contains("red-tr")) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Make the function globally accessible
  window.updateOrderStatus = updateOrderStatus;
});

async function flageorder(orderId, totalcuts, flaggedtester, event) {
  // Always check if event exists first
  if (!event) {
    console.error("Event object is missing");
    return;
  }

  event.stopPropagation();

  // Get button reference safely
  const button = event.currentTarget || event.target.closest(".flagged-btn");
  if (!button) {
    console.error("Could not find button element");
    return;
  }

  // Check if order is already flagged using flaggedtester
  if (flaggedtester === "flagged") {
    await Swal.fire({
      title: "Already Flagged",
      text: "This order has already been flagged",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
    return;
  }

  // Show confirmation dialog with SweetAlert2
  const { isConfirmed } = await Swal.fire({
    title: "Confirm Flag Order",
    html: `
      <p>Are you sure you want to flag this order?</p>
      <div style="text-align: left;padding: 10px; border-radius: 5px; margin-top: 10px;">
        <small><strong>Note:</strong> Flagging indicates:</small>
        <ul style="margin: 5px 0 0 15px; padding-left: 15px;">
          <li><small>Order was not sent correctly</small></li>
          <li><small>Customer returned the order</small></li>
          <li><small>Other fulfillment issues</small></li>
        </ul>
      </div>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, flag it!",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    toast: true,
    position: "top-end",
  });

  if (!isConfirmed) return;

  // Save original content safely
  const originalContent = button.innerHTML;
  const icon = button.querySelector("i");

  // Show loading state
  button.innerHTML = `
    <div class="preloader m-0">
      <div class="spinner-sm"></div>
    </div>
  `;
  button.disabled = true;

  try {
    // Minimum 2 seconds loading
    const minDelay = new Promise((resolve) => setTimeout(resolve, 2000));

    // Firebase operations
    const firebaseCall = new Promise(async (resolve, reject) => {
      try {
        const uid = firebase.auth().currentUser.uid;

        // 1. Update order status
        const orderRef = firebase
          .database()
          .ref(`Stores/${uid}/orders/${orderId}`);
        await orderRef.update({ flage: "flagged" });

        // 2. Update Matager's flagged cuts
        const matagerRef = firebase.database().ref(`Stores/${uid}/Matager`);
        await matagerRef.transaction((currentData) => {
          if (currentData) {
            const currentFlagged = currentData.flagged || 0;
            return {
              ...currentData,
              flagged: Number(currentFlagged) + Number(totalcuts),
            };
          }
          return { flagged: Number(totalcuts) };
        });

        resolve();
      } catch (error) {
        reject(error);
      }
    });

    await Promise.all([firebaseCall, minDelay]);

    // Success notification
    Swal.fire({
      title: "Order Flagged!",
      text: "The order has been marked as flagged",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error!",
      text: "Failed to flag the order",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  } finally {
    // Restore button safely
    if (button) {
      button.disabled = false;
      if (icon) {
        button.innerHTML = originalContent;
        icon.classList.remove("bi-flag");
        icon.classList.add("bi-flag-fill", "text-danger");
      } else {
        button.innerHTML = `<i class="bi bi-flag-fill text-danger"></i>`;
      }
    }
  }
}
async function updateshippingStatus(orderId, shippingtester, event) {
  // Always check if event exists first
  if (!event) {
    console.error("Event object is missing");
    return;
  }

  event.stopPropagation();

  // Get button reference safely
  const button = event.currentTarget || event.target.closest(".flagged-btn");
  if (!button) {
    console.error("Could not find button element");
    return;
  }

  // Check if order is already flagged using flaggedtester
  if (shippingtester === "Shipped") {
    await Swal.fire({
      title: "Already Shipped",
      text: "This order has already been Shipped",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
    return;
  }

  const { isConfirmed, value } = await Swal.fire({
    title: "Confirm Shipping Order",
    html: `
      <p>How would you like to ship this order?</p>
      <div class="shipping-options" style="margin: 15px 0; display: flex; flex-direction: column; gap: 10px;">
        <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
          <input type="radio" name="shippingMethod" value="bosta" checked style="margin-right: 10px;">
          <div>
            <strong>Ship with Bosta</strong>
            <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
              We'll handle shipping through our integrated Bosta service. Best for standard deliveries.
            </p>
          </div>
        </label>
        
        <label style="display: flex; align-items: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">
          <input type="radio" name="shippingMethod" value="own" style="margin-right: 10px;">
          <div>
            <strong>Ship with Your Own Method</strong>
            <p style="margin: 5px 0 0; font-size: 0.8em; color: #666;">
              You'll arrange shipping separately. Use this for custom couriers or special handling.
            </p>
          </div>
        </label>
      </div>
      
      
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm Shipping",
    cancelButtonText: "Cancel",
    toast: true,
    position: "top-end",
    reverseButtons: true,
    focusConfirm: false,
    preConfirm: () => {
      const selectedMethod = document.querySelector(
        'input[name="shippingMethod"]:checked'
      ).value;
      return selectedMethod;
    },
  });

  if (isConfirmed) {
    // Save original content safely
    const originalContent = button.innerHTML;
    const icon = button.querySelector("i");

    // Show loading state
    button.innerHTML = `
    <div class="preloader m-0">
      <div class="spinner-sm"></div>
    </div>
  `;
    button.disabled = true;

    if (value === "bosta") {
      const shippingtester = "";
      await markshippingorderstatus(orderId, shippingtester, "bosta");
    } else if (value === "own") {
      const shippingtester = "";
      await markshippingorderstatus(orderId, shippingtester, "own");
    }
  }

  if (!isConfirmed) return;
}
async function markshippingorderstatus(orderId, status, way) {
  // const uid = firebase.auth().currentUser.uid;
  // const idToken = await user.getIdToken();
  if (status === "shipped" || status === "Returned" || status === "") {
    if (way === "own") {
      // // Update the status in the store's order database with ID token
      // const response = fetch(
      //   `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${idToken}`,
      //     },
      //     body: JSON.stringify({
      //       shippingstatus: "Shipped",
      //     }),
      //   }
      // );

      // updateCustomerOrder(customerUid, customerOrderUid, idToken, status);

      // if (!response.ok) {
      //   throw new Error("Failed to update order status");
      // }

      // disableInteractions(event);

      // Swal.fire({
      //   toast: true,
      //   position: "top-end",
      //   icon: "success",
      //   title: "Shipped!",
      //   text: "Order has been marked as shipped.",
      //   showConfirmButton: false,
      //   timer: 3000, // Auto-closes after 3 seconds
      // }).then(() => {
      //   // location.reload();
      //   enableInteractions();
      // });
      console.log("own hit");
    }
    if (way === "bosta") {
      console.log("bosta hit");
    }
  }
  if (status === "returned") {
  }
  if (status === "delivered") {
  }
}
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("active");
}
// Close dropdown if clicked outside
document.addEventListener("click", function (event) {
  const profileIcon = document.querySelector(".profile-icon");
  const dropdown = document.getElementById("dropdown");
  if (!profileIcon.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});
async function toggleOrderDetails(event) {
  const row = event.currentTarget;
  const nextRow = row.nextElementSibling;

  // Check if the next row is already the details row
  if (nextRow && nextRow.classList.contains("order-details")) {
    // Collapse to hide cart items (instant removal, no transition)
    nextRow.remove();
  } else {
    disableInteractions(event);
    // Add wave loading effect
    row.classList.add("wave-loading");

    const MIN_LOADING_TIME = 1000; // Minimum wave effect duration in milliseconds
    const startTime = Date.now();

    try {
      const orderId = row.getAttribute("data-order-id");
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json`
      );
      const order = await response.json();

      if (!order || !order.cart) {
        console.error("Order or cart is null or undefined.");
        return;
      }

      const cartItems = order.cart
        .map(
          (item) => `
            <tr class="cart-item">
              <td colspan="11">
                <div style="display: flex; align-items: center; width: max-content;">
                  <img src="${item.photourl}" alt="${item.title}"
                       style="width: auto; height: 80px; margin-right: 10px;"
                       class="clickable-image pointer">
                  <div style="display: flex; flex-direction: column; gap: 5px;">
                    <p>${item.id}</p>
                    <p>${item.brand}</p>
                    <p>${item.productColor}</p>
                    <p>${item.productSize}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p>${
                      parseFloat(item.price.replace(" EGP", "")) * item.quantity
                    } EGP</p>
                    <p>${item.cut}</p>
                  </div>
                </div>
              </td>
            </tr>`
        )

        .join("");

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // Wait for the remaining time before adding the details row
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      const detailsRow = document.createElement("div");
      detailsRow.classList.add("order-details");
      detailsRow.innerHTML = `
        
          <table>
            <tbody class="flex gap-10 p-7">
              ${cartItems}
            </tbody>
          </table>
       
      `;

      // Append the details row and animate its opening
      row.after(detailsRow);
      expandDetailsRow(detailsRow);

      // Scroll to the first row both horizontally and vertically
      row.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });

      // Attach click event to images
      document.querySelectorAll(".clickable-image").forEach((img) => {
        img.addEventListener("click", openModal);
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      enableInteractions();
      // Remove the wave-loading effect
      row.classList.remove("wave-loading");
    }
  }
}
// Helper function to collapse the details row with animation
function collapseDetailsRow(detailsRow) {
  detailsRow.style.height = `${detailsRow.scrollHeight}px`; // Set to current height
  detailsRow.style.opacity = "1";
  detailsRow.style.transition = "height 0.6s ease-out, opacity 0.6s ease-out";

  // Trigger the collapse transition
  setTimeout(() => {
    detailsRow.style.height = "0";
    detailsRow.style.opacity = "0";
  }, 15);

  // Remove the row after the transition completes
  detailsRow.addEventListener(
    "transitionend",
    (event) => {
      if (
        event.propertyName === "height" &&
        detailsRow.style.height === "0px"
      ) {
        detailsRow.remove();
      }
    },
    { once: true }
  );
}
// Helper function to expand the details row with animation
function expandDetailsRow(detailsRow) {
  detailsRow.style.maxHeight = "0";
  detailsRow.style.opacity = "0";
  detailsRow.style.overflow = "hidden";
  detailsRow.style.transition =
    "max-height 0.6s ease-out, opacity 0.6s ease-out";

  // Trigger the expansion transition
  setTimeout(() => {
    detailsRow.style.maxHeight = `${detailsRow.scrollHeight}px`;
    detailsRow.style.opacity = "1";
  }, 15);
}
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];

function openModal(event) {
  event.stopPropagation(); // Prevent triggering row click event
  modal.classList.add("show", "flex", "column");
  modalImg.style.background = "none"; // Removes background
  modalImg.src = event.target.src;
  captionText.innerHTML = event.target.alt;
}

span.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

function closeModal() {
  modal.classList.add("zoom-out"); // Add zoom-out animation
  setTimeout(() => {
    modal.classList.remove("show", "zoom-out"); // Remove after animation
  }, 600); // Match animation-duration (0.6s)
}

function searchonmap(address, event) {
  event.stopPropagation(); // Prevents the row click event from being triggered
  // Create a URL for the Google Maps search
  var url = "https://maps.google.com/maps?q=" + encodeURIComponent(address);
  // Open the URL in a new tab
  window.open(url, "_blank");
}
function copytoclipbarod(address, event) {
  event.stopPropagation(); // Prevents the row click event from being triggered

  // Create a textarea element to hold the address
  var textarea = document.createElement("textarea");
  textarea.value = address;

  // Add the textarea to the page
  document.body.appendChild(textarea);

  // Select the textarea
  textarea.select();

  try {
    // Copy the address to the clipboard
    var successful = document.execCommand("copy");

    if (successful) {
      // Show success toast
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Copied to clipboard!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      throw new Error("Copy command failed");
    }
  } catch (err) {
    // Show error toast if copy fails
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Failed to copy",
      text: "Please try again or copy manually",
      showConfirmButton: false,
      timer: 3000,
    });
  } finally {
    // Remove the textarea from the page
    document.body.removeChild(textarea);
  }

  // Determine which element was clicked
  var clickedElement = event.currentTarget;

  // Get the icon within the clicked element
  var icon = clickedElement.querySelector("i");

  // Change the icon to a checkmark
  if (icon) {
    icon.classList.remove("bi-copy"); // Remove the existing icon class
    icon.classList.add("bi-check-circle"); // Add the checkmark icon class

    // Revert back to the original icon after 1 second
    setTimeout(function () {
      icon.classList.remove("bi-check-circle");
      icon.classList.add("bi-copy");
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const upgradeButton = document.getElementById("report-btn");
  upgradeButton.addEventListener("click", () => {
    window.location.href = "./report.html";
  });
});

// async function updateCustomerOrder(
//   customerUid,
//   customerOrderUid,
//   status,
//   idToken
// ) {
//   const orderHistoryUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${customerUid}/orderHistory/${uid}/${customerOrderUid}.json?auth=${idToken}`;
//   try {
//     const response = await fetch(orderHistoryUrl, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ progress: status }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update customer's order history");
//     }

//     console.log("Customer order history updated successfully.");
//   } catch (error) {
//     console.error("Error updating customer's order history:", error);
//     throw error; // Re-throw the error to be handled by the caller
//   }
// }

async function updateCustomerOrder(
  customerUid,
  customerOrderUid,
  status,
  idToken,
  deletionData = null // Add optional deletionData parameter
) {
  const orderHistoryUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${customerUid}/orderHistory/${uid}/${customerOrderUid}.json?auth=${idToken}`;

  try {
    // Prepare update data
    const updateData = { progress: status };

    // If this is a deletion, include the deletion details
    if (status === "deleted" && deletionData) {
      updateData.deletionReason = deletionData.deletionReason;
      updateData.deletionNotes = deletionData.deletionNotes;
      updateData.deletedAt = deletionData.deletedAt;
    }

    const response = await fetch(orderHistoryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error("Failed to update customer's order history");
    }

    console.log("Customer order history updated successfully.");
  } catch (error) {
    console.error("Error updating customer's order history:", error);
    throw error;
  }
}

function showpendingOrders() {
  document.getElementById("pending-orders-section").classList.remove("hidden");
  document.getElementById("completed-orders-section").classList.add("hidden");
  document.getElementById("Canceled-orders-section").classList.add("hidden");

  // Update button styles
  document.getElementById("show-pending-btn").style.backgroundColor =
    "#6a64f142";
  document.getElementById("show-completed-btn").style.backgroundColor = "";
  document.getElementById("show-canceled-btn").style.backgroundColor = "";
}
function showCompletedOrders() {
  const completedOrdersSection = document.getElementById(
    "completed-orders-section"
  );
  const completedOrdersTableBody = document.getElementById(
    "completed-orders-table-body"
  );
  const pendingOrdersSection = document.getElementById(
    "pending-orders-section"
  );
  const canceledOrdersSection = document.getElementById(
    "Canceled-orders-section"
  );

  // Toggle visibility
  pendingOrdersSection.classList.add("hidden");
  completedOrdersSection.classList.remove("hidden");
  canceledOrdersSection.classList.add("hidden");

  // Update button styles
  document.getElementById("show-pending-btn").style.backgroundColor = "";
  document.getElementById("show-completed-btn").style.backgroundColor =
    "#6a64f142";
  document.getElementById("show-canceled-btn").style.backgroundColor = "";

  // Check if the completed orders table is empty
}
function showCanceledOrders() {
  const canceledOrdersSection = document.getElementById(
    "Canceled-orders-section"
  );
  const canceledOrdersTableBody = document.getElementById(
    "Canceled-orders-table-body"
  );
  const pendingOrdersSection = document.getElementById(
    "pending-orders-section"
  );
  const completedOrdersSection = document.getElementById(
    "completed-orders-section"
  );

  // Toggle visibility
  pendingOrdersSection.classList.add("hidden");
  completedOrdersSection.classList.add("hidden");
  canceledOrdersSection.classList.remove("hidden");

  // Update button styles
  document.getElementById("show-pending-btn").style.backgroundColor = "";
  document.getElementById("show-completed-btn").style.backgroundColor = "";
  document.getElementById("show-canceled-btn").style.backgroundColor =
    "#6a64f142";

  // Check if the canceled orders table is empty
}
$(document).ready(function () {
  // Search functionality for all three sections
  $("#sub-btn-del").click(function () {
    const searchType = $("#category").val(); // Get selected search type
    const searchValue = $("#product-id-input-del").val().toLowerCase(); // Get the search input value

    if (searchValue === "") {
      // Show SweetAlert with no confirm button
      Swal.fire({
        title: "Please enter a search term.",
        icon: "warning",
        toast: true,
        position: "top-end", // Positions toast in the top right corner
        showConfirmButton: false,
        timer: 1500, // Automatically closes after 1.5 seconds
        timerProgressBar: true, // Shows a progress bar
      });

      return;
    }

    let found = false;

    // Hide all rows initially
    $(
      "#orders-table-body tr, #completed-orders-table-body tr, #Canceled-orders-table-body tr"
    ).hide();
    $(
      "#pending-orders-section, #completed-orders-section, #Canceled-orders-section"
    ).addClass("hidden");

    // Determine where to search based on the selected type
    let columnIndex;
    switch (searchType) {
      case "OrderID": // Order-ID
        columnIndex = 0;
        break;
      case "Email": // Email
        columnIndex = 2;
        break;
      case "Phone": // Phone-num
        columnIndex = 5;
        break;
      default:
        return;
    }

    // Search through each row in the tables
    $(
      "#orders-table-body tr, #completed-orders-table-body tr, #Canceled-orders-table-body tr"
    ).each(function () {
      const row = $(this);
      const cellValue = row.find("td").eq(columnIndex).text().toLowerCase();

      if (cellValue.includes(searchValue)) {
        row.show(); // Show only the rows that match
        found = true;

        // Show the section where the result is found
        if (row.closest("tbody").is("#orders-table-body")) {
          $("#pending-orders-section").removeClass("hidden");
          // Apply background color to the "Pending" button
          $("#show-pending-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        } else if (row.closest("tbody").is("#completed-orders-table-body")) {
          $("#completed-orders-section").removeClass("hidden");
          // Apply background color to the "Completed" button
          $("#show-completed-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        } else if (row.closest("tbody").is("#Canceled-orders-table-body")) {
          $("#Canceled-orders-section").removeClass("hidden");
          // Apply background color to the "Canceled" button
          $("#show-canceled-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        }
      }
    });

    if (!found) {
      // Show SweetAlert with no confirm button
      Swal.fire({
        title: "No matching orders found.",
        icon: "info",
        toast: true,
        position: "top-end", // Positions toast in the top right corner
        showConfirmButton: false,
        timer: 1500, // Automatically closes after 1.5 seconds
        timerProgressBar: true, // Shows a progress bar
      });
    }
  });

  // Reset search functionality when input changes
  $("#product-id-input-del").on("input", function () {
    const searchValue = $(this).val();

    if (searchValue === "") {
      // Reset to show all orders (pending, completed, canceled)
      $("#orders-table-body tr").show();
      $("#completed-orders-table-body tr").show();
      $("#Canceled-orders-table-body tr").show();

      // Show all sections
      $("#pending-orders-section").addClass("hidden");
      $("#completed-orders-section").addClass("hidden");
      $("#Canceled-orders-section").addClass("hidden");

      $("#pending-orders-section").removeClass("hidden");

      // Reset button background colors
      $("#show-completed-btn,#show-pending-btn,#show-canceled-btn").css(
        "background-color",
        ""
      );

      // Clear the search input
      $("#product-id-input-del").val("");
    }
  });
});
