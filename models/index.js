const sequelize = require('../config/db');
const User = require('./User');
const Snippet = require('./Snippet');
const Comment = require('./Comment');

User.hasMany(Snippet);
Snippet.belongsTo(User);

Snippet.hasMany(Comment, { onDelete: 'CASCADE', hooks: true });
Comment.belongsTo(Snippet);

User.hasMany(Comment);
Comment.belongsTo(User);

Snippet.belongsTo(Snippet, { as: 'OriginalSnippet', foreignKey: 'parentId', onDelete: 'SET NULL' });

module.exports = { sequelize, User, Snippet, Comment };