const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    rol: {type: String, required: true},
    username: {type: String, required: false}
},{
    timestamps: true,
    versionKey: false,
});

module.exports = model("User",userSchema);