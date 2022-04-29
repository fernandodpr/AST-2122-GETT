const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    rol: {type: String, required: true}
},{
    timestamps: true,
    versionKey: false,
});

module.exports = model("User",userSchema);