// Import Model CategoryModel
const Category = require('../models/CategoryModel');

// Baca semua data
exports.listAllCategorys = (req, res) => {
  Category.find({}, (err, Category) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(Category);
  });
};

// Tambah data dengan validasi
exports.createNewCategory = (req, res) => {
  let newCategory = new Category(req.body);
  newCategory.save((err, Category) => {
    if (err) {
      res.status(500).send({ message: 'Please fill all the fields' });
    }
    res.status(201).json(Category);
  });
};

// Baca data berdasarkan id
exports.readCategory = (req, res) => {
  Category.findById(req.params.categoryid, (err, Category) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(Category);
  });
};

// Ubah data berdasarkan id
exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    { _id: req.params.categoryid },
    req.body,
    { new: true },
    (err, Category) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json({ message: 'Category successfully Updated' });
    }
  );
};

// Hapus data berdasarkan id
exports.deleteCategory = (req, body) => {
  Category.remove({ _id: req.params.categoryid }, (err, Category) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: 'Category successfully deleted' });
  });
};
