// The logic to register an user, and sign-in the user will be present in this file

const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const secret = require("../configs/auth.config");
const jwt = require("jsonwebtoken");

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

exports.signin = async (req, res) => {
    // retrieve user by using their userId from request body
    const user = await user_model.findOne({userId: req.body.userId});

    // if user is not present, send a response accordingly
    if(user == null) {
        return res.status(401).send({
            message: "This userId does not exists."
        });
    }

    // if userId is present, check if they passed the correct password or not
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    //  The bcrypt.compareSync() function is used to compare a plain text password
    // (typically provided by a user during authentication) with a hashed password
    // stored in a database. If both matches, this function returns true, else false.
    // The first parameter should be the plain text password, and the second parameter
    // is the hashed password retrieved from database.

    if(!isPasswordValid) {
        return res.status(401).send({
            message: "Password is not correct."
        });
    }

    // If program comes here, means userID and password both were correct.
    // Thus, generate an access token for the user using JSON Web token(jwt) for the user.
    const token = jwt.sign({id: user.userId}, secret.secret, {expiresIn: 120});
    // jwt.sign() function generates a JWT by taking 3 parameters.
    // 1st param: This is the payload of the JWT, which contains the data(here, userID).
    //            This data will be encoded into the JWT and can be decoded later to
    //            retrieve the user's ID.
    // 2nd param: This is the secret key used to sign the JWT. It's crucial for adding more
    //            complexity to the generated token. If we do not provide a strong secret key, the
    //            JWT can be easily decoded using any online jwt decoder tools like https://jwt.io/.
    //            This could lead hackers potentially create their own JWTs with arbitrary claims or
    //            manipulate existing JWTs to gain unauthorized access to protected resources.
    // 3rd param: This is an optional parameter that specifies the expiration time of the token.
    //            It indicates the amount of time (in seconds) after which the token will expire.
    //            In this case, the token will expire in 120 seconds (2 minutes) after it is generated.
    //            After expiration, the token will no longer be considered valid, and the client will
    //            need to request a new token. Setting an expiration time helps improve security by
    //            limiting the window of opportunity for potential misuse of the token.

    // All okay, thus send the response object finally for the sign-in functionality
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    });

}
