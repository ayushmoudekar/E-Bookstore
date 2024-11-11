// Mock Product Data
const products = [
    { id: 1, title: "The Great Gatsby", price: 10 },
    { id: 2, title: "1984", price: 15 },
    { id: 3, title: "To Kill a Mockingbird", price: 12 }
];

let cart = [];
let orderHistory = [];

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        showHome();
    } else {
        alert('Please enter valid credentials.');
    }
}

// Display Product List
function showHome() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<h2>Product List</h2>';
    products.forEach((product) => {
        productList.innerHTML += `
            <div class="product-item">
                <span>${product.title} - $${product.price}</span>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
    document.getElementById('cart').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
}

// Add Product to Cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Display Cart
function showCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = 'block';
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('order-history').style.display = 'none';
    cartDiv.innerHTML = '<h2>Cart</h2>';
    if (cart.length === 0) {
        cartDiv.innerHTML += '<p>Your cart is empty.</p>';
        return;
    }
    cart.forEach((item) => {
        cartDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.title} - $${item.price} x ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
    });
}

// Remove Product from Cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartCount();
    showCart();
}

// Display Order History
function showOrderHistory() {
    const historyDiv = document.getElementById('order-history');
    historyDiv.style.display = 'block';
    document.getElementById('product-list').style.display = 'none';
    document.getElementById('cart').style.display = 'none';
    historyDiv.innerHTML = '<h2>Order History</h2>';
    if (orderHistory.length === 0) {
        historyDiv.innerHTML += '<p>No previous orders.</p>';
        return;
    }
    orderHistory.forEach((order, index) => {
        historyDiv.innerHTML += `<p>Order #${index + 1}: ${order.length} items</p>`;
    });
}

// Place Order (Optional)
function placeOrder() {
    if (cart.length > 0) {
        orderHistory.push([...cart]);
        cart = [];
        updateCartCount();
        alert('Order placed successfully!');
    }
}
