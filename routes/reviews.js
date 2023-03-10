const express = require('express')
const router = express.Router({mergeParams: true});
const reviewsController = require('../controllers/reviews.js')
const Gym = require('../models/gym');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')



router.post('/', isLoggedIn, validateReview, catchAsync(reviewsController.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewsController.deleteReview))

module.exports = router;