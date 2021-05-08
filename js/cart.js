const container = document.querySelector(".orders");
const renderProducts = async (term) => {
    let url = "http://localhost:3000/orders?_expand=product";
    if (term) {
        url += `&q=${term}`;
    }
    const res = await fetch(url);
    const orders = await res.json();
    let template = '';
    orders.forEach(order => {
        template += `
    <tr class="text-center" data-id="${order.id}">
    <th class="pl-0 border-light" scope="row">
      <div class="media align-items-center">
      <a class="reset-anchor d-block animsition-link" href="detail.html?id=${order.product.id}">
      <img src="${order.product.image}" alt="..." width="70"/>
      </a>
        <div class="media-body ml-3"><strong class="h6"><a class="reset-anchor animsition-link" href="detail.html">${order.name}</a></strong></div>
      </div>
    </th>
    <td class="align-middle border-light">
      <p class="mb-0 small">$${order.price}</p>
    </td>
    <td class="align-middle border-light">
      ${order.amount}
    </td>
    <td class="align-middle border-light">
      <p class="mb-0 small">$${order.amount*order.price}</p>
    </td>
    <td class="align-middle border-light">
    <a class="reset-anchor btnDel"  >
    <i class="fas fa-trash-alt small text-muted">
    </i></a>
    </td>
  </tr>
`
        container.innerHTML = template;
        var del = document.querySelector(`[data-id='${order.id}'] .btnDel`);
        del.addEventListener("click", () => {
            let del = confirm("Do you want to delete?");
            if (del) {
                fetch(`http://localhost:3000/orders/${order.id}`, {
                        method: 'DELETE',
                    })
                    .then(res => res.json())
                    .then(() => location.reload())

            }
        })
    });
    totalPrice = orders.reduce(function (sum, order, amount) {
        return sum + order.price * order.amount;
    }, 0);
    const total = document.querySelector('.total');
    total.innerHTML = "$" + totalPrice.toFixed(2);

}




window.addEventListener("DOMContentLoaded", function () {
    renderProducts();
})