const express = require('express');
const { user_meal } = require('../controllers');
const router = express.Router();

router.get('/', user_meal.user_meal.get)
router.post('/', user_meal.user_meal.post)
router.delete('/',user_meal.user_meal.delete)



module.exports = router;