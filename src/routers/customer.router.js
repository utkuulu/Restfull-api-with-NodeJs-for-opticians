const express = require("express");
const CustomerController = require("../controllers/CustomerController");
const customerRouter = express.Router();

customerRouter
  .route("/")
  .post(CustomerController.addNewCustomer)
  .get(CustomerController.getAllCustomer);
customerRouter.route("/:id").delete(CustomerController.deletedCustomer);

module.exports = customerRouter;
