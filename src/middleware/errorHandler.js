const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message
  });
};

export default errorHandler;