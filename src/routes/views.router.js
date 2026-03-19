import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();

const manager = new ProductManager("./src/data/products.json");

router.get("/", (req, res) => {
  res.render("home", {
    products: manager.getProducts(),
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    products: manager.getProducts(),
  });
});

export default router;
