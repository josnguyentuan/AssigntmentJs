const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector("#productView");
const addToCart = document.querySelector(".add-to-cart");
window.addEventListener("DOMContentLoaded", async ()=>{
    
    const res = await fetch("http://localhost:3000/products/" + id +"?_expand=category");
    const product = await res.json();
    const image = document.querySelectorAll(".image");
    image[1].innerHTML = `<img class="w-100" src="${product.image}" alt="..."></img>`;
    image[0].innerHTML = `<img class="w-100" src="${product.image}" alt="..."></img>`;

    const title = document.querySelector('.title');
    title.innerHTML = product.title
    const price = document.querySelector('.price');
    price.innerHTML = `$`+ product.price
    const description = document.querySelector('.description');
    description.innerHTML = product.description.slice(0,30) + "...";
    const productId = document.querySelector(".productId");
    productId.innerHTML = product.id;
    const category = document.querySelector('.category');
    category.innerHTML= product.category.name;
    const  productdesc = document.querySelector('.productdesc');
    productdesc.innerHTML = product.description;
    addToCart.addEventListener('click', async (e)=>{
        
        e.preventDefault();
        const form = document.querySelector(".form");
        const doc = {
            productId: product.id,
            name: product.title,
            price: product.price,
            amount: Number(form.amount.value)
        }
        await fetch('http://localhost:3000/orders', {
            method: "POST",
            body: JSON.stringify(doc), 
            headers: {
                "Content-Type": 'application/json'
            }
        })
        window.location.replace("cart.html");

    })

   
});

