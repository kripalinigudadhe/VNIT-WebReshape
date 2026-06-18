/**
 * TechGadgets Store - Main Application JavaScript
 */

// Data & State
const products = [
    { id: 1, name: "iPhone 15 Pro", category: "phones", price: 999, description: "Latest Apple smartphone with A17 chip", emoji: "📱" },
    { id: 2, name: "Samsung Galaxy S24", category: "phones", price: 899, description: "Premium Android experience", emoji: "📱" },
    { id: 3, name: "Google Pixel 8", category: "phones", price: 699, description: "Pure Android with AI features", emoji: "📱" },
    { id: 4, name: "MacBook Pro 16", category: "laptops", price: 2499, description: "Powerful laptop for professionals", emoji: "💻" },
    { id: 5, name: "Dell XPS 15", category: "laptops", price: 1799, description: "Premium Windows ultrabook", emoji: "💻" },
    { id: 6, name: "ThinkPad X1 Carbon", category: "laptops", price: 1599, description: "Business laptop excellence", emoji: "💻" },
    { id: 7, name: "AirPods Pro", category: "accessories", price: 249, description: "Premium wireless earbuds", emoji: "🎧" },
    { id: 8, name: "Magic Keyboard", category: "accessories", price: 299, description: "Wireless keyboard with Touch ID", emoji: "⌨️" },
    { id: 9, name: "USB-C Hub", category: "accessories", price: 79, description: "Multi-port adapter for laptops", emoji: "🔌" },
];

let cart = [];
let currentPage = 1;
const itemsPerPage = 3;
let currentCategory = 'all';
let clockIntervalId = null;

// Initialization

function initializeApp() {
    setupEventListeners();
    loadProducts();
    startClock();
    console.log("App initialized successfully!");
}

// Product Functions

function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '<div class="loading-spinner">Loading products...</div>';
    
    // Simulate API delay
    setTimeout(() => {
        renderProducts();
    }, 500);
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    if (pageProducts.length === 0) {
        grid.innerHTML = '<p class="loading-spinner">No products found on this page.</p>';
    } else {
        grid.innerHTML = pageProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                        <button class="view-details-btn" data-id="${product.id}">Details</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update pagination info
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
    
    // Attach event listeners to new buttons
    attachProductEventListeners();
}

function attachProductEventListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            showProductModal(productId);
        });
    });
}

// Cart Functions

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length;
    
}

// Modal Functions

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = `$${product.price}`;
    
    document.getElementById('modal-backdrop').classList.remove('hidden');
    document.getElementById('product-modal').classList.remove('hidden');
}

function hideProductModal() {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('product-modal').classList.add('hidden');
}

// Clock Functions

function startClock() {
    clockIntervalId = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('clock-display').textContent = timeString;
    }, 1000);
}

function stopClock() {
    clearInterval(clockIntervalId);
    console.log("Clock stop requested");
    document.getElementById('clock-display').textContent = "Clock Stopped";
}

// API Functions

let userData = null;

async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        userData = await response.json();
        displayUserData();
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function displayUserData() {
    if (userData) {
        console.log("User loaded:", userData.name);
    } else {
        console.log("User data not available yet");
    }
}

async function submitContactForm(formData) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    return response.json();
}

function subscribeNewsletter(email) {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const statusEl = document.getElementById('newsletter-status');
        statusEl.textContent = 'Please enter a valid email address.';
        statusEl.style.color = '#dc3545';
        return;
    }
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        const statusEl = document.getElementById('newsletter-status');
        statusEl.textContent = 'Subscribed successfully!';
        statusEl.style.color = '#28a745';
        document.getElementById('newsletter-email').value = '';
        
        // Clear status message after 5 seconds
        setTimeout(() => {
            statusEl.textContent = '';
        }, 5000);
    })
    .catch(error => {
        const statusEl = document.getElementById('newsletter-status');
        statusEl.textContent = 'Subscription failed. Please try again.';
        statusEl.style.color = '#dc3545';
    });
}

// Event Listeners

function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            currentPage = 1;
            renderProducts();
        });
    });
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        renderProducts();
    });
    
    document.getElementById('contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const messageInput = document.getElementById('message').value.trim();
        
        // Validate inputs
        if (!nameInput || !emailInput || !messageInput) {
            const statusEl = document.getElementById('form-status');
            statusEl.textContent = 'Please fill in all fields.';
            statusEl.className = 'form-status error';
            return;
        }
        
        const formData = {
            name: nameInput,
            email: emailInput,
            message: messageInput
        };
        
        const statusEl = document.getElementById('form-status');
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusEl.textContent = 'Sending...';
        statusEl.className = '';
        
        try {
            await submitContactForm(formData);
            statusEl.textContent = 'Message sent successfully!';
            statusEl.className = 'form-status success';
            document.getElementById('contact-form').reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Clear status after 5 seconds
            setTimeout(() => {
                statusEl.textContent = '';
                statusEl.className = '';
            }, 5000);
        } catch (error) {
            statusEl.textContent = 'Failed to send message. Please try again.';
            statusEl.className = 'form-status error';
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
    
    // Modal close
    document.getElementById('modal-close').addEventListener('click', hideProductModal);
    document.getElementById('modal-backdrop').addEventListener('click', hideProductModal);
    
    // Modal add to cart
    document.getElementById('modal-add-cart').addEventListener('click', () => {
        const productName = document.getElementById('modal-title').textContent;
        const product = products.find(p => p.name === productName);
        if (product) {
            addToCart(product.id);
            hideProductModal();
        }
    });
    
    // Stop clock button
    document.getElementById('stop-clock-btn').addEventListener('click', stopClock);
    
    // Newsletter subscribe
    document.getElementById('subscribe-btn').addEventListener('click', () => {
        const email = document.getElementById('newsletter-email').value.trim();
        if (email) {
            subscribeNewsletter(email);
        } else {
            const statusEl = document.getElementById('newsletter-status');
            statusEl.textContent = 'Please enter your email address.';
            statusEl.style.color = '#dc3545';
        }
    });
    
    // Hero buttons
    document.getElementById('explore-btn').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('deals-btn').addEventListener('click', () => {
        alert('Deals coming soon!');
    });
}

initializeApp();
