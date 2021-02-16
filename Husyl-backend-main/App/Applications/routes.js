const express = require('express');
const Controller = require('./controller');
const middleware = require('../../Middlewares/authMiddlewares').authenticateToken;

const router = express.Router();

router.post('/', middleware, Controller.Create);
router.get('/:id', middleware, Controller.Read);
router.delete('/:id', middleware, Controller.Delete);
router.get('/:user/:job', middleware, Controller.ReadByUser);
router.patch('/status/:id', middleware, Controller.UpdateStatus);

module.exports = router