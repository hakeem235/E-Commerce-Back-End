const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categorieData = await Category.findAll({
      include: [{ model: Product, through: Category, as: category_id }],
    });
    res.status(200).json(categorieData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categorieData = await Product.findByPk(req / this.params.id, {
      include: [{ model: Product, through: Category, as: category_id }],
    });
    if (!categorieData) {
      res.status(404).json({
        message: 'No categorie found with that id!'
      });
      return;
    }
    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categorieData = await Category.create({
      where: { category_name: req.body.category_name }
    });
    res.status(200).json(categorieData);
  } catch (err) {
    res.status(400).jason(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const categorieData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!categorieData[0]){
    res.status(404).json({ message: 'No category with this id!' });
    return;
  }
  res.status(200).json(categorieData);
} catch (err) {
  res.status(500).jason(err);
}
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const categorieData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!CharacterData){
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categorieData);
  } catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;