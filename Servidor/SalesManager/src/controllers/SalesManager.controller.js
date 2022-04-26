const SalesmanagerCtrl = {}

const Product = require("../models/product.model.js")
const Sale = require("../models/sale.model.js")

SalesmanagerCtrl.status = (req, res) => res.send('OK');


module.exports = SalesmanagerCtrl;