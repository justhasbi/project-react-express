const router = require('express').Router();

const Category = require('../models/Category');

// Create Category
router.post('/', (req, res, next) => {
  const body = req.body
  const newCat = new Category(body);

  newCat.save()
    .then(result => {
      res.header({ 'Content-Type': 'application/json' });
      res.status(200).json(result);
      res.end();
    }).catch(err => next(err));
});

// Get All Category
router.get('/', (req, res, next) => {
  Category.find()
    .then(result => {
      res.status(200).json(result);
      res.end()
    }).catch(err => next(err));
});

// Get Category by id
router.get('/:id', (req, res, next) => {
  const params = req.params

  Category.findById(params.id)
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

// Delete Category
router.delete('/:id', (req, res, next) => {
  const params = req.params

  Category.findByIdAndDelete(params.id)
    .then(result => {
      res.json({ result: 'Category deleted!' });
      res.status(204).end();
    }).catch(err => next(err));
});

module.exports = router;