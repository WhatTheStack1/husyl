const express = require('express')
const Controller = require('./controller');

const router = express.Router()


router.post('/signup', Controller.Signup);
router.post('/login', Controller.Login);
router.get('/category', Controller.GetSeekers);
router.get('/guest', Controller.GuestSeekers);
router.post('/forgotPassword', Controller.ForgotPassword);
router.post('/changePassword', Controller.ChangePassword);
router.post('/applyForJob', Controller.ApplyForJob);
router.patch('/:id', Controller.Update);
router.get('/:id', Controller.Read);
router.post('/updatePassword/:id', Controller.UpdatePassword)

module.exports = router