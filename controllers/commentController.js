const { Comment, Snippet, User } = require('../models');

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    SnippetId: req.params.id,
    UserId: req.user.id
  });
  res.json(comment);
};


exports.getCommentsIMade = async (req, res) => {
    const comments = await Comment.findAll({
        where: { UserId: req.user.id },
        include: [{ model: Snippet, attributes: ['title'] }]
    });
    res.json(comments);
};

exports.getCommentsOnMySnippets = async (req, res) => {
    const snippets = await Snippet.findAll({
        where: { UserId: req.user.id },
        include: [{ 
            model: Comment, 
            include: [{ model: User, attributes: ['username'] }] 
        }]
    });
    res.json(snippets);
};

exports.getAllComments = async (req, res) => {
    const comments = await Comment.findAll({
        include: [
            { model: User, attributes: ['username'] },
            { model: Snippet, attributes: ['title'] }
        ]
    });
    res.json(comments);
};


exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own comments" });
    }

    await comment.update({ content: req.body.content });
    res.json({ message: "Comment updated", comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.UserId !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsBySnippet = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { SnippetId: req.params.id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};