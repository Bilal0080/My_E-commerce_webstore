// script.js

// Sample Products Data
const products = [
    { id: 1, name: 'Laptop', price: 899.99, image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Headphones', price: 199.99, image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Smartphone', price: 599.99, image: 'https://via.placeholder.com/50' }
  ];
  
  // Cart array to store products added to the cart
  let cart = [];
  
  // Function to update cart display
  function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
  
    cart.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
  
      cartItemsContainer.appendChild(cartItemElement);
      total += item.price;
    });
  
    totalPriceElement.textContent = total.toFixed(2);
  }
  
  // Function to add product to cart
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push(product);
      updateCart();
    }
  }
  
  // Function to remove product from cart
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Example of adding products to cart
  addToCart(1);
  addToCart(2);
  
  // Add event listener to checkout button
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
  });
  