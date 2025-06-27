const mongoose = require("mongoose");

async function mongoDbConnection(dbURL) {
    mongoose.connect(dbURL)
        .then(() => console.log("Mongodb connected !"))
        .catch((err) => console.log("Error", err));
}

module.exports = { mongoDbConnection };