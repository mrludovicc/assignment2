const {model, Schema} = require("../db/connection")

const Hope = new Schema({
    text: String
})

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    hopes: [Hope]
}, {timestamps: true})

const User = model("User", UserSchema)

module.exports = User