const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Snippet = sequelize.define('Snippet', {
  title: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.TEXT, allowNull: false },
  language: { type: DataTypes.STRING, defaultValue: 'javascript' },
  isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
  parentId: { type: DataTypes.INTEGER, allowNull: true }
});

module.exports = Snippet;