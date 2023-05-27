const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new mongoose.Schema({
  // id:{
  //   type:Number,
  //   required:true,
  // },
    username: {
      type: String,
    required: true,
    },
    password: {
      type: String,
    required: true,
    }
  });


const User = mongoose.model('User', userSchema);
module.exports = User;