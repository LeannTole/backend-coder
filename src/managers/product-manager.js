import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts() {
    if (fs.existsSync(this.path)) {
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
    return [];
  }

  addProduct(product) {
    const products = this.getProducts();

    const newProduct = {
      id: Date.now(),
      ...product,
    };

    products.push(newProduct);

    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));

    return products;
  }

  deleteProduct(id) {
    let products = this.getProducts();

    products = products.filter((p) => p.id != id);

    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));

    return products;
  }
}
