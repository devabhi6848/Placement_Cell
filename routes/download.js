const express = require('express');
const passport = require('passport');
const router = express.Router();

const csvController = require('../controllers/csv_controller');

router.get('/download-csv', passport.checkAuthentication, csvController.downloadCsv);


module.exports = router;