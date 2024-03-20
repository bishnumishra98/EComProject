/*
 * POST localhost:8000/ecomm/api/v1/auth/signup
 * POST localhost:8000/ecomm/api/v1/auth/signin
 * I need to intercept the above two REST API end-points. This is
 * example of an endpoint: 'localhost:/ecomm/api/v1/auth/signup'.
*/

const authController = require("../controllers/auth.controller");
const authMW = require("../middleware/auth.mw");

module.exports = (app) => {
    // When the route accepts a POST call for the URI "/ecomm/api/v1/auth/signup",
    // call the middleware function named verifySignupBody from authMW module.
    // Post the middleware completes its task, call the next route handler function.
    // Here, that next route handler function is the signup method from authController module.
    // Same is valid for signin POST call too.
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignupBody], authController.signup);
    app.post("/ecomm/api/v1/auth/signin", [authMW.verifySignInBody], authController.signin);
}
