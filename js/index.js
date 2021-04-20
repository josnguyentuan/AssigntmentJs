const searchForm = document.querySelector(".search");
const container = document.querySelector(".products");
const renderProducts = async (term) => {
  let url = "http://localhost:3000/products?_sort=price";
  if (term) {
    url += `&q=${term}`;
  }
  const res = await fetch(url);
  const products = await res.json();
  let template = '';
  products.forEach(product => {
    template += `
    <div class="col-xl-3 col-lg-4 col-sm-6" > 
    <div class="product text-center" >
      <div class="position-relative mb-3">
        <div class="badge text-white badge-"></div><a class="d-block"  href="detail.html"><img class="img-fluid w-100" src="${product.image}" alt="..."></a>
        <div class="product-overlay">
          <ul class="mb-0 list-inline">
            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="detail.html?id=${product.id}"><i class="far fa-heart"></i></a></li>
            <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-toggle="modal"><i class="fas fa-expand"></i></a></li>
          </ul>
        </div>
      </div>
      <h6> <a class="reset-anchor" href="detail.html?id=${product.id}">${product.title}</a></h6>
      <p class="small text-muted">$${product.price}</p>
    </div>
  </div>
    `
    container.innerHTML = template;
  });
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderProducts(searchForm.term.value.trim());
})



window.addEventListener("DOMContentLoaded",  function() {
  renderProducts();
})
 
