const express = require('express');
const { UserController } = require('../../controllers');
const router = express.Router();

//for signUp
router.post('/signUp',UserController.signUp)

//for signIn
router.post('/signIn',UserController.signIn)

module.exports = router;
