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
    updateCartCount();
  }
  
  
  function decreaseProductQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    const productIndex = cart.findIndex((item) => item.id === productId);
  
    // Kontrollerar om produkten finns i kundvagnen
    if (productIndex !== -1) {
      cart[productIndex].quantity -= 1;
  
      if (cart[productIndex].quantity <= 0) {
        cart.splice(productIndex, 1); // Ta bort produkten helt
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart(); // Uppdatera vyn
      updateCartCount();
    }
  }
   
  function itemCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
  
    cart.forEach((item) => {
      count += item.quantity;
    });
  
    return count;
  }


  
  function totalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
  
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
  
    return total;
  }

  function updateCartCount() {
    const count = itemCount();
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }


  function emptyCart() {
    localStorage.removeItem("cart"); 
    displayCart();                   
    updateCartCount();  
    
  }

    function increaseProductQuantity(productId) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
      const productIndex = cart.findIndex((item) => item.id === productId);

    
      if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // Uppdatera visningen
        updateCartCount();
      }
    }
    
        
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productContainer = document.querySelector(".product-form-container");
        if (!productContainer) return; // Avsluta om elementet inte finns

      
        if (cart.length === 0) {
          productContainer.innerHTML = `
          <h4 style="margin: 2rem; text-align: center;">Your cart is empty</h4>
  `
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

         const clearButton = document.createElement("button");
        clearButton.textContent = "Empty Cart";
        clearButton.classList.add("btn", "btn-danger", "mt-4");
        clearButton.style.display = "block";
        clearButton.style.margin = "0 auto";

        clearButton.addEventListener("click", () => {
          if (confirm("Are you sure you want to empty the cart?")) {
            emptyCart();
          }
        });

        productContainer.appendChild(clearButton);


                // Event listener för −
        document.querySelectorAll(".btn-decrease").forEach((button) => {
          button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            decreaseProductQuantity(productId);
          });
        });

        // Event listener för +
        document.querySelectorAll(".btn-increase").forEach((button) => {
          button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            increaseProductQuantity(productId);
          });
  });

      }
      
      // Kör funktionen när sidan laddas
      document.addEventListener("DOMContentLoaded", displayCart);

    
