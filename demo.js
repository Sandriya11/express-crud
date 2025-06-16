const express = require('express');  
const cors = require('cors');
const app = express();               
const port = 3001;   

const corsOptions = {
  origin: '*', // only allow this origin
  methods: ['GET', 'POST'],      // allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use(express.json());

// route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
