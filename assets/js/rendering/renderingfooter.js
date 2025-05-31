// Function to render the footer
function renderFooter() {
  const footerHTML = `
    <footer class="footer animate-on-scroll">
      <div class="footer-top section">
        <div class="container">
          <div class="footer-brand">
            <a href="#" class="logo">
              <img src="./assets/images/iicon.svg" width="160" height="50" alt="">
            </a>
            <ul class="social-list hidden">
              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-pinterest"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
            </ul>
          </div>

          <div class="footer-end flex space-around">
            <ul class="footer-list">
              <li class="animate-on-scroll">
                <p class="footer-list-title">Contact Us</p>
              </li>
              <li class="animate-on-scroll">
                <address class="footer-link hidden">
                  <ion-icon name="location"></ion-icon>
                  <span class="footer-link-text">type any addrress</span>
                </address>
              </li>
              <li class="animate-on-scroll">
                <a href="tel:" id="store-call" class="footer-link">
                  <ion-icon name="call"></ion-icon>
                  <span id="store-number" class="footer-link-text"></span>
                </a>
              </li>
              <li class="animate-on-scroll">
                <a href="mailto:" id="store-email-link" class="footer-link">
                  <ion-icon name="mail"></ion-icon>
                  <span id="store-email" class="footer-link-text"></span>
                </a>
              </li>
              <li class="animate-on-scroll">
                <a href="#" class="footer-link" id="report-bug-btn">
                  <ion-icon name="bug"></ion-icon>
                  <span class="footer-link-text">Report a problem or a bug</span>
                </a>
              </li>
            </ul>

            <div class="footer-list">
              <p class="footer-list-title animate-on-scroll">Newsletter</p>
              <p class="newsletter-text animate-on-scroll">
                Send us your email to keeping up with our latest updates..
              </p>
              <form action="" class="newsletter-form animate-on-scroll">
                <input type="email" name="email" required placeholder="Email Address" class="newsletter-input">
                <button type="submit" class="btn2 btn-primary">Subscribe</button>
              </form>
            </div>

            <ul class="footer-list animate-on-scroll">
              <p class="footer-list-title animate-on-scroll">Matager</p>
              <li>
                <a href="https://matager.online/PrivacyPolicy.html" class="footer-link">
                  <span class="footer-link-text">privacy policy</span>
                </a>
              </li>
              <li>
                <a href="https://matager.online/Termsofservice.html" class="footer-link">
                  <span class="footer-link-text">Terms of service</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex center">
        <a href="https://matager.online" target="_blank">
          <img src="./assets/images/powerd by matager black.svg" width="100px">
        </a>
      </div>
    </footer>
  `;

  // Insert into the footer container
  document.getElementById("mainFooter").innerHTML = footerHTML;
}

// Run when page loads
document.addEventListener("DOMContentLoaded", renderFooter);
