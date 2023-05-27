
const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookSchema = new Schema({
  // id:{
  //   type:Number,
  //   required:true,
  // },
  author: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;