// Hämta kategori från URL, defaulta till "all"
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category") || "all";

// Mappa dina query-parametrar till API-kategorier
const categoryMap = {
  women: "women's clothing",
  men: "men's clothing",
  jewelery: "jewelery",
  electronics: "electronics",
};

// Anropa getData med den valda kategorin.
getData("https://fakestoreapi.com/products", selectedCategory);

// Här definieras getData och loadProducts-funktionerna
async function getData(url, category) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let products = await response.json();

    if (!products || !Array.isArray(products)) {
      throw new Error('Invalid or empty JSON data received.');
    }

    // Filtrera om kategori inte är "all"
    if (category !== "all" && categoryMap[category]) {
      products = products.filter(
        (product) => product.category === categoryMap[category]
      );
    }

    loadProducts(products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function loadProducts(products) {
  const productContainer = document.getElementById("product-container");

  productContainer.innerHTML = ""; // Rensa tidigare innehåll

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "g-4");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("col-lg-3", "col-md-6", "col-sm-12");

    productDiv.innerHTML = `
      <div class="card h-100">
        <div class="ratio ratio-4x3">
          <img 
            src="${product.image}" 
            class="card-img-top img-fluid" 
            style="object-fit: contain;" 
            alt="${product.title}"
            onclick="popUpWindow(
              '${product.image.replace(/'/g, "\\'")}', 
              '${product.title.replace(/'/g, "\\'")}', 
              '${product.description.replace(/'/g, "\\'")}', 
              '${product.price}'
            )"
          >
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-truncate">${product.title}</h5>
          <p class="card-text flex-grow-1">${product.description.substring(0, 100)}...</p>
          <p class="fw-bold">${product.price}$</p>
    
          <button 
            class="btn btn-outline-secondary mt-auto w-100 add-to-cart-btn"
            id="add-to-cart-btn-${product.id}"
          >
            Add to Cart
          </button>
        </div>
      </div>
    `;

    rowDiv.appendChild(productDiv);
  });

  productContainer.appendChild(rowDiv);

  // Lägg till event listener för varje "Add to Cart"-knapp utan att använda data-atribut
  products.forEach((product) => {
    const button = document.getElementById(`add-to-cart-btn-${product.id}`);
    
    if (button) {
      button.addEventListener("click", () => {
        // Här kan vi skapa en produktobjekt direkt och lägga till den i varukorgen
        const productToAdd = {
          id: product.id,
          title: product.title,
          image: product.image,
          description: product.description,
          price: product.price,
          quantity: 1,
        };

        // Lägg till produkt i varukorgen
        addProductToCart(productToAdd);
      });
    }
  });
}

function popUpWindow(imageSrc, title, description, price) {
  const modal = document.getElementById("customModal");
  document.getElementById("modalImage").src = imageSrc;
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDesc").textContent = description;
  document.getElementById("modalPrice").textContent = `$${price}`;

  modal.style.display = "block";
}

// Close modal when clicking on 'X' button
const closeBtn = document.querySelector(".close");
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    document.getElementById("customModal").style.display = "none";
  });
}
// Close modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("customModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
