const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/student_controller');

router.get('/add_form',passport.checkAuthentication,studentController.add_form);
router.post('/create',passport.checkAuthentication,studentController.create);
router.post('/delete/:id',passport.checkAuthentication,studentController.delete);

module.exports = router;