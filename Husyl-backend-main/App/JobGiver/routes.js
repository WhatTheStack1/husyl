const express = require('express');

const Controller = require('./controller');
const middleware = require('../../Middlewares/authMiddlewares').authenticateToken;

const router = express.Router();

router.post('/', middleware, Controller.Create);
router.patch('/:id', middleware, Controller.Update);

module.exports = router;