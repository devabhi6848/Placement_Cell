const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',passport.checkAuthentication,homeController.home);
router.use('/users',require('./users'));
router.use('/students',require('./students'));
router.use('/interviews',require('./interviews'));
router.use('/downloads',require('./download'));


module.exports = router;