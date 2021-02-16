const express = require('express')
const Controller = require('./controller');

const middleware = require('../../Middlewares/authMiddlewares').authenticateToken;


const router = express.Router()

router.post('/openjobposting', middleware, Controller.OpenJobPosting);
router.post('/payseeker/:applicationId', middleware, Controller.ChargeGivers);

module.exports = router