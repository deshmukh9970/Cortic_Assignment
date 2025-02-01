document.addEventListener("DOMContentLoaded", function () {
    const productSelect = document.getElementById("productSelect");
    const updateForm = document.getElementById("updateProductForm");
    const message = document.getElementById("updateMessage");

    // Load products into dropdown
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function loadProducts() {
        productSelect.innerHTML = '<option value="">Select a product</option>';
        products.forEach((product, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    loadProducts();

    // Populate form when a product is selected
    productSelect.addEventListener("change", function () {
        let selectedIndex = productSelect.value;
        if (selectedIndex !== "") {
            let product = products[selectedIndex];
            document.getElementById("updateProductName").value = product.name;
            document.getElementById("updateProductDescription").value = product.description;
            document.getElementById("updateProductPrice").value = product.price;
        }
    });

    // Handle form submission for updating product
    updateForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let selectedIndex = productSelect.value;
        if (selectedIndex === "") {
            alert("Please select a product to update.");
            return;
        }

        let updatedName = document.getElementById("updateProductName").value;
        let updatedDescription = document.getElementById("updateProductDescription").value;
        let updatedPrice = document.getElementById("updateProductPrice").value;
        let updatedImage = document.getElementById("updateProductImage").files[0];

        if (updatedImage) {
            let reader = new FileReader();
            reader.readAsDataURL(updatedImage);

            reader.onload = function () {
                products[selectedIndex].image = reader.result;
                saveUpdatedProduct(selectedIndex, updatedName, updatedDescription, updatedPrice);
            };
        } else {
            saveUpdatedProduct(selectedIndex, updatedName, updatedDescription, updatedPrice);
        }
    });

    function saveUpdatedProduct(index, name, description, price) {
        products[index].name = name;
        products[index].description = description;
        products[index].price = price;
        localStorage.setItem("products", JSON.stringify(products));

        message.textContent = "Product updated successfully!";
        message.style.color = "green";

        loadProducts(); // Reload dropdown
    }
});
