const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    quote: {type: String, default: "You have no quote"}
})

const User = mongoose.model('User', UserSchema);

module.exports = User