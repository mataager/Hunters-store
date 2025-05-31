//v3
function emailPasswordSignIn() {
  const body = document.body;
  const modal = document.getElementById("signinmodal");
  const modalContent = document.getElementById("signinmodalcontent");

  // Set the modal content with both forms (initially hidden)
  modalContent.innerHTML = `
    <div class="guestmodalarea">
    <div class="flex center flex-end guest-modal-close-btn-7a3b" onclick="closesigningModal()">
    <button type="button" class="modalbtnL" id="perv4Button">
        <i class="bi bi-x"></i>
    </button>
    </div>
      <!-- Sign In Form -->
      <div id="signin-form" class="form-container active">
      <div class="width-available flex center mb-20"><img class="animate-on-scroll-auto show fle" width="50px" src="./assets/images/matager-bag.svg"></div>
        <h2>Sign in for better experience</h2>
        <div class="mt-30 mb-30 signinupinbutarea04392">
          <input type="email" id="email" class="swal2-input" placeholder="Enter your email">
          <input type="password" id="password" class="swal2-input" placeholder="Enter your password">
          <div id="signin-error" class="error-hint"></div>
          <button id="continueGuest" class="modal-btn signinupbtn04392">Sign in</button>
          <div id="signin-preloader" class="preloader" style="display: none;"> <div class="loader"></div></div>
          <p style="margin-top: 40px;" class="signup-link-container ">Don't have an account? <a href="#" id="signup-link" class="mt-10 pb-5">Sign up here</a></p>
        </div>
      </div>

      <!-- Sign Up Form -->
      <div id="signup-form" class="form-container">
      <div class="width-available flex center mb-20"><img class="animate-on-scroll-auto show fle" width="50px" src="./assets/images/matager-bag.svg"></div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-step-sign" id="step1" data-step="1">Basic Info</div>
            <div class="progress-step-sign" id="step2" data-step="2">Security</div>
            <div class="progress-step-sign" id="step3" data-step="3">Details</div>
          </div>
          <div class="progress-line">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
        </div>

        <!-- Step 1: Basic Info -->
        <div id="signup-step1" class="signup-step active">
          <h2>Create a New Account</h2>
          <div class="mt-30 mb-30 signinupinbutarea04392">
            <input type="text" id="first-name-log" class="swal2-input width-available" placeholder="Enter your first name" required>
            <input type="text" id="last-name-log" class="swal2-input width-available" placeholder="Enter your last name" required>
            <input type="email" id="new-email" class="swal2-input width-available" placeholder="Enter your email" required>
            <input type="text" id="phone" class="swal2-input width-available" placeholder="Enter your primary phone number" required>
            <input type="text" id="phone2" class="swal2-input width-available" placeholder="Enter your secondary phone number (optional)">
            <div id="step1-error" class="error-hint"></div>
            <button id="next-to-step2" class="modal-btn signinupbtn04392">Next</button>
             <p class="mt-30">Already have an account? <a href="#" id="signin-link" class="mt-10">Sign in here</a></p>
          </div>
        </div>

        <!-- Step 2: Password -->
        <div id="signup-step2" class="signup-step">
          <h2>Create a Secure Password</h2>
          <div class="mt-30 mb-30 signinupinbutarea04392">
            <input type="password" id="new-password" class="swal2-input width-available" placeholder="Enter your password (min 6 characters)" required>
            <input type="password" id="confirm-password" class="swal2-input width-available" placeholder="Confirm your password" required>
            <div class="password-strength">
              <div class="strength-meter">
                <div class="strength-fill" id="strength-fill"></div>
              </div>
              <span id="strength-text">Password Strength: Weak</span>
            </div>
            <div id="step2-error" class="error-hint"></div>
            <div class="form-navigation">
              <button id="back-to-step1" class="modal-btn back-btn"><i class="bi bi-arrow-left"></i></button>
              <button id="next-to-step3" class="modal-btn signinupbtn04392">Next</button>
            </div>
            <p class="mt-30">Already have an account? <a href="#" id="signin-link" class="mt-10">Sign in here</a></p>
          </div>
        </div>

        <!-- Step 3: Additional Details -->
        <div id="signup-step3" class="signup-step">
          <h2>Additional Information</h2>
          <div class="mt-30 mb-30 signinupinbutarea04392">
            <select id="governorate" class="swal2-input select-governorate width-available" required>
  <option value="" disabled selected>Select your governorate</option>
  <option value="Alexandria">Alexandria</option>
  <option value="Aswan">Aswan</option>
  <option value="Asyut">Asyut</option>
  <option value="Beheira">Beheira</option>
  <option value="Beni Suef">Beni Suef</option>
  <option value="Cairo">Cairo</option>
  <option value="Dakahlia">Dakahlia</option>
  <option value="Damietta">Damietta</option>
  <option value="Faiyum">Faiyum</option>
  <option value="Gharbia">Gharbia</option>
  <option value="Giza">Giza</option>
  <option value="Ismailia">Ismailia</option>
  <option value="Kafr El Sheikh">Kafr El Sheikh</option>
  <option value="Luxor">Luxor</option>
  <option value="Matruh">Matruh</option>
  <option value="Minya">Minya</option>
  <option value="Monufia">Monufia</option>
  <option value="New Valley">New Valley</option>
  <option value="North Sinai">North Sinai</option>
  <option value="Port Said">Port Said</option>
  <option value="Qalyubia">Qalyubia</option>
  <option value="Qena">Qena</option>
  <option value="Red Sea">Red Sea</option>
  <option value="Sharqia">Sharqia</option>
  <option value="Sohag">Sohag</option>
  <option value="South Sinai">South Sinai</option>
  <option value="Suez">Suez</option>
</select>
            <input type="text" id="city" class="swal2-input width-available" placeholder="Enter your city/state" required>
            <input type="text" id="area" class="swal2-input width-available" placeholder="Enter your area" required>
            <input type="text" id="house-number" class="swal2-input width-available" placeholder="Enter your house number" required>
            <textarea id="address" class="swal2-textarea width-available" placeholder="Enter your full address" required></textarea>
            <div id="step3-error" class="error-hint"></div>
            <div class="form-navigation">
              <button id="back-to-step2" class="modal-btn back-btn"><i class="bi bi-arrow-left"></i></button>
              <button id="signup-btn" class="modal-btn signinupbtn04392">Complete Sign Up</button>
            </div>
            <div id="signup-preloader" class="preloader" style="display: none;"> <div class="loader"></div></div>
             <p class="mt-30">Already have an account? <a href="#" id="signin-link" class="mt-10">Sign in here</a></p>
          </div>
        </div>
        <div id="signup-success" style="display: none; text-align: center;">
              <i class="bi bi-check-circle-fill success-icon"></i>
              <p>Account created successfully!</p>
              <button id="close-modal-btn" class="modal-btn signinupbtn04392">Close</button>
            </div>
            <div id="signup-error" style="display: none; text-align: center;">
              <i class="bi bi-x-circle-fill error-icon"></i>
              <p id="signup-error-message">Error creating account</p>
              <button id="try-again-btn" class="modal-btn signinupbtn04392">Try Again</button>
        </div>
      </div>
    </div>
  `;

  // Show the modal
  body.classList.add("modal-open");
  modal.classList.add("show");

  // Add event listeners
  document
    .getElementById("continueGuest")
    .addEventListener("click", handleSignIn);
  document.getElementById("signup-btn").addEventListener("click", handleSignUp);
  document
    .getElementById("signup-link")
    .addEventListener("click", switchToSignUp);
  document
    .getElementById("signin-link")
    .addEventListener("click", switchToSignIn);
  document
    .getElementById("close-modal-btn")
    ?.addEventListener("click", closeModal);
  document
    .getElementById("try-again-btn")
    ?.addEventListener("click", resetSignUpForm);

  // Step navigation listeners
  document
    .getElementById("next-to-step2")
    .addEventListener("click", () => goToStep(2));
  document
    .getElementById("next-to-step3")
    .addEventListener("click", () => goToStep(3));
  document
    .getElementById("back-to-step1")
    .addEventListener("click", () => goToStep(1));
  document
    .getElementById("back-to-step2")
    .addEventListener("click", () => goToStep(2));

  // Password strength checker
  document
    .getElementById("new-password")
    .addEventListener("input", checkPasswordStrength);

  // Add input event listeners to all fields to clear errors when typing
  const allInputs = modalContent.querySelectorAll("input, textarea, select");
  allInputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Remove error class
      this.classList.remove("input-error");

      // Clear the error message for the current step
      const currentStep = this.closest(".signup-step");
      if (currentStep) {
        const stepId = currentStep.id;
        const errorElementId = stepId.replace("signup-step", "step") + "-error";
        document.getElementById(errorElementId).textContent = "";
      } else {
        // For sign in form
        document.getElementById("signin-error").textContent = "";
      }
    });
  });

  // Handle Enter key press for both forms
  modalContent.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const activeForm = modalContent.querySelector(".form-container.active");
      if (activeForm.id === "signin-form") {
        handleSignIn();
      } else {
        const currentStep = modalContent.querySelector(".signup-step.active");
        if (currentStep.id === "signup-step1") {
          goToStep(2);
        } else if (currentStep.id === "signup-step2") {
          goToStep(3);
        } else {
          handleSignUp();
        }
      }
    }
  });

  function showError(fieldId, message) {
    // Highlight the input with red border
    const inputElement = document.getElementById(fieldId);
    if (inputElement) {
      inputElement.classList.add("input-error");
    }

    // Show the error message in the appropriate error container
    if (fieldId === "email" || fieldId === "password") {
      document.getElementById("signin-error").textContent = message;
    } else {
      // Determine which step we're on for sign up
      const currentStep = document.querySelector(".signup-step.active");
      if (currentStep) {
        const stepId = currentStep.id;
        const errorElementId = stepId.replace("signup-step", "step") + "-error";
        document.getElementById(errorElementId).textContent = message;
      }
    }
  }

  function clearAllErrors() {
    // Clear all error messages
    document.querySelectorAll(".error-hint").forEach((el) => {
      el.textContent = "";
    });

    // Remove all error classes
    document.querySelectorAll(".input-error").forEach((el) => {
      el.classList.remove("input-error");
    });
  }

  function switchToSignUp(e) {
    e.preventDefault();
    clearAllErrors();
    document.getElementById("signin-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
    goToStep(1); // Start at step 1
  }

  function switchToSignIn(e) {
    e.preventDefault();
    clearAllErrors();
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("signin-form").classList.add("active");
  }

  function goToStep(stepNumber) {
    // Validate current step before proceeding
    if (stepNumber > 1 && !validateStep(stepNumber - 1)) {
      return;
    }

    // Hide all steps
    document.querySelectorAll(".signup-step").forEach((step) => {
      step.classList.remove("active");
    });

    // Show current step
    document.getElementById(`signup-step${stepNumber}`).classList.add("active");

    // Update progress bar
    updateProgressBar(stepNumber);

    // Update active step indicator
    document.querySelectorAll(".progress-step-sign").forEach((step) => {
      step.classList.remove("active");
      if (parseInt(step.dataset.step) <= stepNumber) {
        step.classList.add("active");
      }
    });
  }

  function validateStep(stepNumber) {
    let isValid = true;
    let errorMessage = "";

    if (stepNumber === 1) {
      const firstName = document.getElementById("first-name-log").value.trim();
      const lastName = document.getElementById("last-name-log").value.trim();
      const email = document.getElementById("new-email").value.trim();
      const phone = document.getElementById("phone").value.trim();

      // Clear previous errors
      document.getElementById("step1-error").textContent = "";
      document.querySelectorAll("#signup-step1 input").forEach((input) => {
        input.classList.remove("input-error");
      });

      if (!firstName) {
        errorMessage = "First name is required";
        document.getElementById("first-name-log").classList.add("input-error");
        isValid = false;
      }

      if (!lastName) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Last name is required";
        document.getElementById("last-name-log").classList.add("input-error");
        isValid = false;
      }

      if (!email) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Email is required";
        document.getElementById("new-email").classList.add("input-error");
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Please enter a valid email address";
        document.getElementById("new-email").classList.add("input-error");
        isValid = false;
      }

      if (!phone) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Phone number is required";
        document.getElementById("phone").classList.add("input-error");
        isValid = false;
      }

      if (!isValid) {
        document.getElementById("step1-error").textContent = errorMessage;
      }

      return isValid;
    } else if (stepNumber === 2) {
      const password = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Clear previous errors
      document.getElementById("step2-error").textContent = "";
      document.querySelectorAll("#signup-step2 input").forEach((input) => {
        input.classList.remove("input-error");
      });

      if (!password) {
        errorMessage = "Password is required";
        document.getElementById("new-password").classList.add("input-error");
        isValid = false;
      } else if (password.length < 6) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Password must be at least 6 characters long";
        document.getElementById("new-password").classList.add("input-error");
        isValid = false;
      }

      if (!confirmPassword) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Please confirm your password";
        document
          .getElementById("confirm-password")
          .classList.add("input-error");
        isValid = false;
      } else if (password !== confirmPassword) {
        errorMessage = errorMessage ? errorMessage + "\n" : "";
        errorMessage += "Passwords do not match";
        document
          .getElementById("confirm-password")
          .classList.add("input-error");
        isValid = false;
      }

      if (!isValid) {
        document.getElementById("step2-error").textContent = errorMessage;
      }

      return isValid;
    }
    return true;
  }

  function updateProgressBar(stepNumber) {
    const percentage = (stepNumber / 3) * 100;
    document.getElementById("progress-fill").style.width = `${percentage}%`;
  }

  function checkPasswordStrength() {
    const password = document.getElementById("new-password").value;
    const strengthFill = document.getElementById("strength-fill");
    const strengthText = document.getElementById("strength-text");

    // Calculate strength
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Update UI
    const colors = ["#c14907", "#c14907", "#c14907", "#c14907", "#c14907"];
    const texts = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];

    strengthFill.style.width = `${(strength / 4) * 100}%`;
    strengthFill.style.backgroundColor = colors[strength];
    strengthText.textContent = `Password Strength: ${texts[strength]}`;
    strengthText.style.color = colors[strength];
  }

  function showSignInPreloader(show) {
    const preloader = document.getElementById("signin-preloader");
    const signinBtn = document.getElementById("continueGuest");

    if (show) {
      preloader.style.display = "flex";
      signinBtn.style.display = "none";
    } else {
      preloader.style.display = "none";
      signinBtn.style.display = "block";
    }
  }

  function showSignUpPreloader(show) {
    const preloader = document.getElementById("signup-preloader");
    const signupBtn = document.getElementById("signup-btn");
    const backBtn = document.getElementById("back-to-step2");

    if (show) {
      preloader.style.display = "flex";
      if (signupBtn) signupBtn.style.display = "none";
      if (backBtn) backBtn.style.display = "none";
    } else {
      preloader.style.display = "none";
      if (signupBtn) signupBtn.style.display = "block";
      if (backBtn) backBtn.style.display = "block";
    }
  }

  function showSignUpSuccess() {
    document.getElementById("signup-step3").style.display = "none";
    document.getElementById("signup-success").style.display = "block";
  }

  function showSignUpError(message) {
    document.getElementById("signup-step3").style.display = "none";
    document.getElementById("signup-error").style.display = "block";
    document.getElementById("signup-error-message").textContent = message;
  }

  function resetSignUpForm() {
    document.getElementById("signup-step3").style.display = "block";
    document.getElementById("signup-error").style.display = "none";
    clearAllErrors();
  }

  function handleSignIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Clear previous errors
    document.getElementById("signin-error").textContent = "";
    document.getElementById("email").classList.remove("input-error");
    document.getElementById("password").classList.remove("input-error");

    let isValid = true;
    let errorMessage = "";

    if (!email) {
      errorMessage = "Email is required";
      document.getElementById("email").classList.add("input-error");
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorMessage = "Please enter a valid email address";
      document.getElementById("email").classList.add("input-error");
      isValid = false;
    }

    if (!password) {
      errorMessage = errorMessage ? errorMessage + "\n" : "";
      errorMessage += "Password is required";
      document.getElementById("password").classList.add("input-error");
      isValid = false;
    } else if (password.length < 6) {
      errorMessage = errorMessage ? errorMessage + "\n" : "";
      errorMessage += "Password must be at least 6 characters";
      document.getElementById("password").classList.add("input-error");
      isValid = false;
    }

    if (!isValid) {
      document.getElementById("signin-error").textContent = errorMessage;
      return;
    }

    // Show preloader
    showSignInPreloader(true);

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Hide the modal on success
        closesigningModal();

        // Show success message
        Swal.fire({
          icon: "success",
          title: `Signed In Successfully\nWelcome, ${userCredential.user.email}`,
          showConfirmButton: false,
          timer: 3000,
        });

        document.getElementById("email-signin-btn").style.display = "none";
      })
      .catch((error) => {
        // Hide preloader
        showSignInPreloader(false);

        // Show error under the appropriate field
        let userFriendlyMessage = "An error occurred. Please try again.";

        if (error.code === "auth/user-not-found") {
          userFriendlyMessage = "No account found with this email.";
          document.getElementById("email").classList.add("input-error");
        } else if (error.code === "auth/invalid-email") {
          userFriendlyMessage = "Please enter a valid email address.";
          document.getElementById("email").classList.add("input-error");
        } else if (error.code === "auth/wrong-password") {
          userFriendlyMessage = "Incorrect password. Please try again.";
          document.getElementById("password").classList.add("input-error");
        } else {
          userFriendlyMessage = error.message;
          document.getElementById("email").classList.add("input-error");
          document.getElementById("password").classList.add("input-error");
        }

        document.getElementById("signin-error").textContent =
          userFriendlyMessage;
      });
  }

  function handleSignUp() {
    // Validate step 3
    const governorate = document.getElementById("governorate").value;
    const city = document.getElementById("city").value.trim();
    const area = document.getElementById("area").value.trim();
    const houseNumber = document.getElementById("house-number").value.trim();
    const fullAddress = document.getElementById("address").value.trim();

    // Clear previous errors
    document.getElementById("step3-error").textContent = "";
    document
      .querySelectorAll(
        "#signup-step3 input, #signup-step3 select, #signup-step3 textarea"
      )
      .forEach((el) => el.classList.remove("input-error"));

    let isValid = true;
    let errorMessage = "";

    if (!governorate) {
      errorMessage = "Governorate is required";
      document.getElementById("governorate").classList.add("input-error");
      isValid = false;
    }

    if (!city) {
      errorMessage = errorMessage ? errorMessage + "\n" : "";
      errorMessage += "City is required";
      document.getElementById("city").classList.add("input-error");
      isValid = false;
    }

    if (!area) {
      errorMessage = errorMessage ? errorMessage + "\n" : "";
      errorMessage += "Area is required";
      document.getElementById("area").classList.add("input-error");
      isValid = false;
    }

    if (!houseNumber) {
      errorMessage = errorMessage ? errorMessage + "\n" : "";
      errorMessage += "House number is required";
      document.getElementById("house-number").classList.add("input-error");
      isValid = false;
    }

    if (!fullAddress) {
      errorMessage = errorMessage ? errorMessage + "\n" : "";
      errorMessage += "Full address is required";
      document.getElementById("address").classList.add("input-error");
      isValid = false;
    }

    if (!isValid) {
      document.getElementById("step3-error").textContent = errorMessage;
      return;
    }

    // Get values from all steps
    const email = document.getElementById("new-email").value;
    const firstName = document.getElementById("first-name-log").value;
    const lastName = document.getElementById("last-name-log").value;
    const password = document.getElementById("new-password").value;
    const phone = document.getElementById("phone").value;
    const phone2 = document.getElementById("phone2").value;

    // Show preloader and hide other sections
    showSignUpPreloader(true);
    document.getElementById("signup-success").style.display = "none";
    document.getElementById("signup-error").style.display = "none";

    // Disable all form buttons during submission
    const submitButton = document.getElementById("signup-btn");
    submitButton.disabled = true;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return user
          .updateProfile({
            displayName: "Customer",
            photoURL: null,
          })
          .then(() => user.reload())
          .then(() => user.getIdToken())
          .then((idToken) => ({ user, idToken }));
      })
      .then(({ user, idToken }) => {
        const uid = user.uid;

        const userData = {
          personalInfo: {
            email: user.email,
            firstName,
            lastName,
            phone: phone,
            phone2: phone2 || null,
            photoURL: null,
          },
          orders: [],
          favorites: [],
        };

        const addressData = {
          governorate,
          city,
          area,
          houseNumber,
          fullAddress,
        };

        return Promise.all([
          fetch(
            `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/personalInfo.json?auth=${idToken}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData.personalInfo),
            }
          ),
          fetch(
            `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/address.json?auth=${idToken}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(addressData),
            }
          ),
        ]).then(() => user);
      })
      .then((user) => {
        // Hide preloader and show success message
        showSignUpPreloader(false);
        document.getElementById("signup-success").style.display = "block";

        // Hide the form steps and progress container
        document.querySelectorAll(".signup-step").forEach((step) => {
          step.style.display = "none";
        });
        document.querySelector(".progress-container").classList.add("hidden");

        // Hide the email signin button
        document.getElementById("email-signin-btn").style.display = "none";

        // Set up close modal button
        document
          .getElementById("close-modal-btn")
          .addEventListener("click", () => {
            const modal = document.getElementById("signup-modal");
            if (modal) {
              // Use whatever method you use to close modals
              $(modal).modal("hide"); // If using Bootstrap
              // OR your custom hide function
              // hideModal(modal);
            }
          });
      })
      .catch((error) => {
        showSignUpPreloader(false);
        submitButton.disabled = false;

        // Show error message
        document.getElementById("signup-error").style.display = "block";
        const errorMessageEl = document.getElementById("signup-error-message");

        // Hide the progress container
        document.querySelector(".progress-container").classList.add("hidden");

        let userFriendlyMessage = "An error occurred. Please try again.";

        if (error.code === "auth/email-already-in-use") {
          userFriendlyMessage =
            "This email is already in use. Please use a different email.";
        } else if (error.code === "auth/weak-password") {
          userFriendlyMessage =
            "Password is too weak. Please choose a stronger password.";
        } else if (error.code === "auth/invalid-email") {
          userFriendlyMessage = "Please enter a valid email address.";
        }

        errorMessageEl.textContent = userFriendlyMessage;

        // Set up try again button
        document
          .getElementById("try-again-btn")
          .addEventListener("click", () => {
            document.getElementById("signup-error").style.display = "none";
            // Show the form steps and progress container again
            document.querySelectorAll(".signup-step").forEach((step) => {
              step.style.display = "block";
            });
            document
              .querySelector(".progress-container")
              .classList.remove("hidden");
          });
      });
  }

  // Add this event listener when your modal is initialized
  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("signup-modal");
    if (modal) {
      modal.addEventListener("hidden.bs.modal", function () {
        // When modal is closed, show the progress container again
        document
          .querySelector(".progress-container")
          .classList.remove("hidden");
        // Also reset any other necessary UI elements
        document.getElementById("signup-success").style.display = "none";
        document.getElementById("signup-error").style.display = "none";
        document.querySelectorAll(".signup-step").forEach((step) => {
          step.style.display = "block";
        });
      });
    }
  });
}

function closesigningModal() {
  const body = document.body;
  const modal = document.getElementById("signinmodal");
  modal.classList.remove("show");
  body.classList.remove("modal-open");
}
