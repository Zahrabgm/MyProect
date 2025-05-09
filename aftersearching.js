const searchText = localStorage.getItem("searchText");
const searchCategory = localStorage.getItem("searchCategory");
//const searchText = "men";
const searchList = document.querySelector(".search-list");
const notice = document.querySelector(".notice");

// get api products
fetch(`https://fakestoreapi.com/products`)
  .then(response => response.json())
  .then(items => {
    const searchResult = searchArray(items, searchText,searchCategory);
   
    notice.textContent = `Result: ${searchResult.length} items found`;

    searchResult.forEach((product) => {
      const box = document.createElement("div");
      box.classList.add("box-search");
      box.innerHTML = `
                          <div class="box-contant">
                              <a href="product.html"><h2>${product.title}</h2></a>
                              <div class="box-img">
                                  <a href="product.html"><img class="img-home" src="${product.image}" alt="${product.category}"></a>
                              </div>
                              <a href="product.html" class="see-more">See more</a>
                          </div>
                          `;
      searchList.appendChild(box);
      box.querySelector(".box-contant").addEventListener("click", () => {
        localStorage.setItem("productId", product.id);
        localStorage.setItem("productCategory", product.category);
      });
    });

    //localStorage.removeItem('searchText');
  })
  .catch(err => console.error("Error loading category items:", err));

// search function
function searchArray(array, searchText, searchCategory) {
  if (searchCategory && searchCategory) {
    array = array.filter(product => product.category === searchCategory);
    return array.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if (searchText  && !searchCategory) {
    return array.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else if(!searchText && searchCategory) {
    return array.filter(product => product.category === searchCategory);
  }
  else {
    return array;
  }
}
// the same function but is written shorter
/*function searchArray(array, searchText, searchCategory) {
  return array.filter(product => {
    const matchCategory = searchCategory ? product.category === searchCategory : true;
    const matchText = searchText ? product.title.toLowerCase().includes(searchText.toLowerCase()) : true;
    return matchCategory && matchText;
  });
}*/