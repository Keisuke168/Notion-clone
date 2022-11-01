const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requred: true,
        unique: true,
    },
    password: {
        type: String,
        requred: true,
    },
});

module.exports = mongoose.model("User", userSchema);