const Product = require('../models/Product');

class ProductRepository {
  async create(data) {
    return await Product.create(data);
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async findAll() {
    return await Product.find();
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  async count() {
    return await Product.countDocuments();
  }
}

module.exports = new ProductRepository();