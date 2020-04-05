// Chrome attempts to call this route, which causes an error. We should provide a favicon to prevent this
const STATIC_ROUTES = ['/favicon.ico'];

const checkSignin = (req, res, next) => {
  if (req.session.user || STATIC_ROUTES.includes(req.url)) {
    next();
  } else {
    next(new Error('User not signed in'));
  }
};

module.exports = {
  checkSignin,
};
