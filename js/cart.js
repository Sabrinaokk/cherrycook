const CART_KEY = 'carrito_cherry';

function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = loadCart();
  const prod = PRODUCTS.find(p => p.id === productId);
  if(!prod) return;
  const existing = cart.find(i => i.id === productId);
  if(existing) {
    existing.cantidad = parseInt(existing.cantidad) + parseInt(qty);
  } else {
    cart.push({ 
      id: prod.id, 
      nombre: prod.nombre, 
      precio: prod.precio, 
      img: prod.img, 
      cantidad: parseInt(qty) 
    });
  }
  saveCart(cart);
}

window.addToCart = addToCart;

function removeFromCart(productId) {
  let cart = loadCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, newQty) {
  const cart = loadCart();
  const item = cart.find(i => i.id === productId);
  if(item) {
    item.cantidad = parseInt(newQty) || 0;
    if(item.cantidad <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart);
    }
  }
}

function cartTotal() {
  const cart = loadCart();
  return cart.reduce((s, it) => s + (it.precio * it.cantidad), 0);
}

function updateCartBadge() {
  const cart = loadCart();
  const count = cart.reduce((s, it) => s + it.cantidad, 0);

  document.querySelectorAll('.nav-cart-badge-count').forEach(el => el.remove());

  const cartBtns = document.querySelectorAll('.btn-cart-badge');
  cartBtns.forEach(btn => {
    if(count > 0) {
      const span = document.createElement('span');
      span.className = 'nav-cart-badge-count';
      span.textContent = count;
      // estilos del badge
      span.style.position = 'absolute';
      span.style.top = '0';
      span.style.right = '0';
      span.style.background = '#dc3545';
      span.style.color = '#fff';
      span.style.fontSize = '0.75rem';
      span.style.borderRadius = '50%';
      span.style.padding = '2px 6px';
      btn.style.position = 'relative';
      btn.appendChild(span);
    }
  });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);


