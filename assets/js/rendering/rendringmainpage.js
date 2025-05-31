//    <header class="header" data-header="">
//         <div class="header__bar">Free Shipping On Orders Over <div class="m-x-3" id="free-shipping"></div> EGP</div>
//         <div class="container">

//             <div class="overlay" data-overlay=""></div>

//             <a href="./index.html" class="logo">
//                 <img src="./assets/images/iicon.svg" width="160" height="50" alt="">
//             </a>

//             <button class="nav-open-btn" data-nav-open-btn="" aria-label="Open Menu">
//                 <ion-icon name="menu-outline" role="img" class="md hydrated" aria-label="menu outline"></ion-icon>
//             </button>

//             <nav class="navbar" data-navbar="">

//                 <button class="nav-close-btn black-font" data-nav-close-btn="" aria-label="Close Menu">
//                     <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
//                 </button>

//                 <a href="#" class="logo bg-white">
//                     <img src="./assets/images/iicon.svg" width="190" height="50" alt="">
//                 </a>

//                 <ul class="navbar-list">

//                     <li class="navbar-item">
//                         <a href="#" class="navbar-link" onclick="changeFrameSrc('index.html')">Home</a>
//                     </li>

//                     <!-- /mega menus & brands menu/ -->

//                     <li class="navbar-item" id="megamenu" data-mega-menu>
//                         <div class="flex align-items justify-content-space-between">
//                             <a href="#" class="navbar-link" onclick="changeFrameSrc('Products.html')">Products</a>
//                             <a id="open-category" class="rotate open-category open-category-btn">
//                                 <i class="bi bi-plus"></i>
//                             </a>
//                         </div>
//                         <div class="mega-menu flex-direction-column" id="mega-menu">
//                             <!-- Products content will go here -->
//                         </div>
//                     </li>

//                     <li class="navbar-item" id="brandsmenu" data-mega-menu>
//                         <div class="flex align-items justify-content-space-between">
//                             <a href="#" class="navbar-link" onclick="changeFrameSrc('Products.html')">Brands</a>
//                             <a id="open-brands" class="rotate open-category open-category-btn">
//                                 <i class="bi bi-plus"></i>
//                             </a>
//                         </div>
//                         <div class="mega-menu flex-direction-column" id="brands-mega-menu">
//                             <!-- Brands content will go here -->
//                         </div>
//                     </li>

//                     <!--  -->

//                     <li class="navbar-item">
//                         <a href="#" class="navbar-link red-txt" onclick="changeFrameSrc('sale.html')">Sale</a>
//                     </li>

//                     <li class="navbar-item">
//                         <a href="#" class="navbar-link" onclick="changeFrameSrc('Contact.html')">Contact</a>
//                     </li>
//                 </ul>
//                 <ul class="nav-action-list">

//                     <li class="li-action" id="search-li">
//                     </li>
//                     <li class="navbar-item li-action">
//                         <button class="nav-action-btn" onclick="changeFrameSrc('Cart.html')">
//                             <ion-icon name="bag-outline" aria-hidden="true" role="img" class="md hydrated"></ion-icon>
//                             <data class="nav-action-text">Basket: <strong class="cart-amount" id="cart-amount">0
//                                     E£</strong></data>
//                             <data id="cartItemCount" class="nav-action-badge" aria-hidden="true">0</data>
//                         </button>
//                     </li>

//                     <li class="navbar-item li-action">
//                         <button class="nav-action-btn" onclick="changeFrameSrc('account.html')">
//                             <ion-icon name="person-outline"></ion-icon>
//                             <span class="nav-action-text">Account</span>
//                         </button>
//                     </li>
//                     <li>
//                         <button class="nav-action-btn hidden">
//                             <ion-icon name="heart-outline" aria-hidden="true" role="img" class="md hydrated"></ion-icon>

//                             <span class="nav-action-text">Wishlist</span>

//                             <data class="nav-action-badge" value="5" aria-hidden="true">5</data>
//                         </button>
//                     </li>
//                 </ul>

//             </nav>

//         </div>
//     </header>
//     <div>
//         <div class="preloader" id="preloader">
//             <img src="favicon.png" alt="Your Image" width="40" height="40">
//             <div class="loader"></div>
//         </div>
//         <article id="mainpage">

//             <section class="section hero" id="panner-img">
//                 <div class="container">

//                     <h2 class="h1 hero-title white-font">
//                         New Summer <strong>Clothes Collection</strong>
//                     </h2>

//                     <p class="hero-text white-font">
//                         Our commitment to quality ensures that each piece you purchase is crafted from the finest
//                         materials,
//                         offering unmatched
//                         comfort and durability.
//                     </p>
//                     <a href="./Products.html">
//                         <button class="btn-shopnow">
//                             <span>Shop Now</span>

//                             <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                 class="md hydrated"></ion-icon>
//                         </button>
//                     </a>

//                 </div>

//             </section>

//             <div>
//                 <div id="men-area" class="hidden">
//                     <section class="mt-40 flex flex-wrap">

//                         <div class="collection-card height-200 width-available m-20 pointer" id="mencollection-img"
//                             onclick="changeFrameSrc('./Category.html?category=men')">
//                             <h3 class="h4 card-title white-font">men Collections</h3>
//                             <a href="./Category.html?category=men" type="men" class="btn btn-secondary2 mt-10">
//                                 <span>Explore All</span>

//                                 <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                     class="md hydrated"></ion-icon>
//                             </a>
//                         </div>
//                     </section>

//                     <section class="section collection">
//                         <div class="container">

//                             <ul class="collection-list has-scrollbar">
//                                 <li>

//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-top-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&type=Top')">
//                                         <h3 class="h4 card-title card-title-Category">Tops Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&type=Top" type="Tops"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-bottom-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&type=Bottom')">
//                                         <h3 class="h4 card-title card-title-Category">Bottoms Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&type=Bottom" type="Bottoms"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-footware-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&type=Footwear')">
//                                         <h3 class="h4 card-title card-title-Category">FootWare Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&type=Footwear" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>

//                             </ul>
//                         </div>
//                     </section>
//                 </div>
//                 <div id="men-footware-area" class="hidden">
//                     <section class="section collection py-50 px-20">
//                         <div class="container flex">
//                             <div class="flex flex-direction-column center p-10">
//                                 <h4 class="h4 card-title card-title-Category">Men Collection</h4>
//                                 <a href="./Category.html?&category=men&type=Footwear" type="Shoses"
//                                     class="btn btn-secondary btn-secondary-sm btn-explore mt-10 fit-content">
//                                     <span>Explore All</span>

//                                     <ion-icon name="arrow-forward-outline" size="small" aria-hidden="true" role="img"
//                                         class="md hydrated"></ion-icon>
//                                 </a>
//                             </div>

//                             <ul class="collection-list has-scrollbar">

//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-shoses-img"
//                                         id="men-Shoses-Collections"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=Shoes')">
//                                         <h3 class="h4 card-title card-title-Category">Shoses Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=Shoes" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-slippers-img"
//                                         id="men-Slippers-Collections"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=Slipper')">
//                                         <h3 class="h4 card-title card-title-Category">Slippers Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=Slipper" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="men-Flip-Flop-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=Flip-Flop')">
//                                         <h3 class="h4 card-title card-title-Category">Flip Flops Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=Flip-Flop" type="Flip-Flop"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-sandal-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=Sandal')">
//                                         <h3 class="h4 card-title card-title-Category">Sandals Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=Sandal" type="Sandal"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-Loafers-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=Loafers')">
//                                         <h3 class="h4 card-title card-title-Category">Loafers Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=Loafers" type="Loafers"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="men-moccasins-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=Moccasins')">
//                                         <h3 class="h4 card-title card-title-Category">Moccasins Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=Moccasins" type="moccasins"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="men-classic-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=men&piece=classic')">
//                                         <h3 class="h4 card-title card-title-Category">Classic Shoes Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=men&piece=classic" type="classic"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </section>
//                 </div>

//                 <div id="women-area" class="hidden">
//                     <section class="mt-40 flex flex-wrap">
//                         <div class="collection-card height-200 width-available m-20 pointer" id="womencollection-img"
//                             onclick="changeFrameSrc('./Category.html?category=women')">
//                             <h3 class="h4 card-title white-font">Women Collections</h3>

//                             <a href="./Category.html?category=women" type="Women" class="btn btn-secondary2 mt-10">
//                                 <span>Explore All</span>

//                                 <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                     class="md hydrated"></ion-icon>
//                             </a>
//                         </div>

//                     </section>
//                     <section class="section collection">
//                         <div class="container">
//                             <ul class="collection-list has-scrollbar">

//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="women-top-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&type=Top')">
//                                         <h3 class="h4 card-title card-title-Category">Tops Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&type=Top" type="Tops"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>
//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>

//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="women-bottom-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&type=Bottom')">
//                                         <h3 class="h4 card-title card-title-Category">Bottoms Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&type=Bottom" type="Bottoms"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="women-footware-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&type=Footwear')">
//                                         <h3 class="h4 card-title card-title-Category">FootWare Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&type=Footwear" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </section>
//                 </div>
//                 <div id="women-footware-area" class="hidden">
//                     <section class="section collection py-50 px-20">
//                         <div class="container flex ">
//                             <div class="flex flex-direction-column center p-10">
//                                 <h4 class="h4 card-title card-title-Category">Women Collection</h4>
//                                 <a href="./Category.html?&category=women&type=Footwear" type="Shoses"
//                                     class="btn btn-secondary btn-secondary-sm btn-explore mt-10 fit-content">
//                                     <span>Explore All</span>

//                                     <ion-icon name="arrow-forward-outline" size="small" aria-hidden="true" role="img"
//                                         class="md hydrated"></ion-icon>
//                                 </a>
//                             </div>
//                             <ul class="collection-list has-scrollbar ">
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="women-shoses-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Shoes')">
//                                         <h3 class="h4 card-title card-title-Category">Shoses Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Shoes" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="women-slippers-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Slipper')">
//                                         <h3 class="h4 card-title card-title-Category">Slippers Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Slipper" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="women-Flip-Flop-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Flip-Flop')">
//                                         <h3 class="h4 card-title card-title-Category">Flip Flops Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Flip-Flop" type="Flip-Flop"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="women-sandal-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Sandal')">
//                                         <h3 class="h4 card-title card-title-Category">Sandals Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Sandal" type="Sandal"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="women-heels-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Heels')">
//                                         <h3 class="h4 card-title card-title-Category">Heels Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Heels" type="Sandal"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="women-Loafers-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Loafers')">
//                                         <h3 class="h4 card-title card-title-Category">Loafers Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Loafers" type="Loafers"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="women-moccasins-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=women&piece=Moccasins')">
//                                         <h3 class="h4 card-title card-title-Category">Moccasins Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=women&piece=Moccasins" type="moccasins"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </section>
//                 </div>

//                 <div id="kids-area" class="hidden">
//                     <section class="mt-40 flex flex-wrap">
//                         <div class="collection-card height-200 width-available m-20 pointer" id="kidscollection-img"
//                             onclick="changeFrameSrc('./Category.html?category=kids')">
//                             <h3 class="h4 card-title white-font">Kids Collections</h3>

//                             <a href="./Category.html?category=kids" type="Kids" class="btn btn-secondary2 mt-10">
//                                 <span>Explore All</span>

//                                 <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                     class="md hydrated"></ion-icon>
//                             </a>
//                         </div>

//                     </section>

//                     <section class="section collection">
//                         <div class="container">
//                             <ul class="collection-list has-scrollbar">

//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="kids-top-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&type=Top')">
//                                         <h3 class="h4 card-title card-title-Category">Tops Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&type=Top" type="Tops"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>

//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="kids-bottom-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&type=Bottom')">
//                                         <h3 class="h4 card-title card-title-Category">Bottoms Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&type=Bottom" type="Bottoms"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="kids-footware-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&type=Footwear')">
//                                         <h3 class="h4 card-title card-title-Category">FootWare Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&type=Footwear" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </section>
//                 </div>
//                 <div id="kids-footware-area" class="hidden">
//                     <section class="section collection py-50 px-20">
//                         <div class="container flex">
//                             <div class="flex flex-direction-column center p-10">
//                                 <h4 class="h4 card-title card-title-Category">Kids Collection</h4>
//                                 <a href="./Category.html?&category=kids&type=Footwear" type="Shoses"
//                                     class="btn btn-secondary btn-secondary-sm btn-explore mt-10 fit-content">
//                                     <span>Explore All</span>

//                                     <ion-icon name="arrow-forward-outline" size="small" aria-hidden="true" role="img"
//                                         class="md hydrated"></ion-icon>
//                                 </a>
//                             </div>

//                             <ul class="collection-list has-scrollbar">
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="kids-shoses-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&piece=Shoes')">
//                                         <h3 class="h4 card-title card-title-Category">Shoses Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&piece=Shoes" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer"
//                                         id="kids-slippers-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&piece=Slipper')">
//                                         <h3 class="h4 card-title card-title-Category">Slippers Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&piece=Slipper" type="Shoses"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="kids-sandal-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&piece=Sandal')">
//                                         <h3 class="h4 card-title card-title-Category">Sandals Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&piece=Sandal" type="Sandal"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <div class="collection-card height-400 flex-start p-0 pointer" id="kids-boots-img"
//                                         onclick="changeFrameSrc('./Category.html?&category=kids&piece=Boots')">
//                                         <h3 class="h4 card-title card-title-Category">Boots Collections</h3>
//                                     </div>
//                                     <a href="./Category.html?&category=kids&piece=Boots" type="Sandal"
//                                         class="btn btn-secondary btn-explore mt-10 fit-content">
//                                         <span>Explore All</span>

//                                         <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
//                                             class="md hydrated"></ion-icon>
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </section>
//                 </div>
//             </div>

//             <div class="scroll-container flex space-around height-max" id="piece-choose">
//                 <div class="flex center align-items m-20 shop-by-piece">
//                     <h4>Shop By Piece</h4>
//                 </div>

//                 <div class="scroll-container ">
//                     <a href="./Category.html?piece=T-Shirt">
//                         <div class="scroll-item"
//                             style="background-image: url('https://i.imgur.com/0sakCXs_d.webp?maxwidth=760&fidelity=grand');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 T-shirts
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Polo-Shirt">
//                         <div class="scroll-item" style="background-image: url('https://i.imgur.com/AdMd7Ls.jpeg');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Polo Shirt
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Jeans">
//                         <div class="scroll-item"
//                             style="background-image: url('https://i.imgur.com/mncaF0c_d.webp?maxwidth=760&fidelity=grand');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Jeans
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Short">
//                         <div class="scroll-item"
//                             style="background-image: url('https://i.imgur.com/ErdoQyD_d.webp?maxwidth=760&fidelity=grand');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Shorts
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Shirt">
//                         <div class="scroll-item"
//                             style="background-image: url('https://i.imgur.com/Znqhncx_d.webp?maxwidth=760&fidelity=grand');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Shirts
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Hoodie">
//                         <div class="scroll-item" style="background-image: url('https://i.imgur.com/389Wcvs.jpeg');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Hoodies
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Sweatshirt">
//                         <div class="scroll-item" style="background-image: url('https://i.imgur.com/dOfWBwl.jpeg');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Sweat Shirt
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Jacket">
//                         <div class="scroll-item" style="background-image: url('https://i.imgur.com/3jDvg2e.jpeg');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Jackets
//                             </div>
//                         </div>
//                     </a>
//                     </a>
//                     <a href="./Category.html?piece=Swimwear">
//                         <div class="scroll-item"
//                             style="background-image: url('https://i.imgur.com/xzdoYtt_d.webp?maxwidth=760&fidelity=grand');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Swim Wear
//                             </div>
//                         </div>
//                     </a>
//                     <a href="./Category.html?piece=Underwear">
//                         <div class="scroll-item"
//                             style="background-image: url('https://i.imgur.com/iEoH0Vs_d.webp?maxwidth=760&fidelity=grand');">
//                             <div class="overlay-category">
//                                 <i class="bi bi-arrow-right-short"></i>
//                                 Underwear
//                             </div>
//                         </div>
//                     </a>

//                 </div>

//                 <!-- Add more items as needed -->

//             </div>

//             <section class="section product">
//                 <div class="container">

//                     <h2 class="h2 section-title">FEATURED PRODUCTS</h2>

//                     <ul class="product-overview">

//                     </ul>

//                     <div class="flex center align-items m-50">
//                         <button id="more_product" class="cus-btn show-all-btn " onclick="more_product()">Show All
//                             <i class="bi bi-plus"></i>
//                         </button>
//                     </div>

//                 </div>
//             </section>

//             <section class="section special new-arri">
//                 <div class="container">

//                     <div class="special-banner center" id="new-arrival-img">
//                         <h2 id="new-arrival-title" class="h3 banner-title"></h2>
//                     </div>

//                     <div class="special-product">

//                         <h2 class="h2 section-title">
//                             <span class="text">New Arrivalls</span>

//                             <span class="line"></span>
//                         </h2>

//                         <ul class="has-scrollbar" id="NewArrivalls">

//                         </ul>

//                     </div>

//                 </div>
//             </section>

//             <div class="sale-animation-bar">
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>
//                 <span class="sale-animation-txt">SALE</span>

//                 <!-- Duplicate for continuous effect -->
//             </div>
//             <section class="section special sales-div">
//                 <div class="container flex-direction-row-rev">

//                     <div class="special-banner center" id="sale-img">
//                         <h2 id="Sale-title" class="h3 banner-title"></h2>

//                     </div>

//                     <div class="special-product">

//                         <h2 class="h2 section-title flex-direction-row-rev">
//                             <span class="text">Sale</span>

//                             <span class="line"></span>
//                         </h2>

//                         <ul class="has-scrollbar flex-direction-row-rev" id="Sale">

//                         </ul>

//                     </div>

//                 </div>
//             </section>
//             <div class="sale-animation-bar">
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>
//                 <span class="sale-animation-txt-reversed">SALE</span>

//                 <!-- Duplicate for continuous effect -->
//             </div>

//         </article>
//     </div>
//     <div class="modal">

//         <div class="modal-content">

//         </div>

//     </div>
//     <div id="modal-fav" class="modal">
//         <div id="modal-fav-content" class="fav-modal-content">

//         </div>
//     </div>
//     <footer class="footer">

//         <div class="footer-top section">
//             <div class="container">

//                 <div class="footer-brand">

//                     <a href="#" class="logo">
//                         <img src="./assets/images/iicon.svg" width="160" height="50" alt="">
//                     </a>

//                     <ul class="social-list hidden">

//                         <li>
//                             <a href="#" class="social-link">
//                                 <ion-icon name="logo-facebook" role="img" class="md hydrated"
//                                     aria-label="logo facebook"></ion-icon>
//                             </a>
//                         </li>

//                         <li>
//                             <a href="#" class="social-link">
//                                 <ion-icon name="logo-twitter" role="img" class="md hydrated"
//                                     aria-label="logo twitter"></ion-icon>
//                             </a>
//                         </li>

//                         <li>
//                             <a href="#" class="social-link">
//                                 <ion-icon name="logo-pinterest" role="img" class="md hydrated"
//                                     aria-label="logo pinterest"></ion-icon>
//                             </a>
//                         </li>

//                         <li>
//                             <a href="#" class="social-link">
//                                 <ion-icon name="logo-linkedin" role="img" class="md hydrated"
//                                     aria-label="logo linkedin"></ion-icon>
//                             </a>
//                         </li>

//                     </ul>

//                 </div>

//                 <div class="footer-end flex space-around">

//                     <ul class="footer-list">

//                         <li>
//                             <p class="footer-list-title">Contact Us</p>
//                         </li>

//                         <li>
//                             <address class="footer-link hidden">
//                                 <ion-icon name="location" role="img" class="md hydrated"
//                                     aria-label="location"></ion-icon>

//                                 <span class="footer-link-text">
//                                     type any addrress
//                                 </span>
//                             </address>
//                         </li>

//                         <li>
//                             <a href="tel:" id="store-call" class="footer-link">
//                                 <ion-icon name="call" role="img" class="md hydrated" aria-label="call"></ion-icon>
//                                 <span id="store-number" class="footer-link-text"></span>
//                             </a>
//                         </li>

//                         <li>
//                             <a href="mailto:" id="store-email-link" class="footer-link">
//                                 <ion-icon name="mail" role="img" class="md hydrated" aria-label="mail"></ion-icon>
//                                 <span id="store-email" class="footer-link-text"></span>
//                             </a>
//                         </li>

//                         <li>
//                             <a href="#" class="footer-link" id="report-bug-btn">
//                                 <ion-icon name="bug"></ion-icon>
//                                 <span class="footer-link-text">Report a problem or a bug</span>
//                             </a>
//                         </li>

//                     </ul>

//                     <div class="footer-list">

//                         <p class="footer-list-title">Newsletter</p>

//                         <p class="newsletter-text">
//                             Send us your email to keeping up with our latest updates..
//                         </p>

//                         <form action="" class="newsletter-form">
//                             <input type="email" name="email" required="" placeholder="Email Address"
//                                 class="newsletter-input">

//                             <button type="submit" class="btn2 btn-primary">Subscribe</button>
//                         </form>

//                     </div>

//                     <ul class="footer-list">
//                         <p class="footer-list-title">Matager</p>
//                         <li>
//                             <a href="https://matager.online/PrivacyPolicy.html" class="footer-link">
//                                 <span class="footer-link-text">privacy policy</span>
//                             </a>
//                         </li>
//                         <li>
//                             <a href="https://matager.online/Termsofservice.html" class="footer-link">
//                                 <span class="footer-link-text">Terms of service</span>
//                             </a>
//                         </li>
//                     </ul>

//                 </div>

//             </div>
//         </div>
//         <div class="flex center">
//             <a href="https://matager.online" target="_blank">
//                 <img src="./assets/images/powerd by matager black.svg" width="100px">
//             </a>
//         </div>

//     </footer>

//     <a href="#top" class="go-top-btn" data-go-top="">
//         <ion-icon name="arrow-up-outline" role="img" class="md hydrated" aria-label="arrow up outline"></ion-icon>
//     </a>

// Self-executing function that runs when page loads
(function autoRenderContent() {
  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    // Get the target element
    const mainPageArea = document.getElementById("mainpagearea");

    if (!mainPageArea) {
      console.error("Could not find #mainpagearea element");
      return;
    }

    // Create and append content automatically
    mainPageArea.innerHTML = `
       <header class="header" data-header="">
        <div class="header__bar">Free Shipping On Orders Over <div class="m-x-3" id="free-shipping"></div> EGP</div>
        <div class="container">

            <div class="overlay" data-overlay=""></div>

            <a href="./index.html" class="logo">
                <img src="./assets/images/iicon.svg" width="160" height="50" alt="">
            </a>

            <button class="nav-open-btn" data-nav-open-btn="" aria-label="Open Menu">
                <ion-icon name="menu-outline" role="img" class="md hydrated" aria-label="menu outline"></ion-icon>
            </button>

            <nav class="navbar" data-navbar="">

                <button class="nav-close-btn black-font" data-nav-close-btn="" aria-label="Close Menu">
                    <ion-icon name="close-outline" role="img" class="md hydrated" aria-label="close outline"></ion-icon>
                </button>

                <a href="#" class="logo bg-white">
                    <img src="./assets/images/iicon.svg" width="190" height="50" alt="">
                </a>

                <ul class="navbar-list">

                    <li class="navbar-item">
                        <a href="#" class="navbar-link" onclick="changeFrameSrc('index.html')">Home</a>
                    </li>

                    <!-- /mega menus & brands menu/ -->

                    <li class="navbar-item" id="megamenu" data-mega-menu>
                        <div class="flex align-items justify-content-space-between">
                            <a href="#" class="navbar-link" onclick="changeFrameSrc('Products.html')">Products</a>
                            <a id="open-category" class="rotate open-category open-category-btn">
                                <i class="bi bi-plus"></i>
                            </a>
                        </div>
                        <div class="mega-menu flex-direction-column" id="mega-menu">
                            <!-- Products content will go here -->
                        </div>
                    </li>

                    <li class="navbar-item" id="brandsmenu" data-mega-menu>
                        <div class="flex align-items justify-content-space-between">
                            <a href="#" class="navbar-link" onclick="changeFrameSrc('Products.html')">Brands</a>
                            <a id="open-brands" class="rotate open-category open-category-btn">
                                <i class="bi bi-plus"></i>
                            </a>
                        </div>
                        <div class="mega-menu flex-direction-column" id="brands-mega-menu">
                            <!-- Brands content will go here -->
                        </div>
                    </li>

                    <!--  -->

                    <li class="navbar-item">
                        <a href="#" class="navbar-link red-txt" onclick="changeFrameSrc('sale.html')">Sale</a>
                    </li>

                    <li class="navbar-item">
                        <a href="#" class="navbar-link" onclick="changeFrameSrc('Contact.html')">Contact</a>
                    </li>
                </ul>
                <ul class="nav-action-list">

                    <li class="li-action" id="search-li">
                    </li>
                    <li class="navbar-item li-action">
                        <button class="nav-action-btn" onclick="changeFrameSrc('Cart.html')">
                            <ion-icon name="bag-outline" aria-hidden="true" role="img" class="md hydrated"></ion-icon>
                            <data class="nav-action-text">Basket: <strong class="cart-amount" id="cart-amount">0
                                    E£</strong></data>
                            <data id="cartItemCount" class="nav-action-badge" aria-hidden="true">0</data>
                        </button>
                    </li>

                    <li class="navbar-item li-action">
                        <button class="nav-action-btn" onclick="changeFrameSrc('account.html')">
                            <ion-icon name="person-outline"></ion-icon>
                            <span class="nav-action-text">Account</span>
                        </button>
                    </li>
                    <li>
                        <button class="nav-action-btn hidden">
                            <ion-icon name="heart-outline" aria-hidden="true" role="img" class="md hydrated"></ion-icon>

                            <span class="nav-action-text">Wishlist</span>

                            <data class="nav-action-badge" value="5" aria-hidden="true">5</data>
                        </button>
                    </li>
                </ul>

            </nav>

        </div>
    </header>
    <div>
        <div class="preloader" id="preloader">
            <img src="favicon.png" alt="Your Image" width="40" height="40">
            <div class="loader"></div>
        </div>
        <article id="mainpage">

            <section class="section hero" id="panner-img">
                <div class="container">

                    <h2 class="h1 hero-title white-font">
                        New Summer <strong>Clothes Collection</strong>
                    </h2>

                    <p class="hero-text white-font">
                        Our commitment to quality ensures that each piece you purchase is crafted from the finest
                        materials,
                        offering unmatched
                        comfort and durability.
                    </p>
                    <a href="./Products.html">
                        <button class="btn-shopnow">
                            <span>Shop Now</span>

                            <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                class="md hydrated"></ion-icon>
                        </button>
                    </a>

                </div>

            </section>

            <div>
                <div id="men-area" class="hidden">
                    <section class="mt-40 flex flex-wrap">

                        <div class="collection-card height-200 width-available m-20 pointer" id="mencollection-img"
                            onclick="changeFrameSrc('./Category.html?category=men')">
                            <h3 class="h4 card-title white-font">men Collections</h3>
                            <a href="./Category.html?category=men" type="men" class="btn btn-secondary2 mt-10">
                                <span>Explore All</span>

                                <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                    class="md hydrated"></ion-icon>
                            </a>
                        </div>
                    </section>

                    <section class="section collection">
                        <div class="container">

                            <ul class="collection-list has-scrollbar">
                                <li>

                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-top-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&type=Top')">
                                        <h3 class="h4 card-title card-title-Category">Tops Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&type=Top" type="Tops"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-bottom-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&type=Bottom')">
                                        <h3 class="h4 card-title card-title-Category">Bottoms Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&type=Bottom" type="Bottoms"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-footware-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&type=Footwear')">
                                        <h3 class="h4 card-title card-title-Category">FootWare Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&type=Footwear" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </section>
                </div>
                <div id="men-footware-area" class="hidden">
                    <section class="section collection py-50 px-20">
                        <div class="container flex">
                            <div class="flex flex-direction-column center p-10">
                                <h4 class="h4 card-title card-title-Category">Men Collection</h4>
                                <a href="./Category.html?&category=men&type=Footwear" type="Shoses"
                                    class="btn btn-secondary btn-secondary-sm btn-explore mt-10 fit-content">
                                    <span>Explore All</span>

                                    <ion-icon name="arrow-forward-outline" size="small" aria-hidden="true" role="img"
                                        class="md hydrated"></ion-icon>
                                </a>
                            </div>

                            <ul class="collection-list has-scrollbar">

                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-shoses-img"
                                        id="men-Shoses-Collections"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=Shoes')">
                                        <h3 class="h4 card-title card-title-Category">Shoses Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=Shoes" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-slippers-img"
                                        id="men-Slippers-Collections"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=Slipper')">
                                        <h3 class="h4 card-title card-title-Category">Slippers Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=Slipper" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="men-Flip-Flop-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=Flip-Flop')">
                                        <h3 class="h4 card-title card-title-Category">Flip Flops Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=Flip-Flop" type="Flip-Flop"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-sandal-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=Sandal')">
                                        <h3 class="h4 card-title card-title-Category">Sandals Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=Sandal" type="Sandal"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-Loafers-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=Loafers')">
                                        <h3 class="h4 card-title card-title-Category">Loafers Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=Loafers" type="Loafers"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="men-moccasins-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=Moccasins')">
                                        <h3 class="h4 card-title card-title-Category">Moccasins Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=Moccasins" type="moccasins"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="men-classic-img"
                                        onclick="changeFrameSrc('./Category.html?&category=men&piece=classic')">
                                        <h3 class="h4 card-title card-title-Category">Classic Shoes Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=men&piece=classic" type="classic"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div id="women-area" class="hidden">
                    <section class="mt-40 flex flex-wrap">
                        <div class="collection-card height-200 width-available m-20 pointer" id="womencollection-img"
                            onclick="changeFrameSrc('./Category.html?category=women')">
                            <h3 class="h4 card-title white-font">Women Collections</h3>

                            <a href="./Category.html?category=women" type="Women" class="btn btn-secondary2 mt-10">
                                <span>Explore All</span>

                                <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                    class="md hydrated"></ion-icon>
                            </a>
                        </div>

                    </section>
                    <section class="section collection">
                        <div class="container">
                            <ul class="collection-list has-scrollbar">

                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="women-top-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&type=Top')">
                                        <h3 class="h4 card-title card-title-Category">Tops Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&type=Top" type="Tops"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>
                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>

                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="women-bottom-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&type=Bottom')">
                                        <h3 class="h4 card-title card-title-Category">Bottoms Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&type=Bottom" type="Bottoms"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="women-footware-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&type=Footwear')">
                                        <h3 class="h4 card-title card-title-Category">FootWare Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&type=Footwear" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div id="women-footware-area" class="hidden">
                    <section class="section collection py-50 px-20">
                        <div class="container flex ">
                            <div class="flex flex-direction-column center p-10">
                                <h4 class="h4 card-title card-title-Category">Women Collection</h4>
                                <a href="./Category.html?&category=women&type=Footwear" type="Shoses"
                                    class="btn btn-secondary btn-secondary-sm btn-explore mt-10 fit-content">
                                    <span>Explore All</span>

                                    <ion-icon name="arrow-forward-outline" size="small" aria-hidden="true" role="img"
                                        class="md hydrated"></ion-icon>
                                </a>
                            </div>
                            <ul class="collection-list has-scrollbar ">
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="women-shoses-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Shoes')">
                                        <h3 class="h4 card-title card-title-Category">Shoses Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Shoes" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="women-slippers-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Slipper')">
                                        <h3 class="h4 card-title card-title-Category">Slippers Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Slipper" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="women-Flip-Flop-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Flip-Flop')">
                                        <h3 class="h4 card-title card-title-Category">Flip Flops Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Flip-Flop" type="Flip-Flop"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="women-sandal-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Sandal')">
                                        <h3 class="h4 card-title card-title-Category">Sandals Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Sandal" type="Sandal"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="women-heels-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Heels')">
                                        <h3 class="h4 card-title card-title-Category">Heels Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Heels" type="Sandal"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="women-Loafers-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Loafers')">
                                        <h3 class="h4 card-title card-title-Category">Loafers Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Loafers" type="Loafers"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="women-moccasins-img"
                                        onclick="changeFrameSrc('./Category.html?&category=women&piece=Moccasins')">
                                        <h3 class="h4 card-title card-title-Category">Moccasins Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=women&piece=Moccasins" type="moccasins"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div id="kids-area" class="hidden">
                    <section class="mt-40 flex flex-wrap">
                        <div class="collection-card height-200 width-available m-20 pointer" id="kidscollection-img"
                            onclick="changeFrameSrc('./Category.html?category=kids')">
                            <h3 class="h4 card-title white-font">Kids Collections</h3>

                            <a href="./Category.html?category=kids" type="Kids" class="btn btn-secondary2 mt-10">
                                <span>Explore All</span>

                                <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                    class="md hydrated"></ion-icon>
                            </a>
                        </div>

                    </section>

                    <section class="section collection">
                        <div class="container">
                            <ul class="collection-list has-scrollbar">

                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="kids-top-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&type=Top')">
                                        <h3 class="h4 card-title card-title-Category">Tops Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&type=Top" type="Tops"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>

                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="kids-bottom-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&type=Bottom')">
                                        <h3 class="h4 card-title card-title-Category">Bottoms Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&type=Bottom" type="Bottoms"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="kids-footware-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&type=Footwear')">
                                        <h3 class="h4 card-title card-title-Category">FootWare Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&type=Footwear" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div id="kids-footware-area" class="hidden">
                    <section class="section collection py-50 px-20">
                        <div class="container flex">
                            <div class="flex flex-direction-column center p-10">
                                <h4 class="h4 card-title card-title-Category">Kids Collection</h4>
                                <a href="./Category.html?&category=kids&type=Footwear" type="Shoses"
                                    class="btn btn-secondary btn-secondary-sm btn-explore mt-10 fit-content">
                                    <span>Explore All</span>

                                    <ion-icon name="arrow-forward-outline" size="small" aria-hidden="true" role="img"
                                        class="md hydrated"></ion-icon>
                                </a>
                            </div>

                            <ul class="collection-list has-scrollbar">
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="kids-shoses-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&piece=Shoes')">
                                        <h3 class="h4 card-title card-title-Category">Shoses Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&piece=Shoes" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer"
                                        id="kids-slippers-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&piece=Slipper')">
                                        <h3 class="h4 card-title card-title-Category">Slippers Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&piece=Slipper" type="Shoses"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="kids-sandal-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&piece=Sandal')">
                                        <h3 class="h4 card-title card-title-Category">Sandals Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&piece=Sandal" type="Sandal"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                                <li>
                                    <div class="collection-card height-400 flex-start p-0 pointer" id="kids-boots-img"
                                        onclick="changeFrameSrc('./Category.html?&category=kids&piece=Boots')">
                                        <h3 class="h4 card-title card-title-Category">Boots Collections</h3>
                                    </div>
                                    <a href="./Category.html?&category=kids&piece=Boots" type="Sandal"
                                        class="btn btn-secondary btn-explore mt-10 fit-content">
                                        <span>Explore All</span>

                                        <ion-icon name="arrow-forward-outline" aria-hidden="true" role="img"
                                            class="md hydrated"></ion-icon>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

            <div class="scroll-container flex space-around height-max" id="piece-choose">
                <div class="flex center align-items m-20 shop-by-piece">
                    <h4>Shop By Piece</h4>
                </div>

                <div class="scroll-container ">
                    <a href="./Category.html?piece=T-Shirt">
                        <div class="scroll-item"
                            style="background-image: url('https://i.imgur.com/0sakCXs_d.webp?maxwidth=760&fidelity=grand');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                T-shirts
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Polo-Shirt">
                        <div class="scroll-item" style="background-image: url('https://i.imgur.com/AdMd7Ls.jpeg');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Polo Shirt
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Jeans">
                        <div class="scroll-item"
                            style="background-image: url('https://i.imgur.com/mncaF0c_d.webp?maxwidth=760&fidelity=grand');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Jeans
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Short">
                        <div class="scroll-item"
                            style="background-image: url('https://i.imgur.com/ErdoQyD_d.webp?maxwidth=760&fidelity=grand');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Shorts
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Shirt">
                        <div class="scroll-item"
                            style="background-image: url('https://i.imgur.com/Znqhncx_d.webp?maxwidth=760&fidelity=grand');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Shirts
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Hoodie">
                        <div class="scroll-item" style="background-image: url('https://i.imgur.com/389Wcvs.jpeg');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Hoodies
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Sweatshirt">
                        <div class="scroll-item" style="background-image: url('https://i.imgur.com/dOfWBwl.jpeg');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Sweat Shirt
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Jacket">
                        <div class="scroll-item" style="background-image: url('https://i.imgur.com/3jDvg2e.jpeg');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Jackets
                            </div>
                        </div>
                    </a>
                    </a>
                    <a href="./Category.html?piece=Swimwear">
                        <div class="scroll-item"
                            style="background-image: url('https://i.imgur.com/xzdoYtt_d.webp?maxwidth=760&fidelity=grand');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Swim Wear
                            </div>
                        </div>
                    </a>
                    <a href="./Category.html?piece=Underwear">
                        <div class="scroll-item"
                            style="background-image: url('https://i.imgur.com/iEoH0Vs_d.webp?maxwidth=760&fidelity=grand');">
                            <div class="overlay-category">
                                <i class="bi bi-arrow-right-short"></i>
                                Underwear
                            </div>
                        </div>
                    </a>

                </div>

                <!-- Add more items as needed -->

            </div>

            <section class="section product">
                <div class="container">

                    <h2 class="h2 section-title">FEATURED PRODUCTS</h2>

                    <ul class="product-overview">

                    </ul>

                    <div class="flex center align-items m-50">
                        <button id="more_product" class="cus-btn show-all-btn " onclick="more_product()">Show All
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>

                </div>
            </section>

            <section class="section special new-arri">
                <div class="container">

                    <div class="special-banner center" id="new-arrival-img">
                        <h2 id="new-arrival-title" class="h3 banner-title"></h2>
                    </div>

                    <div class="special-product">

                        <h2 class="h2 section-title">
                            <span class="text">New Arrivalls</span>

                            <span class="line"></span>
                        </h2>

                        <ul class="has-scrollbar" id="NewArrivalls">

                        </ul>

                    </div>

                </div>
            </section>

            <div class="sale-animation-bar">
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>
                <span class="sale-animation-txt">SALE</span>

                <!-- Duplicate for continuous effect -->
            </div>
            <section class="section special sales-div">
                <div class="container flex-direction-row-rev">

                    <div class="special-banner center" id="sale-img">
                        <h2 id="Sale-title" class="h3 banner-title"></h2>

                    </div>

                    <div class="special-product">

                        <h2 class="h2 section-title flex-direction-row-rev">
                            <span class="text">Sale</span>

                            <span class="line"></span>
                        </h2>

                        <ul class="has-scrollbar flex-direction-row-rev" id="Sale">

                        </ul>

                    </div>

                </div>
            </section>
            <div class="sale-animation-bar">
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>
                <span class="sale-animation-txt-reversed">SALE</span>

                <!-- Duplicate for continuous effect -->
            </div>

        </article>
    </div>
    <div class="modal">

        <div class="modal-content">

        </div>

    </div>
    <div id="modal-fav" class="modal">
        <div id="modal-fav-content" class="fav-modal-content">

        </div>
    </div>
    <footer class="footer">

        <div class="footer-top section">
            <div class="container">

                <div class="footer-brand">

                    <a href="#" class="logo">
                        <img src="./assets/images/iicon.svg" width="160" height="50" alt="">
                    </a>

                    <ul class="social-list hidden">

                        <li>
                            <a href="#" class="social-link">
                                <ion-icon name="logo-facebook" role="img" class="md hydrated"
                                    aria-label="logo facebook"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="social-link">
                                <ion-icon name="logo-twitter" role="img" class="md hydrated"
                                    aria-label="logo twitter"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="social-link">
                                <ion-icon name="logo-pinterest" role="img" class="md hydrated"
                                    aria-label="logo pinterest"></ion-icon>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="social-link">
                                <ion-icon name="logo-linkedin" role="img" class="md hydrated"
                                    aria-label="logo linkedin"></ion-icon>
                            </a>
                        </li>

                    </ul>

                </div>

                <div class="footer-end flex space-around">

                    <ul class="footer-list">

                        <li>
                            <p class="footer-list-title">Contact Us</p>
                        </li>

                        <li>
                            <address class="footer-link hidden">
                                <ion-icon name="location" role="img" class="md hydrated"
                                    aria-label="location"></ion-icon>

                                <span class="footer-link-text">
                                    type any addrress
                                </span>
                            </address>
                        </li>

                        <li>
                            <a href="tel:" id="store-call" class="footer-link">
                                <ion-icon name="call" role="img" class="md hydrated" aria-label="call"></ion-icon>
                                <span id="store-number" class="footer-link-text"></span>
                            </a>
                        </li>

                        <li>
                            <a href="mailto:" id="store-email-link" class="footer-link">
                                <ion-icon name="mail" role="img" class="md hydrated" aria-label="mail"></ion-icon>
                                <span id="store-email" class="footer-link-text"></span>
                            </a>
                        </li>

                        <li>
                            <a href="#" class="footer-link" id="report-bug-btn">
                                <ion-icon name="bug"></ion-icon>
                                <span class="footer-link-text">Report a problem or a bug</span>
                            </a>
                        </li>

                    </ul>

                    <div class="footer-list">

                        <p class="footer-list-title">Newsletter</p>

                        <p class="newsletter-text">
                            Send us your email to keeping up with our latest updates..
                        </p>

                        <form action="" class="newsletter-form">
                            <input type="email" name="email" required="" placeholder="Email Address"
                                class="newsletter-input">

                            <button type="submit" class="btn2 btn-primary">Subscribe</button>
                        </form>

                    </div>

                    <ul class="footer-list">
                        <p class="footer-list-title">Matager</p>
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

    <a href="#top" class="go-top-btn" data-go-top="">
        <ion-icon name="arrow-up-outline" role="img" class="md hydrated" aria-label="arrow up outline"></ion-icon>
    </a>

    `;

    console.log("Content automatically rendered to #mainpagearea");
  });
})();
