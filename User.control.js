const User = require('../models/user.model');
const uuid = require('uuid-token-generator');

// Assuming you have a middleware for authentication
const authenticate = async (req, res, next) => {
  // Implement your authentication logic here
  // Check the presence and validity of the access token
  // ...

  next();
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
      const accessToken = uuid(8, uuid.BASE62);

      // Store the access token in MongoDB
      user.accessToken = accessToken;
      await user.save();

      res.json({ accessToken });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.logout = async (req, res) => {
  try {
    // Assuming the user is authenticated
    const { username } = req.body;

    // Clear the access token in MongoDB
    const user = await User.findOne({ username });
    user.accessToken = null;
    await user.save();

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
