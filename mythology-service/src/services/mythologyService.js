const axios = require('axios');

const LORE_SERVICE_URL = process.env.LORE_SERVICE_URL || 'http://localhost:3002';

class MythologyService {
  async getStats() {
    const { data } = await axios.get(`${LORE_SERVICE_URL}/creatures`);

    const creatures = data.creatures || [];
    const total = creatures.length;

    if (total === 0) {
      return {
        totalCreatures: 0,
        averageTestimonies: 0,
        classification: {
          legendary: 0,
          common: 0
        }
      };
    }

    const totalTestimonies = creatures.reduce((sum, creature) => {
      return sum + (creature.validatedTestimonies || 0);
    }, 0);

    const averageTestimonies = total > 0 ? totalTestimonies / total : 0;

    const legendary = creatures.filter(c => (c.legendScore || 0) >= 5).length;
    const common = total - legendary;

    return {
      totalCreatures: total,
      averageTestimonies: parseFloat(averageTestimonies.toFixed(2)),
      classification: {
        legendary,
        common
      }
    };
  }
}

module.exports = new MythologyService();
