document.documentElement.setAttribute('lang', 'ar');
document.documentElement.setAttribute('dir', 'rtl');

const products = [
  { id: 'basic-tee', name: 'تيشيرت قطني أساسي', price: 850, category: 'تيشيرتات عادية', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80', alt: 'تيشيرت قطني أساسي', description: 'تيشيرت قطني 100% بقصة عادية، مثالي للاستخدام اليومي.', sizes: ['S', 'M', 'L', 'XL'], colors: ['أبيض', 'أسود', 'رمادي'] },
  { id: 'oversized-beige', name: 'تيشيرت أوفر سايز بيج', price: 950, category: 'تيشيرتات أوفر سايز', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', alt: 'تيشيرت أوفر سايز بيج', description: 'تيشيرت أوفر سايز بقصّة واسعة مريحة، خامة قطنية فاخرة.', sizes: ['M', 'L', 'XL', 'XXL'], colors: ['بيج', 'أبيض', 'أسود'] },
  { id: 'gray-sweatshirt', name: 'سويت شيرت شتوي رمادي', price: 1200, category: 'سويت شيرت', image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&q=80', alt: 'سويت شيرت شتوي رمادي', description: 'سويت شيرت شتوي دافئ ببطانة ناعمة، مثالي للأيام الباردة.', sizes: ['S', 'M', 'L', 'XL'], colors: ['رمادي', 'أسود', 'كحلي'] },
  { id: 'classic-jeans', name: 'جينز كلاسيك أزرق', price: 1650, category: 'جينز', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80', alt: 'جينز كلاسيك أزرق', description: 'جينز بقصة كلاسيك مريحة، خامة دينيم متينة.', sizes: ['28', '30', '32', '34', '36'], colors: ['أزرق فاتح', 'أزرق داكن'] },
  { id: 'white-tee', name: 'تيشيرت عادي أبيض', price: 750, category: 'تيشيرتات عادية', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', alt: 'تيشيرت عادي أبيض', description: 'تيشيرت أبيض أساسي بقصة عادية، قطن ناعم.', sizes: ['S', 'M', 'L', 'XL'], colors: ['أبيض'] },
  { id: 'oversized-black', name: 'تيشيرت أوفر سايز أسود', price: 1100, category: 'تيشيرتات أوفر سايز', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', alt: 'تيشيرت أوفر سايز أسود', description: 'تيشيرت أوفر سايز أسود بتصميم عصري وبسيط.', sizes: ['M', 'L', 'XL'], colors: ['أسود'] },
  { id: 'turtleneck-sweatshirt', name: 'سويت شيرت بياقة عالية', price: 1450, category: 'سويت شيرت', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80', alt: 'سويت شيرت بياقة عالية', description: 'سويت شيرت بياقة عالية أنيق، خامة دافئة ومريحة.', sizes: ['S', 'M', 'L', 'XL'], colors: ['أسود', 'رمادي', 'بيج'] },
  { id: 'slim-jeans', name: 'جينز سليم فيت', price: 1800, category: 'جينز', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', alt: 'جينز سليم فيت', description: 'جينز سليم فيت بقصة ضيقة عصرية، خامة دينيم مرنة.', sizes: ['28', '30', '32', '34'], colors: ['أزرق', 'أسود'] }
];

const CART_KEY = 'loyalty_cart';

function getCart() {
  try {
    const data = localStorage.getItem(CART_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  const noResults = document.getElementById('no-results');
  if (!grid) return;

  let filtered = activeCategory === 'all'
    ? [...products]
    : products.filter(p => p.category === activeCategory);

  if (activeSort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (activeSort === 'price-desc') filtered.sort((a, b) => b.price - a.price);

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.alt}" class="product-card-image" width="600" height="800" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x800/292929/C7AD8A?text=Product';">
      <div class="product-card-body">
        <h3 class="product-card-title">${p.name}</h3>
        <p class="product-card-category">${p.category}</p>
        <p class="product-card-price">${p.price.toLocaleString('ar-EG')} ج.م</p>
        <a href="product-details.html?id=${p.id}" class="btn btn-outline product-card-btn">عرض المنتج</a>
      </div>
    </article>
  `).join('');

  noResults.hidden = filtered.length > 0;
}

function initCatalog() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortSelect = document.getElementById('sort-select');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      activeSort = sortSelect.value;
      renderProducts();
    });
  }

  renderProducts();
}

function initProductDetails() {
  const container = document.getElementById('product-details');
  const notFound = document.getElementById('product-not-found');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.hidden = true;
    notFound.hidden = false;
    return;
  }

  let selectedSize = '';
  let selectedColor = '';

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.alt}" width="600" height="800" onerror="this.onerror=null;this.src='https://placehold.co/600x800/292929/C7AD8A?text=Product';">
      </div>
      <div class="product-detail-info">
        <h1 class="product-detail-title">${product.name}</h1>
        <p class="product-detail-category">${product.category}</p>
        <p class="product-detail-price">${product.price.toLocaleString('ar-EG')} ج.م</p>
        <p class="product-detail-description">${product.description}</p>

        <div class="option-group">
          <span class="option-label">المقاس:</span>
          <div class="option-buttons" role="group" aria-label="اختيار المقاس">
            ${product.sizes.map(s => `<button class="option-btn" data-type="size" data-value="${s}">${s}</button>`).join('')}
          </div>
        </div>

        <div class="option-group">
          <span class="option-label">اللون:</span>
          <div class="option-buttons" role="group" aria-label="اختيار اللون">
            ${product.colors.map(c => `<button class="option-btn" data-type="color" data-value="${c}">${c}</button>`).join('')}
          </div>
        </div>

        <div class="option-group">
          <span class="option-label">الكمية:</span>
          <div class="quantity-selector">
            <button class="quantity-btn" id="qty-minus" aria-label="تقليل الكمية">−</button>
            <input type="number" id="qty-input" class="form-input quantity-input" value="1" min="1" max="99" aria-label="الكمية">
            <button class="quantity-btn" id="qty-plus" aria-label="زيادة الكمية">+</button>
          </div>
        </div>

        <p class="error-message" id="error-msg" role="alert" hidden></p>
        <button class="btn btn-primary add-to-cart" id="add-to-cart">أضف إلى السلة</button>
      </div>
    </div>
  `;

  container.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const value = btn.dataset.value;

      if (type === 'size') {
        selectedSize = value;
        container.querySelectorAll('[data-type="size"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else if (type === 'color') {
        selectedColor = value;
        container.querySelectorAll('[data-type="color"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }

      hideError();
    });
  });

  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    const val = parseInt(qtyInput.value, 10) || 1;
    if (val > 1) qtyInput.value = val - 1;
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    const val = parseInt(qtyInput.value, 10) || 1;
    if (val < 99) qtyInput.value = val + 1;
  });

  document.getElementById('add-to-cart').addEventListener('click', () => {
    const qty = parseInt(qtyInput.value, 10);

    if (!selectedSize) {
      showError('يرجى اختيار المقاس قبل الإضافة إلى السلة.');
      return;
    }
    if (!selectedColor) {
      showError('يرجى اختيار اللون قبل الإضافة إلى السلة.');
      return;
    }
    if (!qty || qty < 1 || isNaN(qty)) {
      showError('يرجى إدخال كمية صحيحة.');
      qtyInput.value = 1;
      return;
    }

    const cart = getCart();
    const existing = cart.find(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: qty
      });
    }

    saveCart(cart);
    showError('تمت الإضافة إلى السلة بنجاح.', true);
  });

  function showError(msg, success = false) {
    const el = document.getElementById('error-msg');
    el.textContent = msg;
    el.style.color = success ? 'var(--color-accent)' : '#e74c3c';
    el.hidden = false;
  }

  function hideError() {
    document.getElementById('error-msg').hidden = true;
  }
}

function initCart() {
  const itemsContainer = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const contentState = document.getElementById('cart-content');
  if (!itemsContainer) return;

  function renderCart() {
    const rawCart = getCart();
    const cart = rawCart.filter(item => {
      const product = products.find(p => p.id === item.id);
      return product && typeof item.quantity === 'number' && item.quantity > 0 && item.size && item.color;
    });

    if (rawCart.length !== cart.length) {
      saveCart(cart);
    }

    if (cart.length === 0) {
      emptyState.hidden = false;
      contentState.hidden = true;
      updateCartCount(0);
      return;
    }

    emptyState.hidden = true;
    contentState.hidden = false;

    let subtotal = 0;

    itemsContainer.innerHTML = cart.map((item, index) => {
      const product = products.find(p => p.id === item.id);
      const price = product ? product.price : 0;
      const lineTotal = price * item.quantity;
      subtotal += lineTotal;

      return `
        <div class="cart-item" data-index="${index}">
          <img src="${product ? product.image : ''}" alt="${product ? product.alt : item.name}" class="cart-item-image" width="120" height="160" onerror="this.onerror=null;this.src='https://placehold.co/120x160/292929/C7AD8A?text=Product';">
          <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-meta">المقاس: ${item.size} | اللون: ${item.color}</p>
            <p class="cart-item-price">${price.toLocaleString('ar-EG')} ج.م</p>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-selector">
              <button class="quantity-btn cart-qty-minus" aria-label="تقليل الكمية">−</button>
              <input type="number" class="form-input quantity-input cart-qty-input" value="${item.quantity}" min="1" max="99" aria-label="الكمية">
              <button class="quantity-btn cart-qty-plus" aria-label="زيادة الكمية">+</button>
            </div>
            <p class="cart-item-subtotal">${lineTotal.toLocaleString('ar-EG')} ج.م</p>
            <button class="cart-remove-btn" aria-label="حذف المنتج من السلة">حذف</button>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('cart-subtotal').textContent = `${subtotal.toLocaleString('ar-EG')} ج.م`;
    updateCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

    itemsContainer.querySelectorAll('.cart-item').forEach(row => {
      const index = parseInt(row.dataset.index, 10);
      const item = cart[index];
      const product = products.find(p => p.id === item.id);
      const price = product ? product.price : 0;

      const qtyInput = row.querySelector('.cart-qty-input');
      const subtotalEl = row.querySelector('.cart-item-subtotal');

      row.querySelector('.cart-qty-minus').addEventListener('click', () => {
        const val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) {
          qtyInput.value = val - 1;
          updateItemQuantity(index, val - 1);
        }
      });

      row.querySelector('.cart-qty-plus').addEventListener('click', () => {
        const val = parseInt(qtyInput.value, 10) || 1;
        if (val < 99) {
          qtyInput.value = val + 1;
          updateItemQuantity(index, val + 1);
        }
      });

      qtyInput.addEventListener('change', () => {
        let val = parseInt(qtyInput.value, 10);
        if (!val || val < 1) val = 1;
        if (val > 99) val = 99;
        qtyInput.value = val;
        updateItemQuantity(index, val);
      });

      row.querySelector('.cart-remove-btn').addEventListener('click', () => {
        removeItem(index);
      });
    });
  }

  function updateItemQuantity(index, quantity) {
    const cart = getCart();
    if (cart[index]) {
      cart[index].quantity = quantity;
      saveCart(cart);
      renderCart();
    }
  }

  function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function updateCartCount(count) {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
      countEl.textContent = count > 0 ? count : '';
    }
  }

  renderCart();
}

function initCheckout() {
  const form = document.getElementById('checkout-form');
  const emptyState = document.getElementById('checkout-empty');
  const contentState = document.getElementById('checkout-content');
  if (!form) return;

  function renderCheckout() {
    const rawCart = getCart();
    const cart = rawCart.filter(item => {
      const product = products.find(p => p.id === item.id);
      return product && typeof item.quantity === 'number' && item.quantity > 0 && item.size && item.color;
    });

    if (cart.length === 0) {
      emptyState.hidden = false;
      contentState.hidden = true;
      return;
    }

    emptyState.hidden = true;
    contentState.hidden = false;

    let subtotal = 0;

    document.getElementById('checkout-items').innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      const price = product ? product.price : 0;
      const lineTotal = price * item.quantity;
      subtotal += lineTotal;

      return `
        <div class="checkout-item">
          <div class="checkout-item-info">
            <span class="checkout-item-name">${item.name}</span>
            <span class="checkout-item-meta">${item.size} | ${item.color} | ×${item.quantity}</span>
          </div>
          <span class="checkout-item-price">${lineTotal.toLocaleString('ar-EG')} ج.م</span>
        </div>
      `;
    }).join('');

    document.getElementById('checkout-subtotal').textContent = `${subtotal.toLocaleString('ar-EG')} ج.م`;
  }

  function showFieldError(fieldId, message) {
    const el = document.getElementById(`error-${fieldId}`);
    if (el) {
      el.textContent = message;
      el.hidden = false;
    }
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.hidden = true;
    });
  }

  function validateForm(data) {
    clearErrors();
    let valid = true;

    if (!data.fullName || data.fullName.trim().length < 3) {
      showFieldError('fullName', 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).');
      valid = false;
    }

    const phoneRegex = /^01[0-9]{9}$/;
    if (!data.phone || !phoneRegex.test(data.phone.trim())) {
      showFieldError('phone', 'يرجى إدخال رقم هاتف مصري صحيح (11 رقم يبدأ بـ 01).');
      valid = false;
    }

    if (!data.governorate || data.governorate.trim().length < 2) {
      showFieldError('governorate', 'يرجى إدخال المحافظة.');
      valid = false;
    }

    if (!data.city || data.city.trim().length < 2) {
      showFieldError('city', 'يرجى إدخال المدينة أو المنطقة.');
      valid = false;
    }

    if (!data.address || data.address.trim().length < 10) {
      showFieldError('address', 'يرجى إدخال العنوان بالتفصيل (10 أحرف على الأقل).');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn.disabled) return;

    const formData = new FormData(form);
    const data = {
      fullName: formData.get('fullName') || '',
      phone: formData.get('phone') || '',
      governorate: formData.get('governorate') || '',
      city: formData.get('city') || '',
      address: formData.get('address') || '',
      notes: formData.get('notes') || ''
    };

    if (!validateForm(data)) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري المعالجة...';

    setTimeout(() => {
      const formError = document.getElementById('form-error');
      formError.textContent = 'نظام الطلبات غير متصل حاليًا. لم يتم إنشاء أي طلب. يرجى المحاولة لاحقًا أو التواصل معنا.';
      formError.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'تأكيد الطلب';
    }, 1000);
  });

  renderCheckout();
}

function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showFieldError(fieldId, message) {
    const el = document.getElementById(`error-${fieldId}`);
    if (el) {
      el.textContent = message;
      el.hidden = false;
    }
  }

  function clearErrors() {
    form.querySelectorAll('.field-error').forEach(el => {
      el.textContent = '';
      el.hidden = true;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('contact-submit-btn');
    if (submitBtn.disabled) return;

    clearErrors();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      subject: formData.get('subject') || '',
      message: formData.get('message') || ''
    };

    let valid = true;

    if (!data.name || data.name.trim().length < 2) {
      showFieldError('name', 'يرجى إدخال الاسم (حرفين على الأقل).');
      valid = false;
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      showFieldError('email', 'يرجى إدخال بريد إلكتروني صحيح.');
      valid = false;
    }

    if (!data.subject || data.subject.trim().length < 3) {
      showFieldError('subject', 'يرجى إدخال موضوع الرسالة (3 أحرف على الأقل).');
      valid = false;
    }

    if (!data.message || data.message.trim().length < 10) {
      showFieldError('message', 'يرجى إدخال تفاصيل الرسالة (10 أحرف على الأقل).');
      valid = false;
    }

    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';

    setTimeout(() => {
      const formError = document.getElementById('contact-form-error');
      formError.textContent = 'نظام إرسال الرسائل غير متصل حاليًا. لم يتم إرسال رسالتك. يرجى المحاولة لاحقًا.';
      formError.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال الرسالة';
    }, 1000);
  });
}

let activeCategory = 'all';
let activeSort = 'default';

initCatalog();
initProductDetails();
initCart();
initCheckout();
initContact();
