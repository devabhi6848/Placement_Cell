const express = require('express');
const passport = require('passport');
const router = express.Router();
const interviewController = require('../controllers/interview_controller');

router.get('/add',passport.checkAuthentication,interviewController.openInterviewPage);
router.get('/open_form',passport.checkAuthentication,interviewController.open_form);
router.post('/create',passport.checkAuthentication,interviewController.create);
router.post('/update/:id',passport.checkAuthentication,interviewController.update);


module.exports = router;