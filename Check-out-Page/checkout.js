const inputfeild = document.querySelectorAll("input");
const textarea = document.querySelectorAll("textarea");
const errormsg = document.querySelectorAll(".error");
const paybtn = document.querySelector(".btn-pay");
const cartPrice = document.querySelectorAll(".cart-price");
const subTotal = document.querySelector(".Subtotal-amount");
const shipping = document.querySelector(".shipping-amount");
const discount = document.querySelector(".discount-amount");
const total = document.querySelector(".Total-amount");
const closeBtn = document.querySelectorAll(
  ".close, .close-btn, .confirm-btn, .closepic"
);
const modal = document.querySelector("#modal-overlay");
const PaymentOrderAddress = document.querySelectorAll(".payment-order-address");
const PaymentOrderName = document.querySelectorAll(".payment-order-name");
const PaymentOrdercontact = document.querySelector(".payment-order-contacts");
const PaymentOrderinstructions = document.querySelectorAll(
  ".payment-order-instruction"
);

// delvery information selectors
const modalTwo = document.querySelector(".modal");
const deliveryBtn = document.querySelector(".delivery-btn");
const deliveryForm = document.querySelector(".deliveryForm");
const deliverysummary = document.querySelector(".modal-delivery-info");

// picup information selectors
const modalThree = document.querySelector(".pickup-modal");
const pickupsummary = document.querySelector(".modal-pickup-info");
const pickupBtn = document.querySelector(".pickup-btn");
const pickupForm = document.querySelector(".pickupform");

// variables
let deliveryInformationStatus = false;

// EVENT LISTENERS START
deliveryForm.addEventListener("submit", delivery);
pickupForm.addEventListener("submit", pickup);
paybtn.addEventListener("click", openPaymentOrder);
pickupBtn.addEventListener("click", openPickupDetails);
deliveryBtn.addEventListener("click", openDeliveryOption);
closeBtn.forEach((item) => {
  item.addEventListener("click", closeOrder);
});
inputfeild.forEach((item, index) => {
  item.addEventListener("change", (e) => assign(e, index));
});
textarea.forEach((item) => {
  item.addEventListener("input", deliveryInstructions);
});
// EVENT LISTERNS END

// FUCNTIONS START
// pickup funtions starts
function pickup(e) {
  e.preventDefault();
  deliveryInformationStatus = true;
  deliverysummary.style.display = "none";
  pickupsummary.style.display = "block";
  deliveryBtn.setAttribute("disabled", true);
  closeOrder();
}
function openPickupDetails() {
  modalThree.style.display = "flex";
  deliveryBtn.removeAttribute("disabled");
}
// pickup funtion ends

// delvery funtions start
function delivery(e) {
  e.preventDefault();
  deliveryInformationStatus = true;
  pickupBtn.setAttribute("disabled", true);
  pickupsummary.style.display = "none";
  deliverysummary.style.display = "block";
  closeOrder();
}

function deliveryInstructions() {
  textarea.forEach((instruction, index) => {
    const value = instruction.value.trim();
    if (value === "") {
      PaymentOrderinstructions[index].textContent =
        "No special instruction given";
    } else {
      PaymentOrderinstructions[index].textContent = value;
    }
  });
}
function openDeliveryOption() {
  modalTwo.style.display = "flex";
  pickupBtn.removeAttribute("disabled");
}
// delivery funtion ends
function assign(e, index) {
  const { target } = e;
  if (target.name === "address") {
    PaymentOrderAddress.forEach((item) => {
      item.textContent = target.value.trim();
    });
  }
  if (target.name === "fullName") {
    PaymentOrderName.forEach((item) => {
      item.textContent = target.value;
    });
  }
  if (target.name === "pickupLocation") {
    PaymentOrderAddress.textContent = target.value;
  }
  if (target.name === "alternateContact") {
    PaymentOrdercontact.textContent = target.value;
  }
}

function closeOrder() {
  modal.style.display = "none";
  modalTwo.style.display = "none";
  modalThree.style.display = "none";
}

function openPaymentOrder() {
  if (!deliveryInformationStatus) {
    Toastify({
      text: "Complete Shipping Information...",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #ff4b4b, #ff2e2e)",
      close: true,
    }).showToast();
  } else {
    modal.style.display = "flex";
  }
}
function calculate() {
  let price = [];
  let count = 0;
  cartPrice.forEach((item) => {
    price.push(item.textContent);
  });
  for (let i = 0; i < price.length; i++) {
    count += parseFloat(price[i].slice(1));
  }
  subTotal.textContent = `$${count}.00`;
  let shippingCost = parseFloat(shipping.textContent.slice(1));
  let discountCost = parseFloat(discount.textContent.slice(2));
  let subTotalCost = parseFloat(subTotal.textContent.slice(1));
  let claculationResult = subTotalCost + shippingCost - discountCost;
  total.textContent = `$${claculationResult}.00`;
}
// FUNCTONS END

inputfeild.forEach((item, index) => {
  item.addEventListener("change", (e) => validation(e, index));
});
function validation(event, index) {
  const { target } = event;
  if (target.name === "Email") {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(target.value)) {
      errormsg[index].textContent = "Error: Invalid Email Address";
      inputfeild[index].style.borderColor = "red";
    } else {
      errormsg[index].textContent = " ";
      inputfeild[index].style.borderColor = "black";
    }
  }

  if (target.name === "number" || target.name === "alternateContact") {
    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;
    if (!phoneRegex.test(target.value)) {
      errormsg[index].textContent = "Error Invalid: Phone Number";
      inputfeild[index].style.borderColor = "red";
    } else {
      errormsg[index].textContent = " ";
      inputfeild[index].style.borderColor = "black";
    }
  }

  if (target.name === "zip-code") {
    const zipRegex = /^\d{6}$/;
    if (!zipRegex.test(target.value)) {
      errormsg[index].textContent = "Error Invalid: Zip Code";
      inputfeild[index].style.borderColor = "red";
    } else {
      errormsg[index].textContent = " ";
      inputfeild[index].style.borderColor = "black";
    }
  }
}
function errorcalling(e) {
  console.log("this is the message", e);
}
