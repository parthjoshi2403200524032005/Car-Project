const acyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      res.status(err.code || 500).json({
        success: false,
        message: err.message
      });
      next(err);
    }
  };
};
module.exports = { acyncHandler };
