const ProductManager = require("../model/app.model.js");

// Crear y guardar un nuevo producto
exports.create = (req, res) => {
  const message = new ProductManager({
    message: req.body.message,
  });
  message
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Get all products of the DB
exports.findAll = (req, res) => {
  ProductManager.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a product with ID
exports.findOne = (req, res) => {
  ProductManager.findById(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.messageId,
      });
    });
};

// Update product by ID
exports.update = (req, res) => {
  ProductManager.findByIdAndUpdate(
    req.params.messageId,
    {
      message: req.body.message,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.messageId,
      });
    });
};

// Delete a product from the database
exports.delete = (req, res) => {
  ProductManager.findByIdAndRemove(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "No se ha encontrado ningun producto con la id " + req.params.messageId,
        });
      }
      res.send({ message: "Producto eliminado satisfactoriamente." });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No se ha encontrado ningun producto con la id" + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "No ha sido posible eliminar el producto con ID  " + req.params.messageId,
      });
    });
};
