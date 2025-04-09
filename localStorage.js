//Lägger till en produkt i kundvagnen.
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
  
  //Uppdaterar det totala priset i kundvagnen när en produkt läggs till.
  function totalPriceElement(productId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(item => item.id === productId);
    const totalElement = document.getElementById(`product-total-${productId}`);
  
    if (product && totalElement) {
      totalElement.textContent = `Total: $${(product.price * product.quantity).toFixed(2)}`; //toFixed 2 för att visa två decimaler
    }
  }

  //Visar antalet produkter i kundvagnen.
  function itemCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
  
    cart.forEach((item) => {
      count += item.quantity;
    });
  
    return count;
  }
  

  //Uppdaterar antalet produkter i kundvagnen (IKONEN).
  function updateCartCount() {
    const count = itemCount();
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  //Tar bort en produkt från kundvagnen.
  function removeProduct(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
    setPrice();
  }


  //Tömmer hela kundvagnen.
  function emptyCart() {
    localStorage.removeItem("cart"); 
    displayCart();                   
    updateCartCount(); 
    setPrice(); 
    
  }

  //Beräknar det totala priset för alla produkter i kundvagnen.
  function totalPrice() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  
  //Visar det totala priset i kundvagnen.
  function setPrice() {
    const total = totalPrice();
    const totalPriceElement = document.getElementById("total-price");
    if (totalPriceElement) {
      totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  //Lägger till event listeners för att öka kvantiteten
    function increaseProductQuantity(productId) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
      const productIndex = cart.findIndex((item) => item.id === productId);

    
      if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // Visa uppdaterad kundvagn
        updateCartCount();
      }
    }

    //Lägger till event listeners för att minska kvantiteten
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
        displayCart();  //§ Visa uppdaterad kundvagn
        updateCartCount();
      }
    }
     
    
        
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productContainer = document.querySelector(".product-form-container");
        if (!productContainer) return; // Avsluta om elementet inte finns

      
        if (cart.length === 0) {
          productContainer.innerHTML = `
          <h4 style="margin: 2rem; text-align: center;">Your cart is empty</h4>`
          return;
        }
      
        productContainer.innerHTML = ""; // Rensa tidigare innehåll

        let total = 0;
      
        cart.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("card", "mb-3",);
          productCard.style.width = "100%";
          productCard.style.maxWidth = "600px";
          productCard.style.margin = "0 auto"; 
        
          productCard.innerHTML = `
          <div class="card-body position-relative">

            <!-- X Ta bort-knapp i övre högra hörnet -->
            <button class="btn btn-sm  btn-remove position-absolute top-0 end-0 m-2" data-id="${product.id}">
              &times;
            </button>

            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center gap-3">
                <img src="${product.image}" class="img-fluid" style="max-height: 80px;" alt="${product.title}">
                <div>
                  <h6 class="card-title mb-1">${product.title}</h6>
                  <p class="card-text mb-0 product-total" id="product-total-${product.id}">
                    Price: $${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div class="d-flex align-items-center gap-2">
                <button class="btn btn-secondary btn-sm btn-decrease" data-id="${product.id}">−</button>
                <span class="fw-bold" id="quantity-${product.id}">${product.quantity}</span>
                <button class="btn btn-secondary btn-sm btn-increase" data-id="${product.id}">+</button>
              </div>
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
            setPrice();

          });
        });

        // Event listener för +
        document.querySelectorAll(".btn-increase").forEach((button) => {
          button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            increaseProductQuantity(productId);
            setPrice();
          });
  });

      // Event listener för X
      document.querySelectorAll(".btn-remove").forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.getAttribute("data-id"); 
          if (confirm("Are you sure you want to remove this product?")) {
            removeProduct(productId);
          }
        });
      });
      
    }


      // Kör funktionen när sidan laddas
       document.addEventListener("DOMContentLoaded", displayCart);
    
      
      function displayPurshase() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productContainer = document.querySelector(".purchase-items-container");
        if (!productContainer) return;
      
        if (cart.length === 0) {
          productContainer.innerHTML = `
            <h4 style="margin: 2rem; text-align: center;">Din varukorg är tom</h4>`;
          return;
        }
        productContainer.innerHTML = ""; // Töm innan vi lägger till

        setPrice();
      
        cart.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("card", "mb-3");
          productCard.style.width = "100%";
          productCard.style.maxWidth = "600px";
          productCard.style.margin = "0 auto";
      
          productCard.innerHTML = `
            <div class="card-body d-flex align-items-center gap-3">
              <img src="${product.image}" class="img-fluid" style="max-height: 80px;" alt="${product.title}">
              <div>
                <h6 class="card-title mb-1">${product.title}</h6>
                <p class="card-text mb-0">Quantity: ${product.quantity}</p>
                <p class="card-text mb-0">Price: $${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            </div>
          `;
      
          productContainer.appendChild(productCard);
          
        });

        // Töm varukorgen
      localStorage.removeItem("cart");

      // Uppdatera kundvagnen i headern
      updateCartCount();

        
      }
      

     
      
      
    
