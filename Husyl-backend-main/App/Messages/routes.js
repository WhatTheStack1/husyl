const express = require('express')
const Controller = require('./controller');
const { authenticateToken } = require('../../Middlewares/authMiddlewares')
const router = express.Router()

router.post('/', Controller.Create);
router.get('/', Controller.List);
router.get('/:chatId', Controller.ListByChat)
router.delete('/:id', Controller.Delete);
router.patch('/:id', Controller.Update);

module.exports = router