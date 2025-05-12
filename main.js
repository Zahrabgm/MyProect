// Products section
const boxSec = document.querySelector(".box-sec");
const morebtn = document.querySelector(".more-btn");

let startIndex = 0;
let endIndex = 8;

// Get API 8 products
//document.addEventListener("DOMContentLoaded", () => {
    fetch(`https://fakestoreapi.com/products`)
        .then(response => response.json())
        .then(allproducts => {
            createElement(allproducts);

            // Load more 8 products after clicking
            morebtn.addEventListener("click", () => {
                startIndex += 8;
                endIndex += 8;
                if (endIndex >= allproducts.length) {
                    boxSec.innerHTML += `<div class="box-contant">    
                                        <b>NO PRODUCT TO LOAD !</b>     
                                    </div>`;
                    morebtn.style.display = "none";
                } else {
                    createElement(allproducts);
                }
            });
        })
        .catch(err => console.error("Error loading products:", err));
//});

// Create function for showing products
function createElement(array) {
    array.slice(startIndex, endIndex).forEach((product) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <div class="box-contant">
                <a href="product.html"><h2>${product.title}</h2></a>
                <div class="box-img">
                    <a href="product.html"><img class="img-home" src="${product.image}" alt="${product.category}"></a>
                </div>
                <a href="product.html" class="see-more">See more</a>
            </div>
        `;
        boxSec.appendChild(box);
        box.querySelector(".box-contant").addEventListener("click", () => {
            localStorage.setItem("productId", product.id);
            localStorage.setItem("productCategory", product.category);
        });
    });
}



