/*

fetch ('https://fakestoreapi.com/products/categories').then(Response =>{
    if(!Response.ok) {
        throw new Error("there is an error");    
    }
    return Response.json();
})
.then(data =>  {

 console.log(data)

 const resultsContainer = document.querySelector(`.nav-search border`)
 resultsContainer.innerHTML += `<p>Result: ${JSON.stringify(data)}</p>`
})
.catch(error =>{
    console.error(`Fetch error:`, error);
    document.querySelector('.nav-search.border').innerHTML += `<p>Something went wrong!<p/>`
})


/* Language section
document.getElementById('languageSelector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;

    switch (selectedLanguage) {
        case 'en':
            console.log('Language changed to English');
            document.body.innerHTML += `<p>Language changed to English</p>`;
            break;
        case 'de':
            console.log('Language changed to Deutsch');
            document.body.innerHTML += `<p>Sprache geändert zu Deutsch</p>`;
            break;
        default:
            console.log('Language not supported');
            document.body.innerHTML += `<p>Language not supported</p>`;
    }
});
*/
// Optional: Close the dropdown menu when clicking outside

document.addEventListener('DOMContentLoaded', () =>  {
const menuToggle = document.querySelector('#menu-toggle');
const menuList = document.querySelector('#menu-list');

if (menuToggle && menuList) {
    menuToggle.addEventListener('click', function () {
        menuList.classList.toggle('active');
    })
} else {
    console.error('Menu toggle or menu list element not found', error)}
});

// Footer Section
document.querySelector('.footer-panel1').addEventListener('click', () => {
    window.scrollTo ({
        top: 0,
        behavior:'smooth'
    })
});

// Products section
const boxSec = document.querySelector(".box-sec");
const morebtn = document.querySelector(".more-btn");

let startIndex = 0;
let endIndex = 8;
// get api 8 products
document.addEventListener("DOMContentLoaded", () => {
    fetch(`https://fakestoreapi.com/products`)
        .then(response => response.json())
        .then(allproducts => {
            createElement(allproducts);

            // load more 8 products after clicking
            morebtn.addEventListener("click", () => {
                startIndex += 8;
                endIndex += 8;
                if (endIndex >= allproducts.length) {
                    boxSec.innerHTML += `<div class="box-contant">    
                                        <b>NO PRODUCT TO LOAD !</b>     
                                    </div>`;
                    morebtn.style.display = "none";

                }
                else {
                    createElement(allproducts);
                }
            })
        })
        .catch(err => console.error("Error search/loading products:", err));
});

        // search section - redirect to new page
        searchbtn.addEventListener('click', () => {
            localStorage.setItem("searchText", searchInput.value);
            window.location.href = 'aftersearching.html';
        })
    .catch(err => console.error("Error loading products:", err));
    
// create function for showing produtcs
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
    })};
  
    
