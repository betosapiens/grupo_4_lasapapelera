const User = require('../data/jsonTable');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
    //let emailInCookie = req.cookies.userEmail;
    //console.log(emailInCookie)
    
    //let userFromCookie = User.findByField('email', emailInCookie);

    next();
}

module.exports = userLoggedMiddleware;

