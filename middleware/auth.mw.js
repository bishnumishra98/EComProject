// This middleware checks whether is request body is proper or not
const user_model = require("../models/user.model");

const verifySignupBody = async (req, res, next) => {
    try {
        // check if name not present in request body
        if(!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Name was not provided."
            });
        }

        // check if email not present in request body
        if(!req.body.email) {
            return res.status(400).send({
                message: "Failed ! Email was not provided."
            });
        }

        // check if userId not present in request body
        if(!req.body.userId) {
            return res.status(400).send({
                message: "Failed ! UserId was not provided."
            });
        }

        // check for the user if its already present
        const user = await user_model.findOne({userId : req.body.userId});

        if(user){
            return res.status(400).send({
                message : "Failed ! User with this userId already exists."
            });
        }

        // if none of the above cases matches, move next
        next();
        // next() a callback function that is passed as an argument to the middleware function
        // by Express.js. It tells Express.js to move to the next middleware function in the
        // request-response cycle.
        // If there are no more middleware functions left in the stack, Express.js will move to
        // the route handler function.
    } catch(err) {
        console.log("Error while validating the request object", err);
        res.status(500).send({
            message: "Error while validating the request body"
        });
    }
}

const verifySignInBody = async (req, res, next) => {
    if(!req.body.userId) {
        return res.status(400).send({
            message : "userId is not provided."
        });
    }
    if(!req.body.password) {
        return res.status(400).send({
            message : "password is not provided."
        });
    }
    next();
}

module.exports = {
    verifySignupBody: verifySignupBody,
    verifySignInBody: verifySignInBody
}
