const router = require('express').Router();
const forkCtrl = require('../controllers/forkController');
const auth = require('../middleware/auth');

router.post('/:id', auth, forkCtrl.forkSnippet);
module.exports = router;