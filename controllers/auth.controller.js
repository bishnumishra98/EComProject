// The logic to register an user, and sign-in the user will be present in this file

const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");

exports.signup = async (req, res) => {
    // To create a new user, we follow a simple 3-step process:
    // 1. Read the request body.
    // 2. Insert the data in the Users collection in MongoDB.
    // 3. Return the response back to the user, as an acknowledgement that he/she has been created.

    // 1. Read the request body
    const request_body = req.body;   // 'req.body' gives the request body in form of a JavaScript object

    // 2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userId : request_body.userId,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password, 8)
    }

    try {
        // create the user in DB using create() method
        const user_created = await user_model.create(userObj);
        
        // 3. Return the response back to the user, as an acknowledgement that he/she has been created.
        const res_obj = {
            name : user_created.name,
            userId : user_created.userId,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updateAt
        }
        res.status(201).send(res_obj);
    } catch (err) {
        console.log("Error while registering the user", err);
        res.status(500).send({
            message : "Some error happened while registering the user."
        });
    }
}
