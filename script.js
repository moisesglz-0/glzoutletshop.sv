
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product} agregado al carrito.`);
}

function renderCart() {
  const list = document.getElementById("cart");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    list.innerHTML += `<li>${item.product} - $${item.price.toFixed(2)}</li>`;
  });
  list.innerHTML += `<li><strong>Total: $${total.toFixed(2)}</strong></li>`;
}

function checkout() {
  const message = cart.map(item => `${item.product}: $${item.price}`).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const text = `🛒 Pedido nuevo:\n${message}\nTotal: $${total.toFixed(2)}`;
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
    .then(() => {
      alert("Pedido enviado a Telegram!");
      localStorage.removeItem("cart");
    })
    .catch(() => alert("Error al enviar el pedido."));
}

if (document.getElementById("cart")) renderCart();
