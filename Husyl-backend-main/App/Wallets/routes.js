const express = require('express')
const Controller = require('./controller');

const router = express.Router()

router.post('/', Controller.Create)
router.get('/:id', Controller.Read);

module.exports = router