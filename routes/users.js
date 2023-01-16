const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users')

const passport = require('passport');
const catchAsync = require('../utils/catchAsync')


router.route('/register')
    .get(usersController.getRegisterForm)
    .post(catchAsync(usersController.registerUser))

router.route('/login')
    .get(usersController.getLoginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), usersController.postLogin)


router.get('/logout', usersController.logOut)



module.exports = router;