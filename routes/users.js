const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/sign-in',userController.sign_in);
router.get('/sign-up',userController.sign_up);
router.get('/create-session',passport.authenticate('local', { failureRedirect: '/users/sign-in' }),userController.createSession);
router.post('/create',userController.create);
router.get('/destroySession',userController.destroySession);

module.exports = router;