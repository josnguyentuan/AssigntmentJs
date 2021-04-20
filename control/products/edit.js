const form = document.querySelector("form");

const id = new URLSearchParams(window.location.search).get("id");
window.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:3000/products/" + id);
    const product = await res.json();
    let template = `
                                                <div class="col-md-4">
                                                    <label>Id</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group has-icon-left">
                                                        <div class="position-relative">
                                                            <input type="text" class="form-control"
                                                                placeholder="ID Product" value ="${product.id}" id="id" disabled>
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label>Name</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group has-icon-left">
                                                        <div class="position-relative">
                                                            <input type="text" class="form-control"
                                                                placeholder="Name product" value = "${product.title}" id="name">
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label>Price</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group has-icon-left">
                                                        <div class="position-relative">
                                                            <input type="text" class="form-control" id="price"
                                                                placeholder="10000000" value = "${product.price}">
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label>Image Product</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group has-icon-left">
                                                        <div class="position-relative">
                                                            <input type="text" class="form-control"
                                                                placeholder="Image link" value="${product.image}"  id="image">

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label>Description</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group has-icon-left">
                                                        <div class="position-relative">
                                                            <div class="form-floating">
                                                                <textarea class="form-control" 
                                                                    id="description" rows="10">${product.description}</textarea>
                                                                <label for="floatingTextarea">Description Product</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                <label>Type of product</label>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <select class="form-select" id="category">
                                                    </select>
                                                </div>
                                            </div>
                                                <div class="col-12 d-flex justify-content-end">
                                                <button id="save" type="submit" class="btn btn-primary me-1 mb-1">Submit</button>
                                            </div>
    `
    form.innerHTML = template;
    const container = document.querySelector("#category");
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
    }
    renderCategory();
    window.addEventListener("DOMContentLoaded", () => renderCategory())

});
const editProduct = async (e) => {
    e.preventDefault();
    const doc = {
        id: form.id.value,
        name: form.name.value,
        price: form.price.value,
        description: form.description.value
    }
    await fetch('http://localhost:3000/products/' + id, {
        method: "PUT",
        body: JSON.stringify(doc),
        headers: {
            "Content-Type": 'application/json'
        }
    })

    window.location.replace("/admin/product/list-products.html");

}
form.addEventListener("submit", editProduct);