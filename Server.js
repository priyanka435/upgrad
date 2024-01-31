const express = require('express');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Use SSL certificate (replace with your own paths)
const privateKey = fs.readFileSync('/path/to/private-key.pem', 'utf8');
const certificate = fs.readFileSync('/path/to/certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/auth', userRoutes);

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
