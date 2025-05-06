

fetch ('https://fakestoreapi.com/products/categories').then(Response =>{
    if(!Response.ok) {
        throw new Error("there is an error");    
    }
    return Response.json();
})
.then(data =>  {
    
 console.log(data)
})
.catch(erro =>{
    console.error(`Fetch error`)
    document.querySelector(`.nav-search.border`).innerHTML = `Something went wrong!`
})
