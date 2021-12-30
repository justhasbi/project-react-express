const router = require('express').Router();

const Post = require('../models/Post')

// Create Post
router.post('/', (req, res, next) => {
  const body = req.body;

  const newPost = new Post(body);

  newPost.save()
    .then(savedPost => {
      res.header({ 'Content-Type': 'application/json' });
      res.json(savedPost.toJSON());
      res.status(200).end();
    }).catch(err => next(err));
});

// Update Post
router.put('/:id', async (req, res, next) => {
  const body = req.body;
  const params = req.params;

  const post = await Post.findById(params.id);

  if (post.username === body.username) {
    Post.findByIdAndUpdate(params.id, { $set: body }, { new: true })
      .then(result => {
        res.json(result);
        res.status(200).end();
      }).catch(error => next(err));
  } else {
    res.status(401).json({ result: 'Cannot Update this Post!' });
  }
});

// Delete Post
router.delete('/:id', async (req, res, next) => {
  const body = req.body;
  const params = req.params;

  const post = await Post.findById(params.id);
  console.log(post)

  if (post.username === body.username) {
    post.delete()
      .then(result => {
        res.status(200).json({ result: 'Data deleted!' });
        res.end();
      }).catch(err => next(err));
  } else {
    res.status(401).json({ result: 'Cannot Delete this Post!' });
  }
});

// Get Post By ID
router.get('/:id', (req, res, next) => {
  const params = req.params

  Post.findById(params.id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
        res.end();
      } else {
        res.status(404).json({ result: 'Data not found!' });
        res.end()
      }
    }).catch(err => next(err));
});

// Get All Post with query parameters
router.get('/', async (req, res, next) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ category: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;