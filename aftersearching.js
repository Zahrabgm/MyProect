const searchText = localStorage.getItem("searchText");

// get api products
fetch(`https://fakestoreapi.com/products`)
  .then(response => response.json())
  .then(items => {
    const searchResult = searchArray(items,searchText);
    console.log(searchResult)
    //localStorage.removeItem('searchText');
  })
  .catch(err => console.error("Error loading category items:", err));

// search function
function searchArray(array, searchTerm) {
    return array.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}