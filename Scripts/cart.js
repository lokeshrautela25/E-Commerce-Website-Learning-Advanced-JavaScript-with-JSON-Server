// // Here I am using Import export feature of ES6.
// // To import navbar.js file from Components folder.
// // Always rember That Whenever you use import export feature of ES6.
// // Make sure to use type module in script tag in your html file.
import navbar from "../Components/navbar.js";
let navbarDiv = document.querySelector(".navbar");
navbarDiv.innerHTML = navbar();
document.querySelector(".searchDiv").style.display = "none";
let price = JSON.parse(localStorage.getItem("Price")) || 0;
let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;

// // Using DOM manipulation to change the innerHTML of the element.
let total = document.getElementById("total");
total.innerHTML = `₹${price}`;

let api = `http://localhost:3000/cart`;
// // FETCHING API FOR ALL DATA --->
let getData = async () => {
  let res = await fetch(api);
  let data = await res.json();
  console.log(data);
  renderCartData(data);
};
getData();

// // DELETING PRODUCTS FROM THE CART --->
let remove = async (deltData) => {
  let res = await fetch(`http://localhost:3000/cart/${deltData}`, {
    method: "DELETE",
  });
  let result = await res.json();
  console.log(result);
};

// // CART PRODUCT RENDERING --->
let products = document.querySelector(".cartProducts");
let renderCartData = (data) => {
  products.innerHTML = null;
  data.forEach(({ id, img, brand, title, deal_price, actual_price }) => {
    let items = document.createElement("div");
    items.className = "items";
    let image = document.createElement("img");
    image.src = `${img}`;
    let b = document.createElement("h4");
    b.innerHTML = `${brand}`;
    let t = document.createElement("h3");
    b.innerHTML = `${title.slice(0, 35)}...`;
    let dp = document.createElement("p");
    dp.innerHTML = `₹${deal_price}`;
    let ap = document.createElement("h5");
    ap.innerHTML = `M.R.P: ${actual_price}`;
    let deltBtn = document.createElement("button");
    deltBtn.innerHTML = "DELETE";
    deltBtn.onclick = () => {
      let deltData = id;
      remove(deltData);
      price -= Number(deal_price);
      localStorage.setItem("Price", JSON.stringify(price));
      cartCount--;
      document.getElementById("cartCount").innerHTML = cartCount;
      localStorage.setItem("cartCount", JSON.stringify(cartCount));
    };
    items.append(image, b, t, dp, ap, deltBtn);
    products.append(items);
  });
};
