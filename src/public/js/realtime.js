const socket = io();

const list = document.getElementById("list");

socket.on("products", (products) => {
  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");

    li.innerText = p.id + " - " + p.name + " - " + p.price;

    list.appendChild(li);
  });
});

function add() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  socket.emit("addProduct", {
    name,
    price,
  });
}

function remove() {
  const id = document.getElementById("id").value;

  socket.emit("deleteProduct", id);
}
