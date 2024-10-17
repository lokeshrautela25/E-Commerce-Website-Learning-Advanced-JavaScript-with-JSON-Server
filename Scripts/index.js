// // Here I am using Import export feature of ES6.
// // To import navbar.js file from Components folder.
// // Always rember That Whenever you use import export feature of ES6.
// // Make sure to use type module in script tag in your html file.
import navbar from "../Components/navbar.js";
let navbarDiv = document.querySelector(".navbar");
navbarDiv.innerHTML = navbar();
let price = JSON.parse(localStorage.getItem("Price")) || 0;
let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;

let api = `http://localhost:3000/productData`;
// // FECTCHING SPECIFIC DATA LIKE: MOBILE, MEN, WOMEN, KID, LAPTOP, BOOKS --->
// let allData = [];
// let getOneData = async () => {
// let res = await fetch(api);
// let data = await res.json();
// allData.push(...data.mobile)
// renderProductData(allData)
// }
// getOneData();

// // // FETCHING API FOR ALL DATA --->
let allData = [];
let getData = async () => {
  let res = await fetch(api);
  let data = await res.json();
  Object.values(data).forEach((ele) => {
    allData.push(...ele);
  });
  renderProductData(allData);
};
getData();

// // ADDING PRODUCTS TO THE CART --->
let addToCart = async (cartData) => {
  let res = await fetch(`http://localhost:3000/cart`, {
    method: "POST",
    headers: { "content-Type": "appliction/json" },
    body: JSON.stringify(cartData),
  });
  let result = await res.json();
  console.log(result);
  cartCount++;
  document.getElementById("cartCount").innerHTML = cartCount;
  localStorage.setItem("cartCount", JSON.stringify(cartCount));
};

// // PRODUCT RENDERING --->
let products = document.querySelector(".products");
let renderProductData = (data) => {
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
    let addBtn = document.createElement("button");
    addBtn.innerHTML = "Add to cart";
    addBtn.onclick = () => {
      let cartData = {
        productId: id,
        img,
        brand,
        title,
        deal_price,
        actual_price,
      };
      addToCart(cartData);
      price += Number(deal_price);
      localStorage.setItem("Price", JSON.stringify(price));
      addBtn.innerText = "Added to cart";
    };
    items.append(image, b, t, dp, ap, addBtn);
    products.append(items);
  });
};

// // SORTING FUNCTION BY PRICE LOW TO HIGH--->
document.getElementById("sortLH").addEventListener("click", () => {
  let sorted = allData.sort((a, b) => a.deal_price - b.deal_price);
  renderProductData(sorted);
});
// // SORTING FUNCTION BY PRICE HIGH TO LOW -->
document.getElementById("sortHL").addEventListener("click", () => {
  let sorted = allData.sort((a, b) => b.deal_price - a.deal_price);
  renderProductData(sorted);
});

// // FILTER FUNCTION --->
let filter = document.getElementById("filter");
filter.addEventListener("change", () => {
  if (filter.value == 0 || filter.value == null) {
    return renderProductData(allData);
  } else {
    let filterMenData = allData.filter((ele) => {
      return ele.category === filter.value;
    });
    renderProductData(filterMenData);
  }
});

// // SEARCH PRODUCTS FUNCTION --->
let search = document.querySelector(".query");
let searchBtn = document
  .querySelector(".searchBtn")
  .addEventListener("click", searchFun);

function searchFun() {
  let searchVal = search.value;
  let searchedData = allData.filter((ele) => {
    return (
      ele.category.toLowerCase().includes(searchVal) ||
      ele.title.toLowerCase().includes(searchVal)
    );
  });
  renderProductData(searchedData);
}

// // SEARCH FUNCTION ON ENTER PRESS --->
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchFun();
  }
});

// // SEARCH FUNCTION ON KEYUP --->
search.addEventListener("keyup", (e) => {
  searchFun();
});
