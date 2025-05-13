const searchInput = document.querySelector(".search-input");
const searchbtn = document.querySelector(".search-icon");
const searchCategories = document.querySelector(".nav-search");

fetch(`https://fakestoreapi.com/products/categories`)
    .then(response => response.json())
    .then(categories => {
        const select = document.createElement("select");
        select.classList.add("search-select");
        searchCategories.prepend(select);

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "All";
        select.appendChild(defaultOption);
        select.addEventListener("change", () => {
            const selectedCategory = select.value;
            if (selectedCategory) {
                localStorage.setItem("searchCategory", selectedCategory);
            }
        });
        categories.forEach((category) => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });

        if (searchInput || searchbtn) {
            searchbtn.addEventListener("click", handleSearch);

            searchInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault(); // stops form from submitting
                    handleSearch();
                }
            });
        } else {
            console.error("searchInput or searchbtn element not found.");
        }
    })
    .catch(err => console.error("Error loading search categories:", err));

// get quantity in cart and show up
const storedProducts = JSON.parse(localStorage.getItem('buyProducts'));
//const storedProducts = getWithExpiry('buyProducts');
//console.log(storedProducts);
const cartQuantity = document.querySelector("#cart");
const sum = storedProducts.reduce((total, product) => total + parseInt(product.quantity), 0);
cartQuantity.innerHTML = sum;

cartQuantity.addEventListener("click", () => {
    window.location.href = "cart.html";
})
// check timeout of products in cart
function getWithExpiry(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;

    if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null; // expired
    }
    return item.value;
  }

 
