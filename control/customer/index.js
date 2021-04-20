const container = document.querySelector(".products");
const renderProducts = async (term) => {

    let url = "http://localhost:3000/customers";
    if (term) {
        url += `&q=${term}`;
    }
    const res = await fetch(url);
    const customers = await res.json();
    let template = '';
    customers.forEach(customer => {
        template += `
                         <tr data-id="${customer.id}">
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.phone}</td>
                                <td>${customer.address}</td>
                                <td>${customer.email}</td>
                                <td>
                                    <button  class="btnDel btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i>
                                    </button> 
                                    <a href="./edit-customer.html?id=${customer.id}"  class="btnEdit btn btn-primary"> 
                                    <i class="fa fa-edit"></i>
                                    </a> 

                                </td>
                            </tr>
             `

        container.innerHTML = template;
        var del = document.querySelector(`[data-id='${customer.id}'] .btnDel`);
        del.addEventListener("click", () => {
            console.log("a");
            let del = confirm("Do you want to delete?");
            if (del) {
                fetch(`http://localhost:3000/customers/${customer.id}`, {
                        method: 'DELETE',
                    })
                    .then(res => res.json())
                    .then(() => location.reload)

            }
        })
    });
}

window.addEventListener("DOMContentLoaded", () => renderProducts())