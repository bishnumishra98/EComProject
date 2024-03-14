// Import mongoose module in application
const mongoose = require("mongoose");

// Define user schema. We will define these fields in
// our schema: name, userId, password, email, userType
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,   // it means userId of the user must be unique
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,   // it means email id should be stored in lowercase in DB
        minlength: 10,   // the email should consist of minimum 10 characters
    },
    userType: {
        type: String,
        default: "CUSTOMER",   // if user doesn't provide its userType; it will be treated as type "CUSTOMER"
        enum: ["CUSTOMER", "ADMIN"]   // userType can be any one amongst "CUSTOMER" and "ADMIN"
    }
}, {timestamps: true, versionKey: false});

// Create a collection corressponding to the above schema, and export it
module.exports = mongoose.model("User", userSchema);
