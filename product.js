const productId = localStorage.getItem("productId");
const productCategory = localStorage.getItem("productCategory");

const productLeftSide = document.querySelector(".product-left-side");
const productMiddleSide = document.querySelector(".product-middle-side");
const productRightSide = document.querySelector(".product-right-side");
const rightPrice = document.querySelector(".right-price");
const otherProducts = document.querySelector(".other-products");
const pathProduct = document.querySelector(".path-product");
const relatedProduct = document.querySelector(".related-products");

//cart
const addbtn = document.querySelector(".add");
const buybtn = document.querySelector(".buy");
const quantity = document.querySelector("#quantity");
const buyProducts = [];


// get api 1 product
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => response.json())
  .then(productData => {
    console.log(productId);
    const rate = Math.ceil(productData.rating.rate);
    let stars = "";

    for (let i = 1; i <= rate; i++) {
      stars += "⭐";
    }

    //console.log(rate)
    productLeftSide.innerHTML = `<img class= "image-product" src="${productData.image}" alt="${productData.category}">`;
    productMiddleSide.innerHTML = `
                                        <h2>${productData.title}</h2>
                                        <p>Rating: ${productData.rating.rate} ${stars}</p>
                                        <p>Reviews: ${productData.rating.count}</p>
                                        <h3>${productData.price} €</h3>
                                        <p>${productData.description}</p>
                                    `;
    rightPrice.innerText = productData.price + " €";
    pathProduct.innerHTML = productData.category + " > " + productData.title;

    // add to cart and transfer to middle side
    addbtn.addEventListener("click", () => {
      const existingProducts = JSON.parse(localStorage.getItem('buyProducts')) || [];
    
      const productId = productData.id;
      const productQuantity = parseInt(quantity.value); // Make sure it's a number
    
      const existingProduct = existingProducts.find(product => product.id === productId);
    
      if (existingProduct) {
        existingProduct.quantity = parseInt(existingProduct.quantity) + productQuantity;
  
      } else {
     
        existingProducts.push({
          id: productData.id,
          name: productData.title,
          image: productData.image,
          price: productData.price,
          quantity: productQuantity
        });
       
      }
      localStorage.setItem('buyProducts', JSON.stringify(existingProducts));
      /*localStorage.setItem('buyProducts', JSON.stringify({
        value: existingProducts,
        expiry: Date.now() + 600000 // expires in 1 min
      }));*/
      localStorage.setItem("img-middlesite",productData.image)
      window.location.href = "middleside.html";
    });
    
    buybtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
    
  })
  .catch(err => console.error("Error this product:", err));

/* async function getData(){
   const result = await fetch(`https://fakestoreapi.com/products/${productId}`);
   const data = await result.json();
   console.log(data);
  } 
const productData = getData();
productLeftSide.innerHTML = `<img src="${productData.image}" alt="${productData.category}">`;
   productMiddleSide.innerHTML = `
     <h3>${productData.title}</h3>
     <p>Rating: ${productData.rating.rate}</p>
     <span>Reviews: ${productData.rating.count}</span>
     <h3>${productData.price} €</h3>
     <p>${productData.description}</p>`;*/

// get api categories to show on the top
fetch(`https://fakestoreapi.com/products/categories`)
  .then(response => response.json())
  .then(categories => {
    categories.forEach((category) => {
      otherProducts.innerHTML += `<div><a href="">${category}</a></div>`;
    });
  })
  .catch(err => console.error("Error loading categories:", err));

// get api products that have the same category
fetch(`https://fakestoreapi.com/products/category/${productCategory}`)
  .then(response => response.json())
  .then(items => {
    relatedProduct.innerHTML = "";
    items.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("small-image");
      div.innerHTML = `
                                        <a href="product.html"><img src="${item.image}" alt="${item.title}" style="width:100px;"></a>
                                        <p class="more">${item.title}</p>
                                        <p class="more">⭐⭐⭐⭐ ${item.rating.count}</p>
                                        <h4 class="more">${item.price} €</h4>
                                    `;
      relatedProduct.appendChild(div);
      div.addEventListener("click", () => {
        localStorage.setItem("productId", item.id);
        localStorage.setItem("productCategory", item.category);
      });
    });
  })
  .catch(err => console.error("Error loading category items:", err));







