//const productId = getItem("productId");
//const productCategory = getItem("productCategory");
const productId = 1;
const productCategory = "men's clothing";
const productLeftSide = document.querySelector(".product-left-side");
const productMiddleSide = document.querySelector(".product-middle-side");
const productRightSide = document.querySelector(".product-right-side");
const rightPrice = document.querySelector(".right-price");
const otherProducts = document.querySelector(".other-products");
const pathProduct = document.querySelector(".path-product");
const relatedProduct = document.querySelector(".related-products");

// get api 1 product
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(productData => {
        //console.log(productData);
        const rate = Math.ceil(productData.rating.rate);
        let stars = "";

        for (let i = 1; i <= rate; i++) {
            stars += "⭐";
        }

        console.log(rate)
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
    });

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

// get api categories 
fetch(`https://fakestoreapi.com/products/categories`)
  .then(response => response.json())
  .then(categories => {
    categories.forEach((category) => {
      otherProducts.innerHTML += `<div><a href="">${category}</a></div>`;
    });
  })
  .catch(err => console.error("Error loading categories:", err));

// get api products has the same category
fetch(`https://fakestoreapi.com/products/category/${productCategory}`)
  .then(response => response.json())
  .then(items => {
    relatedProduct.innerHTML = ""; 
    items.forEach((item) => {
        relatedProduct.innerHTML += `<div class="small-image">
                                        <a href=""><img src="${item.image}" alt="${item.title}" style="width:100px;"></a>
                                        <p class="more">${item.title}</p>
                                        <p class="more">⭐⭐⭐⭐ ${item.rating.count}</p>
                                        <h4 class="more">${item.price} €</h4>
                                    </div>`;
    });
  })
  .catch(err => console.error("Error loading category items:", err));







