const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');
const logger = require('./middleware/logger');
const { sequelize } = require('./models');
//const con= require('./config/db.js')
//const { getPagination, formatPagination } = require('../utils/helper');




const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']}

  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger); 
app.use(userRoutes);




sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

