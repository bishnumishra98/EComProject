// This middleware checks whether is request body is proper or not

const verifySignupBody = async (req, res, next) => {
    try {
        // check for name
        if(!req.body.name) {
            return res.status(400).send({
                message: "Failed ! Name was not provided."
            });
        }

        // check for email
        if(!req.body.email) {
            return res.status(400).send({
                message: "Failed ! Email was not provided."
            });
        }

        // check for userId
        if(!req.body.email) {
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

module.exports = {
    verifySignupBody: verifySignupBody
}
