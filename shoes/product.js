// Function to add product to cart
function addToCart(button) {
    try {
        const card = button.closest('.card');
        const productImage = card.querySelector('img').src; // Get the product image source
        const productId = card.dataset.id; // Get the product ID
        const productName = card.querySelector('h3').textContent; // Get the product name
        const productPrice = parseFloat(card.querySelector('.price').textContent.replace('$', '')); // Parse the product price

        // Create the product object
        const product = { 
            id: productId, 
            name: productName, 
            price: productPrice, 
            image: productImage 
        };

        // Retrieve cart from localStorage or create a new array if it doesn't exist
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product); // Add the product to the cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage

        // Display an alert to the user
        alert(`${productName} has been added to your cart!`);

        // Update cart display
        updateCartDisplay();
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
}

// Function to update the cart display
function updateCartDisplay() {
    try {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart items
        const cartContainer = document.getElementById('cart-items'); // Cart display container
        const totalPrice = document.getElementById('total-price'); // Total price element

        // Clear current cart display
        cartContainer.innerHTML = '';
        let total = 0;

        // Loop through cart items to render them
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.dataset.id = item.id;

            // Add product details to the cart item div
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto; margin-right: 10px;">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeItemFromCart('${item.id}')">Remove</button>
            `;
            cartContainer.appendChild(itemDiv);

            // Update total price
            total += item.price;
        });

        // Update total price in the DOM
        totalPrice.textContent = total.toFixed(2);
    } catch (error) {
        console.error("Error updating cart display:", error);
    }
}

// Function to remove an item from the cart
function removeItemFromCart(productId) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCartItems = cart.filter(item => item.id !== productId); // Remove item by ID
        localStorage.setItem('cart', JSON.stringify(updatedCartItems)); // Update localStorage
        updateCartDisplay(); // Refresh cart display
    } catch (error) {
        console.error("Error removing item from cart:", error);
    }
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
    try {
        updateCartDisplay(); // Update cart when the page loads
        console.log("Cart display initialized.");
    } catch (error) {
        console.error("Error initializing cart display:", error);
    }
});

// Function to apply filters when the filter button is clicked
function applyFilters() {
    const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

    // Filter products based on name and price range
    const filteredProducts = allProducts.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchName);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesName && matchesPrice;
    });

    // Display the filtered products
    displayProducts(filteredProducts);
}
