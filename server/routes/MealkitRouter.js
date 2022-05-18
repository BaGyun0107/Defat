const router = require('express').Router();
const { kits } = require('../controllers');

router.get('/', kits.detail.get)
router.get('/information', kits.information.get)
router.get('/find/:searchText', kits.find.get)


module.exports = router;