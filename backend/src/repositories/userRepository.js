const User = require('../models/User');

class UserRepository {
  async create(data) {
    return await User.create(data);
  }

  async findById(id) {
    return await User.findById(id).select('-senha');
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select('+senha');
  }

  async findAll() {
    return await User.find().select('-senha');
  }

  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    }).select('-senha');
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  async count() {
    return await User.countDocuments();
  }
}

module.exports = new UserRepository();