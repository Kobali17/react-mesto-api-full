const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.get('/users/me', getUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
}), updateUserAvatar);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),

}), getUser);

module.exports = router;
