const mongoose = require('mongoose');

//  Your code goes here
const marioSchema= new mongoose.Schema({
    name: {type:String, required:true},
    weight:{type:Number, required:true}
})

const marioModel = new mongoose.model('marioModel',marioSchema);
module.exports = marioModel;