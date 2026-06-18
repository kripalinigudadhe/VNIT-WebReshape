1. Fixed "styles.css" linking error in index.html as earlier "style.css" was mentioned.
<link rel="stylesheet" href="styles.css">

2. Display products in product grid with provided data in products[] fetch this data and display in product grid properly.
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
    
3. Fixed navbar linking using <a href > tag in home, product and contact.
 <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>

4. In .ghost-overlay in styles.css add z-index: -1; for working.

.ghost-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: transparent;
    pointer-events: none;
}

5. In app.js fix the clock current time display error.

function startClock() {
    clockIntervalId = setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('clock-display').textContent = timeString;
    }, 1000);
}

6. Fixed all the alerts when opertions perform or done the alerts popped properly according to it.

7. Fixed the issue of product in the cart now products are successfully added into the cart. 

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

8. Solved the bug in contact form now users can input their personal information. These information will be submitted properly when click on submit button and submission message was displayed.
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
        
9. Fixed the products details button so when user click on Details button of any product the details of that perticular product is shown.
    
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            showProductModal(productId);
        });
    });

10. Solve the error in Subscribe to Newsletter form and also add proper validation of email so when user enter proper email and click on subcribe the "Subscribed successfully!" is displayed.
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

11. Products are flitered now and product filtering work properly according to selected types as phones, laptops and accessories. 

12. Fixed the stop watch button issue as now, watch gets stopped after clcking on "Stop clock" button.
function stopClock() {
    clearInterval(clockIntervalId);
    console.log("Clock stop requested");
    document.getElementById('clock-display').textContent = "Clock Stopped";
}

13. Fixed the popped message issue when clicked on View Deals button.

14. Previous and Next Buttons was fixed so user can view all products going next using next button and also come back using previous button. 
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
    
15. When user click on Explore Products button then it goes to products section was fixed.