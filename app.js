const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger); 
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
