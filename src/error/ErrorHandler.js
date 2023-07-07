const ErrorHandler = (err, req, res, next) => {
  // Custom errors
  if (err.status < 1000) {
    res.status(err.status).json({ status: err.status, message: err.message });
  }

  // mongoo errors
  else if (err.code == 11000) {
    res.status(400).json({
      status: 400,
      message: `DUPLICATE_KEY_ERROR_${Object.keys(err.keyPattern)[0]}`,
    });
  } else if (err.name == "CastError") {
    console.log(err);
    res.status(400).json({ message: "Cast Error" });
  } else if (err.name == "ValidationError") {
    res.status(400).json({ message: "Validation Error" });
  }
  // server errors
  else {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = ErrorHandler;
