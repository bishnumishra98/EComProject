// This will be the starting file of the project

const express = require("express");
const mongoose = require("mongoose");
const server_config = require("./configs/server.config");
const app = express();

// Start the server
app.listen(server_config.PORT, () => {
    console.log("Server started at port number: ", server_config.PORT);
});
