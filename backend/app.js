const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cards = require('./routes/cards.js');
const users = require('./routes/users.js');

const app = express();
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '5fb67ef674b5dfcc97124cfa',
  };

  next();
});
app.use(bodyParser.json());
app.use('/', cards);
app.use('/', users);
app.post('/signin', login);
app.post('/signup', createUser);

app.get('*', (req, res, next) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
  next();
});
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.ValidatorError || mongoose.Error.CastError) {
    res.status(400).send({ message: 'Переданы некорректные данные', details: err });
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  } else {
    res.status(err.statusCode).send(err.message);
  }
  next();
});
app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
