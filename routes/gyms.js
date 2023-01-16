const express = require('express')
const router = express.Router();
const gymController = require('../controllers/gyms')
const { isLoggedIn, isAuthor, validateGym} = require('../middleware')
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage })

const Gym = require('../models/gym');




router.route('/')
    .get(catchAsync(gymController.index))
    .post(isLoggedIn, upload.array('image'), validateGym, catchAsync(gymController.createGym))

router.get('/new', isLoggedIn ,gymController.renderNewForm)

router.route('/:id')
    .get(catchAsync(gymController.showGym))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateGym, catchAsync(gymController.editGym))
    .delete(isLoggedIn, catchAsync(gymController.deleteGym))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(gymController.renderEditForm))



module.exports = router;