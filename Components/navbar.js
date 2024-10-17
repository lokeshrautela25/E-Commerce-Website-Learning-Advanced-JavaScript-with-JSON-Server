const navbar = () => {
    return `
    <h1> <a href="index.html">JSON SERVER</a></h1>
      <section class="searchDiv"> 
        <input type="text" class="query" placeholder="Search by Brands, Categories...">
      <button class="searchBtn">S E A R C H</button>
      </section>
      <a href="cart.html">Cart <span id="cartCount">0</span> </a>
    `
}
export default navbar;