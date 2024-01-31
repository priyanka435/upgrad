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
