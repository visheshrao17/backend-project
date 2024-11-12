
const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { username, email, password, user_type } = req.body;
    console.log(username, email, password, user_type)
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    
    user = new User({
      username,
      email,
      password: hashedPassword,
      user_type
    });
    
    await user.save();

    const token = generateToken(user.id);

    console.log('User created successfully:', user);
    
    res.status(201).json({ token });
    
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    let user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await comparePassword(password, user.password);



    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = generateToken(user.id);

    console.log('Login successful, token generated:', token);

    res.json({ token });
    
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
};
