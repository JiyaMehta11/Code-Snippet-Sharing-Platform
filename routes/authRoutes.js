const router = require('express').Router();
const authCtrl = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/stats', auth, authCtrl.getStats);
module.exports = router;