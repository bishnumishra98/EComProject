/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
*/

const authController = require("../controllers/auth.controller");
const authMW = require("../middleware/auth.mw");

module.exports = (app) => {
    // When the route accepts a POST call for the URI "/ecomm/api/v1/auth/signup",
    // call the middleware function named verifySignupBody from authMW module.
    // Post the middleware completes its task, call the next route handler function.
    // Here, that next route handler function is the signup method from authController module.
    app.post("/ecomm/api/v1/auth/signup", [authMW.verifySignupBody], authController.signup);
}
