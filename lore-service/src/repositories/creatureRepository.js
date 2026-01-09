const BaseRepository = require('./baseRepository');
const Creature = require('../models/Creature');
const Testimony = require('../models/Testimony');
const { TESTIMONY_STATUS } = require('../constants');

class CreatureRepository extends BaseRepository {
  constructor() {
    super(Creature);
  }

  async findByName(name) {
    return await this.model.findOne({ name });
  }

  async findByAuthor(authorId, options = {}) {
    return await this.findAll({ authorId }, options);
  }

  async search(searchTerm, options = {}) {
    const regex = new RegExp(searchTerm, 'i');
    return await this.findAll(
      {
        $or: [
          { name: regex },
          { origin: regex }
        ]
      },
      options
    );
  }

  /**
   * Find creatures with legendScore calculated
   * Uses MongoDB aggregation to count validated testimonies
   */
  async findAllWithLegendScore(filters = {}, options = {}) {
    const { limit = 50, skip = 0, sortBy = 'createdAt', sortOrder = -1 } = options;

    const pipeline = [
      // Match filters
      { $match: filters },

      // Lookup validated testimonies count
      {
        $lookup: {
          from: 'testimonies',
          let: { creatureId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$creatureId', '$$creatureId'] },
                    { $eq: ['$status', TESTIMONY_STATUS.VALIDATED] }
                  ]
                }
              }
            },
            { $count: 'count' }
          ],
          as: 'validatedTestimonies'
        }
      },

      // Add validatedTestimoniesCount field
      {
        $addFields: {
          validatedTestimoniesCount: {
            $ifNull: [
              { $arrayElemAt: ['$validatedTestimonies.count', 0] },
              0
            ]
          },
          // Calculate legendScore: 1 + validatedTestimonies / 5
          legendScore: {
            $add: [
              1,
              {
                $divide: [
                  {
                    $ifNull: [
                      { $arrayElemAt: ['$validatedTestimonies.count', 0] },
                      0
                    ]
                  },
                  5
                ]
              }
            ]
          }
        }
      },

      // Remove temporary field
      {
        $project: {
          validatedTestimonies: 0
        }
      },

      // Sort
      {
        $sort: sortBy === 'legendScore'
          ? { legendScore: sortOrder }
          : { [sortBy]: sortOrder }
      },

      // Pagination
      { $skip: skip },
      { $limit: limit }
    ];

    return await this.model.aggregate(pipeline);
  }

  /**
   * Find creature by ID with legendScore
   */
  async findByIdWithLegendScore(id) {
    const result = await this.model.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: 'testimonies',
          let: { creatureId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$creatureId', '$$creatureId'] },
                    { $eq: ['$status', TESTIMONY_STATUS.VALIDATED] }
                  ]
                }
              }
            },
            { $count: 'count' }
          ],
          as: 'validatedTestimonies'
        }
      },
      {
        $addFields: {
          validatedTestimoniesCount: {
            $ifNull: [
              { $arrayElemAt: ['$validatedTestimonies.count', 0] },
              0
            ]
          },
          legendScore: {
            $add: [
              1,
              {
                $divide: [
                  {
                    $ifNull: [
                      { $arrayElemAt: ['$validatedTestimonies.count', 0] },
                      0
                    ]
                  },
                  5
                ]
              }
            ]
          }
        }
      },
      {
        $project: {
          validatedTestimonies: 0
        }
      }
    ]);

    return result.length > 0 ? result[0] : null;
  }
}

module.exports = new CreatureRepository();
