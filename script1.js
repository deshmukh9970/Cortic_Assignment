document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");
    const message = document.getElementById("message");

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let productName = document.getElementById("productName").value;
        let productDescription = document.getElementById("productDescription").value;
        let productPrice = document.getElementById("productPrice").value;
        let productImage = document.getElementById("productImage").files[0];

        if (!productImage) {
            alert("Please select an image.");
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(productImage);

        reader.onload = function () {
            let product = {
                name: productName,
                description: productDescription,
                price: productPrice,
                image: reader.result
            };

            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));

            message.textContent = "Product added successfully!";
            message.style.color = "green";

            productForm.reset();
        };
    });
});
