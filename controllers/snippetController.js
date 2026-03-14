const { Snippet, User, Comment } = require('../models');

exports.createSnippet = async (req, res) => {
  const snippet = await Snippet.create({ ...req.body, UserId: req.user.id });
  res.status(201).json(snippet);
};

exports.getPublic = async (req, res) => {
  const snippets = await Snippet.findAll({ where: { isPrivate: false }, include: [User] });
  res.json(snippets);
};

exports.getMyPrivate = async (req, res) => {
  const snippets = await Snippet.findAll({ where: { UserId: req.user.id, isPrivate: true } });
  res.json(snippets);
};

exports.getSingle = async (req, res) => {
  const snippet = await Snippet.findByPk(req.params.id, { 
    include: [{ model: Comment, include: [User] }] 
  });
  if (snippet.isPrivate && snippet.UserId !== req.user.id) return res.status(403).json({ message: "Private" });
  res.json(snippet);
};

exports.getMyPrivateSnippets = async (req, res) => {
    try {
        const privateSnippets = await Snippet.findAll({
            where: { 
                UserId: req.user.id, 
                isPrivate: true 
            }
        });
        res.json(privateSnippets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByPk(req.params.id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    // Ownership Check
    if (snippet.UserId !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own snippets" });
    }

    await snippet.update(req.body);
    res.json({ message: "Snippet updated successfully", snippet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findByPk(req.params.id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    if (snippet.UserId !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own snippets" });
    }

    await snippet.destroy();
    res.json({ message: "Snippet and its comments deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};