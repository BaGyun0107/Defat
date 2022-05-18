const express = require('express');
const { user_meal } = require('../controllers');
const router = express.Router();
const user_meal = require('../controllers/user_meal')

<<<<<<< HEAD

router.get('/', user_meal.user_meal.get)
// router.post('/')
=======
router.get('/', user_meal.user_meal.get)
router.post('/', user_meal.user_meal.post)
>>>>>>> 6b72d2089d36bd33f165029a1caa707208804f11



module.exports = router;