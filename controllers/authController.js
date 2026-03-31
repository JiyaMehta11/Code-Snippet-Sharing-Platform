const { User, Snippet } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });
  res.status(201).json({ message: "Registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.getStats = async (req, res) => {
  const stats = await User.findAll({
    attributes: ['id', 'username', [sequelize.fn('COUNT', sequelize.col('Snippets.id')), 'snippetCount']],
    include: [{ model: Snippet, attributes: [] }],
    group: ['User.id']
  });
  res.json(stats);
};
