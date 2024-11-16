document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.querySelector(".items-container table");

    const items = [
        {
            imageSrc: "../images/image-product-3.jpg",
            name: "Male Winter Limited Sneakers",
            size: "42",
            color: "Gray & White",
            price: 130.00,
            quantity: 1
        },
        {
            imageSrc: "../images/image-product-4.jpg",
            name: "Female Spring Limited Sneakers",
            size: "39",
            color: "Beige & White",
            price: 110.00,
            quantity: 1
        }
    ];

    const taxRate = 0.075;

    function calculateTotals() {
        let subtotal = 0;

        // Calculate subtotal
        cartTable.querySelectorAll("tr").forEach(row => {
            const priceCell = row.querySelector("td:nth-child(2)");
            const quantityInput = row.querySelector("input[type='number']");
            const totalCell = row.querySelector("td:nth-child(4)");
            
            if (priceCell && quantityInput && totalCell) {
                const price = parseFloat(priceCell.textContent.replace("$", "")); //250 in value
                const quantity = parseInt(quantityInput.value); //2 in quantity
                const total = price * quantity; //250 * 2
                totalCell.textContent = `$${total.toFixed(2)}`;
                subtotal += total;
            }
        });

        // Calculate tax and grand total
        const tax = subtotal * taxRate;
        const grandTotal = subtotal + tax;

        // Update totals in the table
        document.querySelector(".sub td").textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector(".grand td").textContent = `$${grandTotal.toFixed(2)}`;
    }

    function addItemToCart(item) {
        const row = document.createElement("tr");
        row.className = "table-heads items-name";
        row.innerHTML = `
            <td>
                <div class="cart-products">
                    <img width="120" height="120" src="${item.imageSrc}" alt=""/>
                    <div class="prod-desc">
                        <p class="items-name"><b>${item.name}</b><br>Size: ${item.size}<br>Color: ${item.color}</p>
                        <br>
                        <button class="delete-button">
                            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" fill="#C3CAD9"/>
                            </svg>
                        </button> 
                    </div>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1"></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;

        cartTable.appendChild(row);

        // Add event listener for quantity change
        const quantityInput = row.querySelector("input[type='number']");
        quantityInput.addEventListener("input", calculateTotals);

        // Add event listener for delete button
        row.querySelector(".delete-button").addEventListener("click", function () {
            row.remove();
            calculateTotals();
        });
    }

    items.forEach(addItemToCart);
    calculateTotals();
});

