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
  
  //FUNGERAR EJ ÄNNU
  function deleteProductFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const updatedCart = cart.reduce((acc, product) => {
      if (product.id == productId) {
        if (product.quantity > 1) {
          // Minska antal
          product.quantity -= 1;
          acc.push(product);
        }
        // Om quantity = 1 → ta inte med den alls (radera)
      } else {
        acc.push(product);
      }
      return acc;
    }, []);
  
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    displayCart(); 
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
          const productCard = document.createElement("div");
          productCard.classList.add("card", "mb-3",);
          productCard.style.width = "100%";
          productCard.style.maxWidth = "600px";
          productCard.style.margin = "0 auto"; 
        
          productCard.innerHTML = `
          <div class="card-body d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <img src="${product.image}" class="img-fluid" style="max-height: 80px;" alt="${product.title}">
              <div>
                <h6 class="card-title mb-1">${product.title}</h6>
                <p class="card-text mb-0">Price: $${product.price}</p>
              </div>
            </div>
            
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-secondary btn-sm btn-decrease" data-id="${product.id}">−</button>
              <span class="fw-bold" id="quantity-${product.id}">${product.quantity}</span>
              <button class="btn btn-secondary btn-sm btn-increase" data-id="${product.id}">+</button>
            </div>
          </div>
        `;
          productContainer.appendChild(productCard);
        });
      }
      
      // Kör funktionen när sidan laddas
      document.addEventListener("DOMContentLoaded", displayCart);

    