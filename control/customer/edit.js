const form = document.querySelector("form");

const id = new URLSearchParams(window.location.search).get("id");
window.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:3000/customers/" + id);
    const cus = await res.json();
    let template = `
    <div class="col-md-4">
    <label>Id Category</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <div class="position-relative">
            <input type="text" class="form-control" value="${cus.id}" placeholder="ID Customer"
                id="id" readonly>
        </div>
    </div>
</div>
<div class="col-md-4">
    <label>Name Customer</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <div class="position-relative">
            <input type="text" class="form-control" placeholder="Name Customer"
                id="name" value="${cus.name}" required>
        </div>
    </div>
</div>
<div class="col-md-4">
    <label>Phone Number</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <div class="position-relative">
            <input type="text" class="form-control" placeholder="Phone Number"
                id="phone" value="${cus.phone}" required>
        </div>
    </div>
</div>
<div class="col-md-4">
    <label>Email Address</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <div class="position-relative">
            <input type="email" class="form-control" placeholder="Email Address"
                name="email"  value="${cus.email}" required>
        </div>
    </div>
</div>
<div class="col-md-4">
    <label>Address</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <div class="position-relative">
            <input type="text" class="form-control" placeholder="Address"
                name="address" value="${cus.address}" required>
        </div>
    </div>
</div>
<div class="col-md-4">
    <label>Date of Birth</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <div class="position-relative">
            <input type="date" class="form-control" placeholder="Name Category"
                name="date" value="${cus.date}" required>
        </div>
    </div>
</div>
<div class="col-md-4">
    <label>Status</label>
</div>
<div class="col-md-8">
    <div class="form-group has-icon-left">
        <select class="form-select" id="status"  name="status">
            <option value=1>Active</option>
            <option value=0>Inactive</option>       
        </select>
        </div>
    </div>
</div>



<div class="col-12 d-flex justify-content-end">
    <button id="save" type="submit"
        class="btn btn-primary me-1 mb-1">Submit</button>
    <button type="reset"
        class="btn btn-light-secondary me-1 mb-1">Reset</button>
</div>
    `
    form.innerHTML = template;

});
const editProduct = async (e) => {
    e.preventDefault();
    const doc = {
        name: form.name.value,
        phone: form.phone.value,
        date: form.date.value,
        email: form.email.value,
        status: Number(form.status.value),
        address: form.address.value
    }
    await fetch('http://localhost:3000/customers/' + id, {
        method: "PUT",
        body: JSON.stringify(doc),
        headers: {
            "Content-Type": 'application/json'
        }
    })

    window.location.replace("/admin/customer/list-customer.html");

}
form.addEventListener("submit", editProduct);