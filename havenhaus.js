
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // NAVBAR & SEARCH
  // =========================
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="bi bi-x-lg"></i>'
      : '<i class="bi bi-list"></i>';
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");

      if (menuToggle) {
        menuToggle.innerHTML = '<i class="bi bi-list"></i>';
      }
    });
  });
  // =========================
  // PRODUCT DATA
  // All prices and reviews are fictional demo data.
  // =========================
  const products = [
    {
      id: 1,
      name: "Interior Wall Paint - Soft White",
      category: "building-materials",
      categoryLabel: "Building Materials",
      price: 549,
      oldPrice: 649,
      rating: 4.8,
      reviews: 24,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 2,
      name: "Modern Chrome Bathroom Faucet",
      category: "bathroom-plumbing",
      categoryLabel: "Bathroom & Plumbing",
      price: 1299,
      oldPrice: null,
      rating: 4.7,
      reviews: 18,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 3,
      name: "Minimalist Pendant Ceiling Light",
      category: "lighting-electrical",
      categoryLabel: "Lighting & Electrical",
      price: 899,
      oldPrice: 1099,
      rating: 4.9,
      reviews: 31,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 4,
      name: "Everyday Ceramic Dinner Plate Set",
      category: "kitchen-essentials",
      categoryLabel: "Kitchen Essentials",
      price: 399,
      oldPrice: null,
      rating: 4.6,
      reviews: 15,
      badge: "NEW",
      image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 5,
      name: "Stackable Home Storage Organizer",
      category: "home-organization",
      categoryLabel: "Home Organization",
      price: 249,
      oldPrice: 299,
      rating: 4.5,
      reviews: 12,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 6,
      name: "Household Cleaning Brush Set",
      category: "cleaning-supplies",
      categoryLabel: "Cleaning Supplies",
      price: 179,
      oldPrice: null,
      rating: 4.4,
      reviews: 9,
      badge: "",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 7,
      name: "Heavy-Duty Flexible Garden Hose",
      category: "building-materials",
      categoryLabel: "Building Materials",
      price: 699,
      oldPrice: null,
      rating: 4.6,
      reviews: 11,
      badge: "POPULAR",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=700&q=85"
    },
    {
      id: 8,
      name: "Essential Kitchen Utensil Set",
      category: "kitchen-essentials",
      categoryLabel: "Kitchen Essentials",
      price: 329,
      oldPrice: 399,
      rating: 4.8,
      reviews: 21,
      badge: "SALE",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=85"
    }
  ];

  const productsGrid = document.getElementById("productsGrid");
  const productsCount = document.getElementById("productsCount");
  const productsEmpty = document.getElementById("productsEmpty");
  const productSearch = document.getElementById("productSearch");
  const productSort = document.getElementById("productSort");
  const productFilters = document.getElementById("productFilters");
  const resetFilters = document.getElementById("resetFilters");
  const viewAllProducts = document.getElementById("viewAllProducts");

  let activeCategory = "all";
  let searchQuery = "";

  const money = (amount) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2
    }).format(amount);

  const escapeHTML = (value) =>
    String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);

  function getFilteredProducts() {
    const query = searchQuery.toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" ||
        product.category === activeCategory;

      const searchableText =
        `${product.name} ${product.categoryLabel}`.toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });

    switch (productSort.value) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }

  function renderProducts() {
    const filtered = getFilteredProducts();

    productsCount.textContent =
      `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`;

    productsEmpty.hidden = filtered.length !== 0;
    productsGrid.hidden = filtered.length === 0;

    productsGrid.innerHTML = filtered.map((product) => {
      const badgeClass = product.badge === "NEW" ? "new" : "";

      const badgeHTML = product.badge
        ? `<span class="product-badge ${badgeClass}">${escapeHTML(product.badge)}</span>`
        : "";

      const oldPriceHTML = product.oldPrice
        ? `<span class="product-old-price">${money(product.oldPrice)}</span>`
        : "";

      return `
        <article class="product-card">
          <div class="product-image-wrap">
            ${badgeHTML}
            <img
              class="product-image"
              src="${product.image}"
              alt="${escapeHTML(product.name)}"
              loading="lazy">
          </div>

          <div class="product-info">
            <span class="product-category">
              ${escapeHTML(product.categoryLabel)}
            </span>

            <h3 class="product-name">
              ${escapeHTML(product.name)}
            </h3>

            <div class="product-rating" aria-label="${product.rating} out of 5 stars">
              <span class="stars" aria-hidden="true">★★★★★</span>
              <span>${product.rating.toFixed(1)} (${product.reviews})</span>
            </div>

            <div class="product-prices">
              <span class="product-price">${money(product.price)}</span>
              ${oldPriceHTML}
            </div>

            <button
              class="add-to-cart"
              data-add-to-cart="${product.id}">
              <i class="bi bi-bag-plus"></i>
              Add to Cart
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  productFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    activeCategory = button.dataset.filter;

    productFilters.querySelectorAll("[data-filter]").forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    renderProducts();
  });

  productSearch?.addEventListener("input", () => {
    searchQuery = productSearch.value.trim();
    renderProducts();
  });


  productSort?.addEventListener("change", renderProducts);

  resetFilters?.addEventListener("click", () => {
    activeCategory = "all";
    searchQuery = "";

    if (productSearch) productSearch.value = "";

    if (productSort) productSort.value = "featured";

    productFilters?.querySelectorAll("[data-filter]").forEach((button) => {
      const isActive = button.dataset.filter === "all";
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    renderProducts();
  });

  // Category cards from the previous section.
  document.querySelectorAll(".category-card[data-category]").forEach((card) => {
    card.addEventListener("click", () => {
      activeCategory = card.dataset.category;
      searchQuery = "";

      if (productSearch) productSearch.value = "";
      if (siteSearch) siteSearch.value = "";

      productFilters?.querySelectorAll("[data-filter]").forEach((button) => {
        const isActive = button.dataset.filter === activeCategory;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      renderProducts();
    });
  });

  viewAllProducts?.addEventListener("click", () => {
    resetFilters?.click();
  });

  // =========================
  // CART
  // In-memory demo cart; refresh clears it.
  // =========================
  const cartCount = document.getElementById("cartCount");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const drawerCartCount = document.getElementById("drawerCartCount");
  const continueShopping = document.getElementById("continueShopping");
  const demoCheckout = document.getElementById("demoCheckout");

  const cart = new Map();

  function openCart() {
    cartDrawer?.classList.add("is-open");
    cartBackdrop?.classList.add("is-open");
    cartDrawer?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeCart?.focus();
  }

  function closeCartDrawer() {
    cartDrawer?.classList.remove("is-open");
    cartBackdrop?.classList.remove("is-open");
    cartDrawer?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function renderCart() {
    const entries = [...cart.values()];
    const totalQuantity = entries.reduce(
      (sum, item) => sum + item.quantity, 0
    );

    const subtotal = entries.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );

    if (cartCount) cartCount.textContent = totalQuantity;
    if (drawerCartCount) drawerCartCount.textContent = `(${totalQuantity})`;
    if (cartSubtotal) cartSubtotal.textContent = money(subtotal);

    cartEmpty.hidden = entries.length > 0;
    cartFooter.hidden = entries.length === 0;

    cartItems.innerHTML = entries.map((item) => `
      <div class="cart-line">
        <img src="${item.image}" alt="${escapeHTML(item.name)}">

        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <p class="cart-line-price">${money(item.price)}</p>

          <div class="cart-line-controls">
            <button class="quantity-button"
              data-quantity-change="${item.id}"
              data-delta="-1"
              aria-label="Decrease quantity">
              <i class="bi bi-dash"></i>
            </button>

            <span class="cart-quantity">${item.quantity}</span>

            <button class="quantity-button"
              data-quantity-change="${item.id}"
              data-delta="1"
              aria-label="Increase quantity">
              <i class="bi bi-plus"></i>
            </button>

            <button class="remove-item" data-remove-item="${item.id}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  productsGrid?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-to-cart]");
    if (!button) return;

    const productId = Number(button.dataset.addToCart);
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    const existing = cart.get(productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.set(productId, { ...product, quantity: 1 });
    }

    renderCart();

    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="bi bi-check2"></i> Added to Cart';
    button.disabled = true;

    window.setTimeout(() => {
      button.innerHTML = originalContent;
      button.disabled = false;
    }, 800);

    openCart();
  });

  cartItems?.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-quantity-change]");
    const removeButton = event.target.closest("[data-remove-item]");

    if (quantityButton) {
      const id = Number(quantityButton.dataset.quantityChange);
      const delta = Number(quantityButton.dataset.delta);
      const item = cart.get(id);

      if (!item) return;

      item.quantity += delta;

      if (item.quantity <= 0) cart.delete(id);

      renderCart();
    }

    if (removeButton) {
      cart.delete(Number(removeButton.dataset.removeItem));
      renderCart();
    }
  });

  document.querySelector(".cart-button")?.addEventListener("click", (event) => {
    event.preventDefault();
    openCart();
  });

  closeCart?.addEventListener("click", closeCartDrawer);
  cartBackdrop?.addEventListener("click", closeCartDrawer);
  continueShopping?.addEventListener("click", closeCartDrawer);

  demoCheckout?.addEventListener("click", () => {
    alert("This is a portfolio demo. Checkout and payments are not connected.");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCartDrawer();
      navlinks?.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if(menuToggle){
        menuToggle.innerHTML='<i class="bi bi-list"></i>';
      }
    }
  });

  // Initial render
  productFilters?.querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === "all")
    );
  });

  renderProducts();
  renderCart();

  
  // =========================
  // CUSTOMER REVIEWS SLIDER
  // =========================
  const reviewsTrack = document.getElementById("reviewsTrack");
  const reviewsDots = document.getElementById("reviewsDots");
  const prevReview = document.querySelector(".prev-review");
  const nextReview = document.querySelector(".next-review");
  const reviewsViewport = document.querySelector(".reviews-viewport");

  if (reviewsTrack && reviewsDots && reviewsViewport) {
    const reviewCards = Array.from(
      reviewsTrack.querySelectorAll(".review-card")
    );

    let currentReview = 0;
    let reviewsPerView = 3;
    let maxReviewIndex = 0;

    function updateReviewsPerView() {
      if (window.innerWidth <= 600) {
        reviewsPerView = 1;
      } else if (window.innerWidth <= 900) {
        reviewsPerView = 2;
      } else {
        reviewsPerView = 3;
      }

      maxReviewIndex = Math.max(
        0,
        reviewCards.length - reviewsPerView
      );

      currentReview = Math.min(currentReview, maxReviewIndex);
      renderReviewDots();
      updateReviewSlider();
    }

    function renderReviewDots() {
      reviewsDots.innerHTML = "";

      for (let i = 0; i <= maxReviewIndex; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "review-dot";
        dot.setAttribute("aria-label", `Show review set ${i + 1}`);

        dot.addEventListener("click", () => {
          currentReview = i;
          updateReviewSlider();
        });

        reviewsDots.appendChild(dot);
      }
    }

    function updateReviewSlider() {
      const card = reviewCards[0];

      if (!card) return;

      const trackStyle = window.getComputedStyle(reviewsTrack);
      const gap = parseFloat(trackStyle.columnGap) || 0;
      const cardWidth = card.getBoundingClientRect().width;
      const offset = currentReview * (cardWidth + gap);

      reviewsTrack.style.transform = `translateX(-${offset}px)`;

      reviewsDots.querySelectorAll(".review-dot").forEach((dot, index) => {
        const isActive = index === currentReview;
        dot.classList.toggle("active", isActive);

        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      if (prevReview) {
        prevReview.disabled = currentReview === 0;
      }

      if (nextReview) {
        nextReview.disabled = currentReview >= maxReviewIndex;
      }
    }

    prevReview?.addEventListener("click", () => {
      if (currentReview > 0) {
        currentReview--;
        updateReviewSlider();
      }
    });

    nextReview?.addEventListener("click", () => {
      if (currentReview < maxReviewIndex) {
        currentReview++;
        updateReviewSlider();
      }
    });

    let resizeFrame;

    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(updateReviewsPerView);
    });

    updateReviewsPerView();
  }



});
