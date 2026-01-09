/**
 * Base Repository Class
 * Provides common CRUD operations for all repositories
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }

  async findById(id, populate = null) {
    let query = this.model.findById(id);
    if (populate) {
      query = query.populate(populate);
    }
    return await query.exec();
  }

  async findOne(filters, populate = null) {
    let query = this.model.findOne(filters);
    if (populate) {
      query = query.populate(populate);
    }
    return await query.exec();
  }

  async findAll(filters = {}, options = {}) {
    const { limit = 50, skip = 0, sort = { createdAt: -1 }, populate = null } = options;

    let query = this.model.find(filters)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    if (populate) {
      query = query.populate(populate);
    }

    return await query.exec();
  }

  async update(id, updateData) {
    return await this.model.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async count(filters = {}) {
    return await this.model.countDocuments(filters);
  }

  async exists(filters) {
    const count = await this.model.countDocuments(filters).limit(1);
    return count > 0;
  }

  async bulkCreate(dataArray) {
    return await this.model.insertMany(dataArray);
  }

  async deleteMany(filters) {
    return await this.model.deleteMany(filters);
  }
}

module.exports = BaseRepository;
