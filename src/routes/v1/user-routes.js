const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddleware } = require('../../middlewares');
const router = express.Router();

//for signUp
router.post('/signUp',UserController.signUp)

//for signIn
router.post('/signIn',AuthMiddleware.validateAuthRequest,UserController.signIn)

module.exports = router;
