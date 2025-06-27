const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
    },
    {
        timestamp: true
    }
);

const User = mongoose.model("user", userSchema);

module.exports = {
    User
};