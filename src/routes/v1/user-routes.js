const express = require('express');
const { UserController } = require('../../controllers');
const router = express.Router();

//for creating route
router.post('/',UserController.signUp)

module.exports = router;
