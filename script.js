let cart = [];
let total = 0;

function scrollToBooking() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

function addItem(name, price) {
    cart.push({ name, price });

    total += price;

    updateCart();
}

function removeItem(name, price) {
    const index = cart.findIndex((item) => item.name === name);

    if (index !== -1) {
        cart.splice(index, 1);
        total -= price;
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        cartItems.innerHTML = `
<p class="empty">No Items Added</p>
`;
    } else {
        cartItems.innerHTML = "";

        cart.forEach((item) => {
            const div = document.createElement("div");

            div.innerHTML = `
<p>${item.name} - ₹${item.price}</p>
`;

            cartItems.appendChild(div);
        });
    }

    totalElement.innerText = total;
}

// EMAIL JS

(function () {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

function bookNow() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all fields");
        return;
    }

    const templateParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        order_items: cart.map((item) => item.name).join(", "),
        total_amount: total,
    };

    emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(() => {
            document.getElementById("message").innerText =
                "Thank You For Booking the Service We will get back to you soon!";

            cart = [];
            total = 0;
            updateCart();

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
        })

        .catch((error) => {
            console.log(error);
            alert("Email not sent");
        });
}
