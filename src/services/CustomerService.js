const CustomError = require("../error/CustomError");
const Customer = require("../models/Customer");
const { findByIdAndRemove } = require("../models/Customer");
const jwt = require("jsonwebtoken");

const createCustomerService = async ({
  customerName,
  lastname,
  IDnumber,
  phoneNumber,
  gender,
  sales = [],
  token,
}) => {
  const IdNumber = await Customer.findOne({ IDnumber });
  if (IdNumber) {
    throw new CustomError({
      status: 400,
      message: "There is a Customer with that Id Number",
    });
  }

  const decodeToken = jwt.decode(token, process.env.JWT_SECRET);
  console.log(decodeToken);
  if (decodeToken.verifiedType !== "admin") {
    throw new CustomError({
      status: 400,
      message: "Only Admin can do this operation",
    });
  }
  console.log(decodeToken);

  const newCustomer = new Customer({
    customerName,
    lastname,
    IDnumber,
    phoneNumber,
    gender,
    sales,
  });
  await newCustomer.save();

  return { success: true, data: { newCustomer, token } };
};

const deleteCustomerService = async (id) => {
  console.log(id);
  const deletedCustomer = await Customer.findByIdAndRemove(id);
  console.log(deletedCustomer);
  if (deletedCustomer) {
    return { success: true, data: deletedCustomer };
  } else {
    return { success: false, data: "Bu id'de bir customer yok" };
  }
};

const getAllCustomerService = async () => {
  const allCustomer = await Customer.find();
  return { success: true, data: allCustomer };
};

module.exports = {
  createCustomerService,
  deleteCustomerService,
  getAllCustomerService,
};
