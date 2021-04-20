const container = document.querySelector(".categories");
const renderProducts = async (term) => {

    let url = "http://localhost:3000/categories?_embed=products";
    if (term) {
        url += `&q=${term}`;
    }
    const res = await fetch(url);
    const products = await res.json();
    let template = '';
    products.forEach(category => {
        template += `
                         <tr data-id="${category.id}">
                         <td>${category.id}</td>

                                <td>${category.name}</td>
                                <td><span style="width: 30px; height: 30px; background-color:#5352ed;color: white; padding: 10px; text-align: center; border-radius: 10px">${category.products.length}</span></td>

                                <td>
                                    <button  class="btnDel btn btn-danger"> X </button> 
                                    <a href="./edit-product.html?id=${category.id}"  class="btnEdit btn btn-primary"> 
                                    <i class="fa fa-edit"></i>
                                    </a> 

             
                                    </td>
                            </tr>
             `

        container.innerHTML = template;
        var del = document.querySelector(`[data-id='${category.id}'] .btnDel`);
        del.addEventListener("click", () => {
            console.log("a");
            let del = confirm("Do you want to delete?");
            if (del) {
                fetch(`http://localhost:3000/categories/${category.id}`, {
                        method: 'DELETE',
                    })
                    .then(res => res.json())
                    .then(() => location.reload)

            }
        })
    });
}

window.addEventListener("DOMContentLoaded", () => renderProducts())