// This will be the starting file of the project

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");


// The JSON that is passed as request object's body shall be read as JavaScript object
app.use(express.json());   // express.json() is a built-in middleware function in Express

// Create an admin user at the starting of the application if its not already present ---

// Connect the application with MongoDB
mongoose.connect(db_config.DB_URL);
// Start the connection by accessing the connection object (mongoose.connection)
const db = mongoose.connection;
// Handle connection errors by listening for the events on the connection object
db.once("open", () => {
    console.log("Connected to MongoDB");
    init();
});
db.on("error", (err) => {
    console.log("failed to establish connection with MongoDB: ", err);
});

async function init() {
    try {
        let user = await user_model.findOne({userId: "admin"});
        // if admin is present, return simply
        if(user) {
            console.log("Admin is already present");
            return;
        }
    } catch(err) {
        console.log("Error while reading the data", err);
    }
    
    // if admin is not present, create an admin
    try {
        user = await user_model.create({
            name: "Bishnu",
            userId: "admin",
            email: "bishnumishra@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("W@lcome1", 8)
            // The argument '8' in hashSync() function is the number of salt rounds,
            // which determines the computational complexity of the hashing algorithm.
            // Increasing the number makes the hashing process more computationally intensive,
            // thus making it harder for attackers to brute force the hashed password.
            // Thus, 'password: bcrypt.hashSync("W@lcome1", 8)' means that the password
            // "W@lcome1" will be hashed using the bcrypt algorithm with 8 rounds of salting.
        });
        console.log("Admin created: ", user);
    } catch(err) {
        console.log("Error while creating admin: ", err);
    }
}


// Stich the routes to the server
require("./routes/auth.routes")(app);   // calling routes and passing app object


// Start the server
app.listen(server_config.PORT, () => {
    console.log("Server started at port number: ", server_config.PORT);
});
