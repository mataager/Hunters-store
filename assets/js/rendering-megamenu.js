document.addEventListener("DOMContentLoaded", () => {
  // Hide or show the menu items based on productnavbar and brandsnavbar values
  const productMenu = document.getElementById("megamenu");
  const brandsMenu = document.getElementById("brandsmenu");

  if (!productnavbar.includes("yes")) {
    productMenu.classList.add("hidden");
  }

  if (!brandsnavbar.includes("yes")) {
    brandsMenu.classList.add("hidden");
  }

  // Function to handle menu toggle behavior
  function setupMenuToggle(menuId, buttonId) {
    const navbarItem = document.getElementById(menuId);
    const toggleButton = document.getElementById(buttonId);

    if (!navbarItem || !toggleButton) return;

    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation();
      navbarItem.classList.toggle("active");

      if (navbarItem.classList.contains("active")) {
        toggleButton.classList.add("rotate-360");
        toggleButton.classList.remove("rotate-back");
        toggleButton.innerHTML = '<i class="bi bi-dash"></i>';
      } else {
        toggleButton.classList.add("rotate-back");
        toggleButton.classList.remove("rotate-360");
        toggleButton.innerHTML = '<i class="bi bi-plus"></i>';
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbarItem.contains(e.target) && !toggleButton.contains(e.target)) {
        navbarItem.classList.remove("active");
        toggleButton.classList.remove("rotate-360");
        toggleButton.classList.add("rotate-back");
        toggleButton.innerHTML = '<i class="bi bi-plus"></i>';
      }
    });
  }

  // Setup both menus
  setupMenuToggle("megamenu", "open-category");
  setupMenuToggle("brandsmenu", "open-brands");
});

//

//rendring megamenu
const showMen = storeGender.includes("Men");
const showWomen = storeGender.includes("Women");
const showKids = storeGender.includes("Kids");
function renderMegaMenu() {
  const megaMenu = document.getElementById("mega-menu");
  megaMenu.innerHTML = `
    <div class="flex center">
      <p class="m-5 pointer underline ${
        showMen ? "" : "hidden"
      }" id="men-label">Men</p>
      <p class="m-5 pointer underline ${
        showWomen ? "" : "hidden"
      }" id="women-label">Women</p>
      <p class="m-5 pointer underline ${
        showKids ? "" : "hidden"
      }" id="kids-label">Kids</p>
    </div>
    <div class="flex col-u-991 hidden ${showMen ? "" : "hidden"}" id="men-menu">
      <div class="menu-category">
        <h4>Top</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=T-Shirt')">T-Shirts</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Polo-Shirt')">Polo-shirt</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Shirt')">Shirt</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Tank-top')">Tank-top</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Sweatshirt')">Sweatshirt</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Hoodie')">Hoodie</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Jacket')">Jacket</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Pullover')">Pullover</a></li>
        </ul>
      </div>
      <div class="menu-category">
        <h4>Bottom</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Trousers')">Trousers</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Jeans')">Jeans</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Jogger')">Jogger</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Sweatpants')">Sweatpants</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Short')">Short</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Swimwear')">Swimwear</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Socks')">Socks</a></li>
        </ul>
      </div>
      <div class="menu-category">
        <h4>Footwear</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Shoes')">Shoes</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Slipper')">Slipper</a></li>
        </ul>
      </div>
      <div class="menu-category">
        <h4>Accessories</h4>
        <ul>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Belts')">Belts</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Caps')">Caps</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Hats')">Hats</a></li>
          <li><a onclick="changeFrameSrc('./Category.html?&category=men&piece=Watches')">Watches</a></li>
        </ul>
      </div>
    </div>
    <div class="flex col-u-991 hidden ${
      showWomen ? "" : "hidden"
    }" id="women-menu">
      <div class="menu-category">
    <h4>Top</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=T-Shirt')">T-Shirts</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Polo-Shirt')">Polo-shirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Shirt')">Shirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Tank-top')">Tank-top</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Sweatshirt')">Sweatshirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Hoodie')">Hoodie</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Jacket')">Jacket</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Pullover')">Pullover</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>Bottom</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Trousers')">Trousers</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Jeans')">Jeans</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Jogger')">Jogger</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Sweatpants')">Sweatpants</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Skirt')">Skirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Short')">Short</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Swimwear')">Swimwear</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Socks')">Socks</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>body suits</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Dress')">Dress</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Pyjama')">Pyjama</a>
        </li>
         <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=lingerie')">lingerie</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Borkeni')">Borkeni</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>Footwear</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Shoes')">Shoes</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Heels')">Heels</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Slipper')">Slipper</a>
        </li>
    </ul>
</div>
<div class="menu-category">
    <h4>Accessories</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Belts')">Belts</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Caps')">Caps</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Hats')">Hats</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=women&piece=Watches')">Watches</a></li>
    </ul>
</div>
    </div>
    <div class="flex col-u-991 hidden ${
      showKids ? "" : "hidden"
    }" id="kids-menu">
      <div class="menu-category">
    <h4>Top</h4>
    <ul>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=T-Shirt')">T-Shirts</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Polo-Shirt')">Polo-shirt</a>
        </li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Shirt')">Shirt</a></li>
        <li><a href="#">Tank-top</a></li>
        <li><a href="#">Sweatshirt</a></li>
        <li><a href="#">Hoodie</a></li>
        <li><a href="#">Jacket</a></li>
        <li><a href="#">Pullover</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>Bottom</h4>
    <ul>
        <li><a href="#">Trousers</a></li>
        <li><a href="#">Jeans</a></li>
        <li><a href="#">Jogger</a></li>
        <li><a href="#">Sweatpants</a></li>
        <li><a href="#">Short</a></li>
        <li><a href="#">Swimwear</a></li>
        <li><a href="#">Socks</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>Pajamas</h4>
    <ul>
        <li><a href="#">Boy’s Pajamas</a></li>
        <li><a href="#">Girl’s Pajamas</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>New Born</h4>
    <ul>
        <li><a href="#">Baby Showers</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Bodysuits')">Bodysuits</a></li>
        <li><a onclick="changeFrameSrc('./Category.html?&category=kids&piece=Rompers')">Rompers</a></li>
    </ul>
</div>

<div class="menu-category">
    <h4>Footwear</h4>
    <ul>
        <li><a href="#">Shoes</a></li>
        <li><a href="#">Slipper</a></li>
    </ul>
</div>
<div class="menu-category">
    <h4>Accessories</h4>
    <ul>
        <li><a href="#">Belts</a></li>
        <li><a href="#">Caps</a></li>
        <li><a href="#">Hats</a></li>
        <li><a href="#">Watches</a></li>
    </ul>
</div>
    </div>
  `;
}
// Call the function to render the menu
renderMegaMenu();

//

// rendering brands
const brandsData = [
  {
    name: "Nike",
    logo: "https://cdn.worldvectorlogo.com/logos/nike-11.svg",
  },
  {
    name: "Adidas",
    logo: "https://www.svgrepo.com/show/329847/adidas.svg",
  },
  {
    name: "On Cloud",
    logo: "https://images.seeklogo.com/logo-png/51/1/on-running-logo-png_seeklogo-510256.png",
  },
  {
    name: "Puma",
    logo: "https://www.svgrepo.com/show/303470/puma-logo-logo.svg",
  },
  {
    name: "Jordan",
    logo: "https://www.svgrepo.com/show/303555/jordan-air-logo.svg",
  },
  {
    name: "ASICS",
    logo: "https://cdn.worldvectorlogo.com/logos/asics-6.svg",
  },
  {
    name: "Golden Goose",
    logo: "https://cdn.freelogovectors.net/wp-content/uploads/2023/03/golden-goose-logo-freelogovectors.net_.png",
  },
  {
    name: "New Balance",
    logo: "https://cdn.worldvectorlogo.com/logos/new-balance-2.svg",
  },
  {
    name: "Onitsuka Tiger",
    logo: "https://cdn.worldvectorlogo.com/logos/onitsuka-tiger-1.svg",
  },
  {
    name: "UGG",
    logo: "https://cdn.worldvectorlogo.com/logos/ugg-australia.svg",
  },
  {
    name: "Vans",
    logo: "https://cdn.worldvectorlogo.com/logos/vans-3.svg",
  },
  {
    name: "Valentino",
    logo: "https://cdn.worldvectorlogo.com/logos/valentino-1.svg",
  },
];

// brands-menu.js
document.addEventListener("DOMContentLoaded", () => {
  const brandsMenu = document.getElementById("brands-mega-menu");

  // Create menu structure
  brandsMenu.innerHTML = `
    
      <div class="flex col-u-991" id="brands-categories-container">
        <!-- Categories will be generated here -->
      </div>
    
  `;

  // Group brands into categories (3 brands per column)
  const categories = [];
  for (let i = 0; i < brandsData.length; i += 3) {
    categories.push(brandsData.slice(i, i + 3));
  }

  // Generate categories HTML
  const categoriesContainer = document.getElementById(
    "brands-categories-container"
  );
  categories.forEach((categoryBrands, index) => {
    const categoryElement = document.createElement("div");
    categoryElement.className = "menu-category";

    const listHTML = categoryBrands
      .map(
        (brand) => `
      <li>
        <img width="20px" src="${brand.logo}" alt="${brand.name}">
        <a href="#" onclick="brand('${brand.name}')">${brand.name}</a>
      </li>
    `
      )
      .join("");

    categoryElement.innerHTML = `<ul>${listHTML}</ul>`;
    categoriesContainer.appendChild(categoryElement);
  });

  // Add toggle functionality
  const toggleButton = document.getElementById("open-brands");

  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    brandsMenu.classList.toggle("active");

    if (brandsMenu.classList.contains("active")) {
      toggleButton.classList.add("rotate-360");
      toggleButton.classList.remove("rotate-back");
      toggleButton.innerHTML = '<i class="bi bi-dash"></i>';
    } else {
      toggleButton.classList.add("rotate-back");
      toggleButton.classList.remove("rotate-360");
      toggleButton.innerHTML = '<i class="bi bi-plus"></i>';
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!brandsMenu.contains(e.target)) {
      brandsMenu.classList.remove("active");
      toggleButton.classList.remove("rotate-360");
      toggleButton.classList.add("rotate-back");
      toggleButton.innerHTML = '<i class="bi bi-plus"></i>';
    }
  });
});
//
