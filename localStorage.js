function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Product added to cart!", product);
  }
  
    function deleteProductFromCart(productId) {
    }

    function clearCart() {
    }

    function addProductByID() {
    }
        
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productContainer = document.querySelector(".product-form-container");
        if (!productContainer) return; // Avsluta om elementet inte finns

      
        if (cart.length === 0) {
          productContainer.innerHTML = "<p>Your cart is empty.</p>";
          return;
        }
      
        productContainer.innerHTML = ""; // Rensa tidigare innehåll
      
        cart.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("card", "mb-3");
          productDiv.innerHTML = `
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${product.image}" class="img-fluid rounded-start" alt="${product.title}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><small class="text-muted">Price: $${product.price}</small></p>
                  <p class="card-text"><small class="text-muted">Quantity: ${product.quantity}</small></p>
                </div>
              </div>
            </div>
          `;
          productContainer.appendChild(productDiv);
        });
      }
      
      // Kör funktionen när sidan laddas
      document.addEventListener("DOMContentLoaded", displayCart);

    