const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:id', auth, commentController.addComment);
router.get('/made-by-me', auth, commentController.getCommentsIMade);
router.get('/on-my-code', auth, commentController.getCommentsOnMySnippets);
router.get('/all', auth, commentController.getAllComments);


router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);
router.get('/snippet/:id', commentController.getCommentsBySnippet);

module.exports = router;