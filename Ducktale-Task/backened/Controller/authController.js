const User = require('../Model/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { name,email, password } = req.body;
  console.log(req.body);
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name,email, password });
    res.status(201).json({
      message:"user registered successfully",
      _id: user._id,
      name:user.name,
      username: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Register Error:', error);
  res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        message:"user Login Successfully",
        _id: user._id,
        username: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login Error:', error);
  res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };