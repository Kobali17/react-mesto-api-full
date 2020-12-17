const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/gi;
        return regex.test(v);
      },
      message: 'Переданы некорректные данные',
    },
  },
  likes: [{
    type: mongoose.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
