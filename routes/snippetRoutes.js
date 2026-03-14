const router = require('express').Router();
const snipCtrl = require('../controllers/snippetController');
const auth = require('../middleware/auth');

router.post('/', auth, snipCtrl.createSnippet);
router.get('/public', snipCtrl.getPublic);
router.get('/my-private', auth, snipCtrl.getMyPrivate);
router.get('/:id', auth, snipCtrl.getSingle);

router.put('/:id', auth, snipCtrl.updateSnippet);
router.delete('/:id', auth, snipCtrl.deleteSnippet);

module.exports = router;