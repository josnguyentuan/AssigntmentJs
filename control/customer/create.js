const form = document.querySelector("form");

const createCustomer = async (e) => {
    e.preventDefault();
    const doc = {
        name: form.name.value,
        phone: form.phone.value,
        date: form.date.value,
        email: form.email.value,
        status: Number(form.status.value),
        address: form.address.value
    }
    await fetch('http://localhost:3000/customers', {
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
            "Content-Type": 'application/json'
        }
    })


    window.location.replace("/admin/customer/list-customer.html");
}

form.addEventListener("submit", createCustomer);