const form = document.querySelector("form");
const container = document.querySelector("#categoryId");
const renderCategory = async (e) => {
    let url = "http://localhost:3000/categories";
    const res = await fetch(url);
    const products = await res.json();
    let template = '';
    products.forEach(category => {
        template += `
                <option value="${category.id}">${category.name}</option>      
             `
        return template;
    });
    container.innerHTML = template;
    console.log(template);
}
renderCategory();
const createProduct = async (e) => {
    e.preventDefault();
    const doc = {
        title: form.title.value,
        price: Number(form.price.value),
        description: form.description.value,
        image: form.image.value,
        categoryId: form.categoryId.value
    }
    await fetch('http://localhost:3000/products', {
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
            "Content-Type": 'application/json'
        }
    })


    window.location.replace("/admin/product/list-products.html");
}

form.addEventListener("submit", createProduct);