/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
*/
const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    // When the route accepts a POST call for the URI "/ecomm/api/v1/auth/signup",
    // call signup method from authController module.
    app.post("/ecomm/api/v1/auth/signup", authController.signup);
}
