const express = require('express');

const { InfoController } = require('../../controllers');
const router = express.Router();

const UserRoutes = require('./user-routes');
const { AuthMiddleware } = require('../../middlewares');



router.get('/info',AuthMiddleware.checkAuth ,InfoController.info);
router.use('/user',UserRoutes)

module.exports = router;