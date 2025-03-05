// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Simple image slider for featured products
const slider = document.querySelector('.product-slider');
const products = [
  {
    name: 'Pumpkin Spice Latte',
    image: 'images/img1.png',
    description: 'Our signature fall drink with pumpkin, cinnamon, and nutmeg.'
  },
  {
    name: 'Caramel Macchiato',
    image: 'images/img2.png',
    description: 'Rich espresso with vanilla-flavored syrup, milk, and caramel drizzle.'
  },
  {
    name: 'Iced Matcha Latte',
    image: 'images/img3.png',
    description: 'Refreshing green tea matcha with milk over ice.'
  }
];

// Populate the slider with products
products.forEach(product => {
  const productItem = document.createElement('div');
  productItem.classList.add('product-item');
  productItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
  `;
  slider.appendChild(productItem);
});

function imgSlider(anything) {
    document.querySelector('.starbucks').src = anything;
}

function changeCircleColor(color) {
    document.querySelector('section').style.background = color;
}

// Scroll effect for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Mobile menu toggle
const menuBtn = document.createElement('div');
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = '☰';
document.querySelector('header').insertBefore(menuBtn, document.querySelector('nav'));

menuBtn.addEventListener('click', () => {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
    menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        nav.classList.remove('active');
        menuBtn.innerHTML = '☰';
    });
});

// Add pulse animation to Learn More button
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.querySelector('.content .textBox .btn');
    learnMoreBtn.classList.add('pulse');
    
    // Remove pulse animation when button is clicked or hovered
    learnMoreBtn.addEventListener('mouseenter', () => {
        learnMoreBtn.classList.remove('pulse');
    });
});

// Add these functions to your script.js
function showThankYouMessage(event) {
    event.preventDefault();
    
    // Get form values
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Validate form
    if (name && email && message) {
        // Show popup
        const popup = document.getElementById('popup');
        popup.classList.add('show');
        
        // Reset form
        form.reset();
    }
    
    return false;
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('show');
}

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup) {
        closePopup();
    }
});

function changeTextColor(color) {
    const starbucksText = document.querySelector('.starbucks-text');
    starbucksText.style.color = color;
}

let cart = [];
let cartTotal = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    cartTotal += price;
    updateCart();
    showAddedToCartMessage();
}

function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Clear empty cart message if items exist
    if (cart.length > 0) {
        document.querySelector('.empty-cart-message').style.display = 'none';
        checkoutBtn.disabled = false;
    }

    // Clear existing items
    cartItems.innerHTML = cart.length === 0 ? 
        `<div class="empty-cart-message">
            <img src="images/empty-cart.png" alt="Empty Cart" style="width: 50px; height: auto;">
            <p>Your cart is empty</p>
            <a href="#menu" class="btn">Browse Menu</a>
        </div>` : '';

    // Add cart items
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">×</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Update summary
    const subtotal = cartTotal;
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    document.querySelector('.summary-details').innerHTML = `
        <div class="summary-row">
            <span>Subtotal</span>
            <span>₹${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax (18% GST)</span>
            <span>₹${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>₹${total.toFixed(2)}</span>
        </div>
    `;
}

function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function showAddedToCartMessage() {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = 'Item added to cart!';
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 2000);
}

function placeOrder() {
    if (cart.length > 0) {
        document.getElementById('order-popup').style.display = 'flex';
        // Clear cart after order
        cart = [];
        cartTotal = 0;
        updateCart();
    }
}

function closeOrderPopup() {
    document.getElementById('order-popup').style.display = 'none';
}

// Add click event to checkout button
document.querySelector('.checkout-btn').addEventListener('click', placeOrder);

function toggleNavbar() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}
