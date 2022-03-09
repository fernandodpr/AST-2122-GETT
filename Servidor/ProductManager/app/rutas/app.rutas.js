module.exports = (ProductManager) => {
  const ProductManager = require("../controllers/ProductManager.controller.js");

  ProductManager.post("/api/product", ProductManager.create);
  ProductManager.get("/api/product", ProductManager.findAll);
  ProductManager.delete("/api/product", ProductManager.delete);


  ProductManager.get("/api/product/:productID", ProductManager.findOne);
  ProductManager.post("/api/product/:productID", ProductManager.update);
  ProductManager.delete("/api/product/:productID", ProductManager.delete);



};
