const form = document.querySelector("form");

const createCate = async (e) => {
    e.preventDefault();
    const doc = {
        id: form.id.value,
        name: form.name.value,
    }
    await fetch('http://localhost:3000/categories', {
        method: "POST",
        body: JSON.stringify(doc),
        headers: {
            "Content-Type": 'application/json'
        }
    })

    window.location.replace("/admin/category/list-category.html");

}

form.addEventListener("submit", createCate);