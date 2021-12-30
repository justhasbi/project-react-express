const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * TODO
 * [x] Register
 * [x] Login
 */

// Register
router.post('/register', async (req, res, next) => {

  const body = req.body;
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(body.password, salt)
  const user = await User.findOne({ username: body.username })
  const email = await User.findOne({ email: body.email })

  const newUser = new User({
    username: body.username,
    email: body.email,
    birthdate: body.birthdate,
    password: hashedPass,
    profilePicture: body.profilePicture,
  });

  if (user === null && email === null) {
    newUser.save()
      .then(result => {
        res.header({ 'Content-Type': 'application/json' });
        res.status(200).json(result.toJSON());
        res.end();
      }).catch(err => next(err))
  } else if (user) {
    res.status(500).json({ result: 'Username is already used' });
    res.end();
  } else {
    res.status(500).json({ result: 'Email is already used' });
    res.end();
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    !user && res.status(400).json("Invalid Credentials")

    const validated = await bcrypt.compare(body.password, user.password)
    !validated && res.status(400).json("Invalid Credentials")
    // Exclude password
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error)
  }
});

module.exports = router;