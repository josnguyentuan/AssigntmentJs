const id = new URLSearchParams(window.location.search).get("id");

const searchForm = document.querySelector(".search");
const container = document.querySelector(".categories");
const productRender = document.querySelector(".products")
const renderCategories = async (term) => {
    let url = "http://localhost:3000/categories?_embed=products";

    const res = await fetch(url);
    const categories = await res.json();
    let template = '';
    categories.forEach(category => {
        template += `
    <li class="mb-2 btnCate" style="cursor: pointer" data-filter="${category.id}"><span class="reset-anchor" >${category.name}</span></li>
    `
    container.innerHTML = template;
   
    });
}
const renderProducts = async (term) => {
    let url = "http://localhost:3000/products?_expand=category"
    if (term) {
        url += `&q=${term}`;
    }
    const res = await fetch(url);
    const products = await res.json();
    let template = '';
    products.forEach(product => {
        template += `
      <div class="col-lg-4 col-sm-6 productFilter ${product.category.id}" >
      <div class="product text-center ">
        <div class="mb-3 position-relative">
          <div class="badge text-white badge-"></div>
          <a class="d-block" href="detail.html">
          <img class="img-fluid w-100" src="${product.image}" alt="...">
          </a>
          <div class="product-overlay">
            <ul class="mb-0 list-inline">
              <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#"><i class="far fa-heart"></i></a></li>
              <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-toggle="modal"><i class="fas fa-expand"></i></a></li>
            </ul>
          </div>
        </div>
        <h6> <a class="reset-anchor" href="detail.html?id=${product.id}">${product.title}</a></h6>
        <p class="small text-muted">$${product.price}</p>
      </div>
    </div>`;
        productRender.innerHTML = template;
    });
    const btns = document.querySelectorAll('.btnCate');
    const storeProducts = document.querySelectorAll('.productFilter');

    for (i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', (event) => {
            let filter = event.target.dataset.filter;
            console.log(filter);
            storeProducts.forEach((product)=> {
              
                    if (product.classList.contains(filter)){
                        product.style.display = 'block'
                    } else {
                        product.style.display = 'none'
                    }
                
            });
        });
    };
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    renderProducts(searchForm.term.value.trim());
})

window.addEventListener("DOMContentLoaded", function () {
     renderCategories();
     renderProducts();
})