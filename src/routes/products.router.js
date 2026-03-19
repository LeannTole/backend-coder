import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();

const manager = new ProductManager("./src/data/products.json");

router.get("/", (req, res) => {
  res.json(manager.getProducts());
});

router.post("/", (req, res) => {
  const io = req.app.get("io");

  manager.addProduct(req.body);

  io.emit("products", manager.getProducts());

  res.send("producto agregado");
});

router.delete("/:id", (req, res) => {
  const io = req.app.get("io");

  manager.deleteProduct(req.params.id);

  io.emit("products", manager.getProducts());

  res.send("producto eliminado");
});

export default router;
