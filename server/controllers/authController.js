const authController = {};


authController.isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    console.log('req user, logged in');
    console.log(req.user);
    // return db_controller.getUser(req, res, next);
    res.locals.user = req.user;
    next();
  } else {
    // res.redirect('/');

    next();
  }
};


module.exports = authController;