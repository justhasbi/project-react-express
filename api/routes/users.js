const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

/**
 * TODO
 * [x] Update User
 * [X] Delete User
 * [X] Get User
 */

// Update user
router.put('/:id', async (req, res, next) => {
  const body = req.body
  const params = req.params

  if (body.password) {
    const salt = await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password, salt)
  }

  User.findByIdAndUpdate(params.id, { $set: body }, { new: true })
    .then(result => {
      res.json(result);
      res.status(200).end()
    }).catch(error => next(err));
})

// Delete User
// Delete Post
router.delete('/:id', async (req, res, next) => {
  const params = req.params;
  const user = await User.findById(params.id)

  Post.deleteMany({ username: user.username })

  User.findByIdAndDelete(params.id)
    .then(result => {
      res.json({ result: 'User Deleted' });
      res.status(204).end()
    }).catch(err => next(err));
});

// Get User
router.get('/:id', async (req, res, next) => {
  try {
    const params = req.params

    const user = await User.findById(params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    next(err)
  }
});

// get all user
router.get('/', async (req, res, next) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
});

module.exports = router;