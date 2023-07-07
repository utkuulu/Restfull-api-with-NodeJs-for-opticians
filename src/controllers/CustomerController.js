const expressAsyncHandler = require("express-async-handler");
const {
  createCustomerService,
  deleteCustomerService,
  getAllCustomerService,
} = require("../services/CustomerService");
const { createToken } = require("../utils/jwtGenerator");

class CustomerController {
  static addNewCustomer = expressAsyncHandler(async (req, res) => {
    const {
      customerName,
      lastname,
      IDnumber,
      phoneNumber,
      gender,
      sales,
      token,
    } = req.body;

    const response = await createCustomerService({
      customerName,
      lastname,
      IDnumber,
      phoneNumber,
      gender,
      sales,
      token,
    });

    res.json(response);
  });

  static deletedCustomer = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await deleteCustomerService(id);
    res.json(response);
  });

  static getAllCustomer = expressAsyncHandler(async (req, res) => {
    const response = await getAllCustomerService();
    res.json(response);
  });
}

module.exports = CustomerController;
