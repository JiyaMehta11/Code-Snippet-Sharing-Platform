const { Snippet } = require('../models');

exports.forkSnippet = async (req, res) => {
  const original = await Snippet.findByPk(req.params.id);
  if (!original || (original.isPrivate && original.UserId !== req.user.id))
    return res.status(403).json({ message: "Forbidden" });

  const fork = await Snippet.create({
    title: `Fork of ${original.title}`,
    code: original.code,
    language: original.language,
    parentId: original.id,
    UserId: req.user.id
  });
  res.json(fork);
};

exports.forkSnippet = async (req, res) => {
    try {
        const original = await Snippet.findByPk(req.params.id);
        
        if (!original) return res.status(404).json({ message: "Snippet not found" });

        if (original.isPrivate && original.UserId !== req.user.id) {
            return res.status(403).json({ message: "Access Denied: Cannot fork private snippets" });
        }

        const fork = await Snippet.create({
            title: `Fork of ${original.title}`,
            code: original.code,
            language: original.language,
            parentId: original.id,
            UserId: req.user.id
        });
        res.json(fork);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
