module.exports = (ProductManager) => {
  const ProductManager = require("../controllers/ProductManager.controller.js");
  var router = require("express").Router();

  ProductManager.post("/api/product", ProductManager.create);
  ProductManager.get("/api/product", ProductManager.findAll);
  ProductManager.delete("/api/product", ProductManager.delete);


  ProductManager.get("/api/product/:productID", ProductManager.findOne);
  ProductManager.post("/api/product/:productID", ProductManager.update);
  ProductManager.delete("/api/product/:productID", ProductManager.delete);



};

/*
module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};*/
