// ================= EMAILJS SETUP =================
// Initialize EmailJS with your public key
// Replace "YOUR_PUBLIC_KEY" with your actual key from emailjs.com
emailjs.init("YOUR_PUBLIC_KEY");

// ================= CART DATA =================
// cart array stores added services: { name, price }
var cart = [];

// ================= ADD ITEM =================
function addItem(name, price) {
    // add item to cart array
    cart.push({ name: name, price: price });
    // update the cart display
    renderCart();
}

// ================= REMOVE ITEM =================
function removeItem(name, price) {
    // find the item index in cart
    var index = -1;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            index = i;
            break;
        }
    }
    // remove one instance of this item if found
    if (index !== -1) {
        cart.splice(index, 1);
        renderCart();
    }
}

// ================= RENDER CART =================
function renderCart() {
    var tbody = document.getElementById("cart-items");
    var totalSpan = document.getElementById("total-amount");

    // clear existing rows
    tbody.innerHTML = "";

    if (cart.length === 0) {
        // show empty message
        tbody.innerHTML = '<tr id="empty-row"><td colspan="3" class="empty-msg">No items added yet.</td></tr>';
        totalSpan.textContent = "₹0.00";
        return;
    }

    // calculate total and build rows
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].price;

        var row = document.createElement("tr");
        row.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + cart[i].name + "</td>" +
            "<td>₹" + cart[i].price.toFixed(2) + "</td>";
        tbody.appendChild(row);
    }

    // update total amount
    totalSpan.textContent = "₹" + total.toFixed(2);
}

// ================= BOOK NOW =================
function bookNow() {
    var name  = document.getElementById("full-name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var msg   = document.getElementById("confirm-msg");

    // validation: check all fields filled
    if (!name || !email || !phone) {
        msg.style.color = "red";
        msg.textContent = "Please fill in all fields.";
        return;
    }

    // validation: check cart not empty
    if (cart.length === 0) {
        msg.style.color = "red";
        msg.textContent = "Please add at least one service.";
        return;
    }

    // build order summary for email
    var orderText = "";
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        total += cart[i].price;
        orderText += (i + 1) + ". " + cart[i].name + " - ₹" + cart[i].price.toFixed(2) + "\n";
    }
    orderText += "\nTotal: ₹" + total.toFixed(2);

    // EmailJS template parameters
    // These must match the variable names in your EmailJS template
    var params = {
        from_name:     name,
        user_email:    email,
        user_phone:    phone,
        order_details: orderText,
        total_amount:  "₹" + total.toFixed(2)
    };

    // disable button while sending
    var btn = document.querySelector(".book-now-btn");
    btn.textContent = "Sending...";
    btn.disabled = true;

    // send email via EmailJS
    // Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual IDs
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
        .then(function () {
            // success: show thank you message as required by assignment
            msg.style.color = "green";
            msg.textContent = "Thank you For Booking the Service We will get back to you soon!";

            // clear form fields
            document.getElementById("full-name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";

            // clear cart
            cart = [];
            renderCart();

            btn.textContent = "Book now";
            btn.disabled = false;

        }, function (error) {
            // error
            msg.style.color = "red";
            msg.textContent = "Something went wrong. Please try again.";
            btn.textContent = "Book now";
            btn.disabled = false;
            console.log("EmailJS Error:", error);
        });
}

// ================= NEWSLETTER SUBSCRIBE =================
function subscribeNewsletter() {
    var name  = document.getElementById("news-name").value.trim();
    var email = document.getElementById("news-email").value.trim();
    var msg   = document.getElementById("subscribe-msg");

    if (!name || !email) {
        msg.textContent = "Please enter your name and email.";
        return;
    }

    // show success message
    msg.textContent = "✅ Thank you for subscribing, " + name + "!";

    // clear fields
    document.getElementById("news-name").value  = "";
    document.getElementById("news-email").value = "";
}
