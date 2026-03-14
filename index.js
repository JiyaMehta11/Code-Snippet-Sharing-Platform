require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/snippets', require('./routes/snippetRoutes'));
app.use('/api/fork', require('./routes/forkRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
});