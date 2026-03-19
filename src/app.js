import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";

import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import ProductManager from "./managers/product-manager.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const manager = new ProductManager("./src/data/products.json");

app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
  socket.emit("products", manager.getProducts());

  socket.on("addProduct", (product) => {
    manager.addProduct(product);
    io.emit("products", manager.getProducts());
  });

  socket.on("deleteProduct", (id) => {
    manager.deleteProduct(id);
    io.emit("products", manager.getProducts());
  });
});

server.listen(8080, () => {
  console.log("Servidor en 8080");
});
