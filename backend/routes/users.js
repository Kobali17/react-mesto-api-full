const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getUsers, createUser, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24),
  }),

}), getUser);

router.post('/users', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
}), createUser);

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

module.exports = router;
