const express = require('express');
const { user_meal } = require('../controllers');
const router = express.Router();


router.get('/', user_meal.user_meal.get)
// router.post('/')



module.exports = router;