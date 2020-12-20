const Card = require('../models/card');
const NotFoundError = require('../middlewares/errors/not-found-err.js');
const ForbiddenError = require('../middlewares/errors/forbidden-err.js');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, owner: req.user._id, link })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({}).then((cards) => {
    res.send(cards);
  }).catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId).orFail(new NotFoundError('Карточка не найдена')).then((card) => {
    if (card.owner === req.user._id) {
      res.status(200).send(card);
    } else {
      throw new ForbiddenError('Недостаточно прав');
    }
  })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Карточка не найдена')).then((card) => {
    res.send(card);
  }).catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Карточка не найдена')).then((card) => {
    res.send(card);
  }).catch(next);
};
