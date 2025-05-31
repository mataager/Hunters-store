/**
 * Checks store status before loading the page.
 * @param {string} uid - The Firebase user/store ID.
 */

// async function checkSiteStatus(uid) {
//   if (!uid) {
//     blockPageAccess({
//       title: "Access Denied",
//       message: "Invalid store access. Contact the owner for assistance.",
//       reason: "No UID provided",
//       contactNumber: null,
//     });
//     return false; // Return false when access is blocked
//   }

//   try {
//     const response = await fetch(
//       `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/store-info.json`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch store info.");
//     }

//     const data = await response.json();

//     if (!data) {
//       blockPageAccess({
//         title: "Store Not Found",
//         message: "This store doesn't exist. Contact the owner for assistance.",
//         reason: "Store data not found in database",
//         contactNumber: null,
//       });
//       return false;
//     }

//     const status = data.status?.toLowerCase();
//     const endingDateStr = data["ending-date"];
//     const contactNumber = data["phone-number"] || null;
//     // Check status first
//     if (status === "pending") {
//       blockPageAccess({
//         title: "Store Pending Approval",
//         message:
//           "This store is pending approval. Contact the owner for more information.",
//         reason: `Status: ${status}`,
//         endingDate: endingDateStr,
//         contactNumber: contactNumber,
//       });
//       return false;
//     }

//     if (status === "stopped") {
//       blockPageAccess({
//         title: "Store Suspended",
//         message:
//           "This store has been suspended. Contact the owner to resolve the issue.",
//         reason: `Status: ${status}`,
//         endingDate: endingDateStr,
//         contactNumber: contactNumber,
//       });
//       return false;
//     }

//     // Then check expiry date if status is active
//     if (endingDateStr) {
//       // More reliable date parsing
//       const dateTimeParts = endingDateStr.split(", ");
//       if (dateTimeParts.length !== 2) {
//         console.error("Invalid date format - missing time part");
//         return true; // Don't block if we can't parse the date
//       }

//       const [datePart, timePart] = dateTimeParts;
//       const [month, day, year] = datePart.split("/").map(Number);
//       const [time, period] = timePart.split(" ");
//       const [hours, minutes, seconds] = time.split(":").map(Number);

//       // Convert to 24-hour format
//       let hours24 = hours;
//       if (period.toLowerCase() === "pm" && hours < 12) {
//         hours24 += 12;
//       } else if (period.toLowerCase() === "am" && hours === 12) {
//         hours24 = 0;
//       }

//       // Create date object (months are 0-indexed)
//       const endingDate = new Date(
//         year,
//         month - 1,
//         day,
//         hours24,
//         minutes,
//         seconds
//       );
//       const now = new Date();
//       if (isNaN(endingDate.getTime())) {
//         console.error("Invalid ending-date format:", endingDateStr);
//       } else if (endingDate < now) {
//         blockPageAccess({
//           title: "Subscription Expired",
//           message:
//             "This store's subscription has ended. Contact the owner to renew.",
//           reason: `Subscription ended on ${endingDateStr}`,
//           endingDate: endingDateStr,
//           contactNumber: contactNumber,
//         });
//         return false;
//       }
//     }

//     return true; // Return true if access should be allowed
//   } catch (error) {
//     console.error("Error checking site status:", error);
//     blockPageAccess({
//       title: "Verification Failed",
//       message: "Unable to verify store status. Please try again later.",
//       reason: error.message,
//       contactNumber: null,
//     });
//     return false;
//   }
// }

async function checkSiteStatus(uid) {
  if (!uid) {
    blockPageAccess({
      title: "Access Denied",
      message: "Invalid store access. Contact the owner for assistance.",
      reason: "No UID provided",
      contactNumber: null,
    });
    return false;
  }

  try {
    const response = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/store-info.json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch store info.");
    }

    const data = await response.json();

    if (!data) {
      blockPageAccess({
        title: "Store Not Found",
        message: "This store doesn't exist. Contact the owner for assistance.",
        reason: "Store data not found in database",
        contactNumber: null,
      });
      return false;
    }

    const status = data.status?.toLowerCase();
    const endingDateStr = data["ending-date"];
    const contactNumber = data["phone-number"] || null;

    // Check status first
    if (status === "pending") {
      blockPageAccess({
        title: "Store Pending Approval",
        message:
          "This store is pending approval. Contact the owner for more information.",
        reason: `Status: ${status}`,
        endingDate: endingDateStr,
        contactNumber: contactNumber,
      });
      return false;
    }

    if (status === "stopped") {
      blockPageAccess({
        title: "Store Suspended",
        message:
          "This store has been suspended. Contact the owner to resolve the issue.",
        reason: `Status: ${status}`,
        endingDate: endingDateStr,
        contactNumber: contactNumber,
      });
      return false;
    }
    if (status === "commingsoon") {
      blockPageAccess({
        title: "Coming Soon!", // Updated title
        message: "We're working hard to launch this store. Check back later!",
        reason: `Status: ${status}`,
        // endingDate: endingDateStr,
        contactNumber: contactNumber,
      });
      return false;
    }

    // Then check expiry date if status is active
    if (endingDateStr) {
      // Parse the date string in format "DD/MM/YYYY, HH:MM:SS am/pm"
      const dateTimeParts = endingDateStr.split(", ");
      if (dateTimeParts.length !== 2) {
        console.error("Invalid date format - missing time part");
        return true; // Don't block if we can't parse the date
      }

      const [datePart, timePart] = dateTimeParts;
      const [day, month, year] = datePart.split("/").map(Number);
      const [time, period] = timePart.split(" ");
      const [hours, minutes, seconds] = time.split(":").map(Number);

      // Convert to 24-hour format
      let hours24 = hours;
      if (period.toLowerCase() === "pm" && hours < 12) {
        hours24 += 12;
      } else if (period.toLowerCase() === "am" && hours === 12) {
        hours24 = 0;
      }

      // Create date object (months are 0-indexed)
      const endingDate = new Date(
        year,
        month - 1,
        day,
        hours24,
        minutes,
        seconds
      );

      const now = new Date();

      if (isNaN(endingDate.getTime())) {
        console.error("Invalid ending-date format:", endingDateStr);
      } else if (endingDate < now) {
        // Clear the body content first
        document.body.innerHTML = "";
        blockPageAccess({
          title: "Subscription Expired",
          message:
            "This store's subscription has ended. Contact the owner to renew.",
          reason: `Subscription ended on ${endingDateStr}`,
          endingDate: endingDateStr,
          contactNumber: contactNumber,
        });
        return false;
      }
    }

    return true; // Return true if access should be allowed
  } catch (error) {
    console.error("Error checking site status:", error);
    blockPageAccess({
      title: "Verification Failed",
      message: "Unable to verify store status. Please try again later.",
      reason: error.message,
      contactNumber: null,
    });
    return false;
  }
}
/**
 * Blocks the page and shows an error message with contact info.
 * @param {Object} options - Error details
 */
function blockPageAccess({
  title,
  message,
  reason,
  endingDate,
  contactNumber,
}) {
  document.documentElement.innerHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
     
          body {
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Josefin Sans';
          }
          .message {
            text-align: center;
            padding: 20px;
            max-width: 80%;
          }
          .contact-box {
            margin-top: 20px;
            padding: 15px;
            background: #f0f8ff;
            border-radius: 8px;
            border: 1px solid #d0e3ff;
          }
          .contact-button {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 16px;
            background: #d0e3ff;
            border: 1px solid #d0e3ff;
            color: #272727;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
          }
          .contact-button:hover {
           border: 1px solid #272727;
           
          }
        
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
      </head>
      <body>
        <div class="message">
          <h1>${title}</h1>
          <p>${message}</p>
          ${
            endingDate
              ? `<p><strong>Ending Date:</strong> ${endingDate}</p>`
              : ""
          }
          
          ${
            contactNumber
              ? `
            <div class="contact-box">
              <p><strong>Contact Store Owner:</strong></p>
              <a href="tel:${contactNumber}" class="contact-button">
                Call ${formatPhoneNumber(contactNumber)}
              </a>
            </div>
          `
              : ""
          }
          
          <div style="margin-top: 20px; color: #666; font-size: 14px;">
            <strong>Reason:</strong> ${reason}
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Formats phone numbers for better display
 */
function formatPhoneNumber(phoneNumber) {
  // Egyptian phone number format
  if (phoneNumber.startsWith("01") && phoneNumber.length === 11) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
      3,
      7
    )} ${phoneNumber.slice(7)}`;
  }
  return phoneNumber;
}

checkSiteStatus(uid);
