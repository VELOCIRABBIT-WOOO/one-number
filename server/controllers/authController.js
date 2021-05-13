const authController = {};


authController.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    next();
  } else {
    next();
  }
};


module.exports = authController;