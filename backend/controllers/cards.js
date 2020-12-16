const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, owner: req.user._id, link })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.send(cards);
  }).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId).orFail().then(() => {
    res.status(200).send();
  })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail().then((card) => {
    res.send(card);
  }).catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail().then((card) => {
    res.send(card);
  }).catch(next);
};
