let cartCount = JSON.parse(localStorage.getItem("cartCount")) || 0;
document.getElementById("cartCount").innerHTML = cartCount;
localStorage.setItem("cartCount", JSON.stringify(cartCount));