/*Seacrbar catagories Section*/

fetch (`https://fakestoreapi.com/products/categories`).then(Response =>{
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
.catch(erro =>{
    console.error(`Fetch error`)
    document.querySelector(`.nav-search.border`).innerHTML += `<p>Something went wrong!<p/>`
})

/* Language section*/
document.getElementById('languageSelector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;

    // Perform an action based on the selected language
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
  
 
  


    
   

