const express = require('express')
const Controller = require('./controller');

const middleware = require('../../Middlewares/authMiddlewares').authenticateToken;


const router = express.Router()

router.post('/', middleware, Controller.Create);
router.get('/', Controller.List);
router.get('/searchJobs', Controller.Search);
router.get('/guest', Controller.GuestJobs);
router.get('/byusers', middleware, Controller.ListByUser);
router.get('/:id', Controller.Read);
router.delete('/:id', Controller.Delete);
router.patch('/:id', Controller.Update);

module.exports = router