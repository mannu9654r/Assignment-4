let cart = [];
let total = 0;

/* SCROLL */
document.getElementById("scroll-btn").addEventListener("click", () => {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

/* ADD TO CART */
document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {

        let name = btn.dataset.name;
        let price = Number(btn.dataset.price);

        let item = cart.find((c) => c.name === name);

        if (item) {
            item.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        total += price;
        renderCart();
    });
});

/* CART RENDER */
function renderCart() {
    let box = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    box.innerHTML = "";

    if (cart.length === 0) {
        box.innerHTML = "<li>No items</li>";
    } else {
        cart.forEach((item) => {
            let li = document.createElement("li");
            li.textContent = `${item.name} x ${item.qty} = ₹${item.price * item.qty}`;
            box.appendChild(li);
        });
    }

    totalBox.innerText = total;
}

/* EMAIL JS INIT (FIXED) */
(function () {
    emailjs.send(
        "service_86liqfh",
        "template_grljq5b",
        params
    )   // ✔️ YOUR PUBLIC KEY
})();

/* BOOK NOW */
document.getElementById("book-btn").addEventListener("click", () => {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let msg = document.getElementById("message");

    if (!name || !email || !phone) {
        msg.innerText = "Fill all fields";
        msg.style.color = "red";
        return;
    }

    let params = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        order_items: cart.map(i => i.name).join(", "),
        total_amount: total
    };

    emailjs.send(
        "service_86liqfh",      // ✔️ SERVICE ID
        "template_grljq5b",     // ✔️ TEMPLATE ID
        params
    )
        .then(() => {
            msg.innerText = "Booking successful!";
            msg.style.color = "green";

            cart = [];
            total = 0;
            renderCart();

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
        })
        .catch((error) => {
            console.log(error);
            msg.innerText = "Email failed to send";
            msg.style.color = "red";
        });
});

/* NEWSLETTER */
document.getElementById("subscribe-btn").addEventListener("click", () => {

    let name = document.getElementById("sub-name").value;
    let email = document.getElementById("sub-email").value;
    let msg = document.getElementById("sub-msg");

    if (!name || !email) {
        msg.innerText = "Fill all fields";
        msg.style.color = "red";
        return;
    }

    if (!email.includes("@")) {
        msg.innerText = "Invalid email";
        msg.style.color = "red";
        return;
    }

    msg.innerText = "Subscribed successfully!";
    msg.style.color = "green";
});
