const container = document.querySelector(".products");
const renderProducts = async (term) => {

    let url = "http://localhost:3000/products?_expand=category";
    if (term) {
        url += `&q=${term}`;
    }
    const res = await fetch(url);
    const products = await res.json();
    let template = '';
    products.forEach(product => {
        template += `
                         <tr data-id="${product.id}">
                                <td>${product.id}</td>
                                <td>
                                <img src="${product.image}" width="50px" height="50px" >
                                </td>
                                <td>${product.title.slice(0,20)}...</td>
                                <td>${product.price}</td>
                                <td>${product.description.slice(0,10)}...</td>
                                <td>${product.category.name}</td>
                                <td>
                                    <button  class="btnDel btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </button> 
                                    <a href="./edit-product.html?id=${product.id}"  class="btnEdit btn btn-primary"> 
                                    <i class="fa fa-edit"></i>
                                    </a> 

                                </td>
                            </tr>
             `

        container.innerHTML = template;
        var del = document.querySelector(`[data-id='${product.id}'] .btnDel`);
        del.addEventListener("click", () => {
            console.log("a");
            let del = confirm("Do you want to delete?");
            if (del) {
                fetch(`http://localhost:3000/products/${product.id}`, {
                        method: 'DELETE',
                    })
                    .then(res => res.json())
                    .then(() => location.reload)

            }
        })
    });
}

window.addEventListener("DOMContentLoaded", () => renderProducts())