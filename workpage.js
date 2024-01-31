const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('/auth', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/auth', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
