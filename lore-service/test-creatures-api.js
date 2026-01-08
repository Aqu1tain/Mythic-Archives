require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'http://localhost:3001';
let createdCreatureId;

async function testCreatureAPI() {
  try {
    console.log('=== Testing Creature API Endpoints ===\n');

    console.log('1. Testing POST /creatures - Create a creature');
    const createResponse = await axios.post(`${BASE_URL}/creatures`, {
      authorId: 'user123',
      name: 'Dragon des Neiges',
      origin: 'Montagnes glacées du Nord'
    });
    console.log('✅ Status:', createResponse.status);
    console.log('✅ Response:', JSON.stringify(createResponse.data, null, 2));
    createdCreatureId = createResponse.data.creature._id;
    console.log('\n---\n');

    console.log('2. Testing POST /creatures - Duplicate name (should fail)');
    try {
      await axios.post(`${BASE_URL}/creatures`, {
        authorId: 'user456',
        name: 'Dragon des Neiges',
        origin: 'Autre lieu'
      });
    } catch (error) {
      console.log('✅ Expected error - Status:', error.response.status);
      console.log('✅ Error message:', error.response.data.error.message);
    }
    console.log('\n---\n');

    console.log('3. Testing GET /creatures/:id - Get creature by ID');
    const getByIdResponse = await axios.get(`${BASE_URL}/creatures/${createdCreatureId}`);
    console.log('✅ Status:', getByIdResponse.status);
    console.log('✅ Response:', JSON.stringify(getByIdResponse.data, null, 2));
    console.log('\n---\n');

    console.log('4. Testing POST /creatures - Create another creature');
    const create2Response = await axios.post(`${BASE_URL}/creatures`, {
      authorId: 'user456',
      name: 'Phénix Doré',
      origin: 'Déserts brûlants du Sud'
    });
    console.log('✅ Status:', create2Response.status);
    console.log('✅ Creature name:', create2Response.data.creature.name);
    console.log('\n---\n');

    console.log('5. Testing GET /creatures - Get all creatures');
    const getAllResponse = await axios.get(`${BASE_URL}/creatures`);
    console.log('✅ Status:', getAllResponse.status);
    console.log('✅ Total creatures:', getAllResponse.data.pagination.total);
    console.log('✅ Creatures:', getAllResponse.data.creatures.map(c => c.name));
    console.log('\n---\n');

    console.log('6. Testing GET /creatures?authorId=user123 - Filter by author');
    const filterResponse = await axios.get(`${BASE_URL}/creatures?authorId=user123`);
    console.log('✅ Status:', filterResponse.status);
    console.log('✅ Filtered creatures:', filterResponse.data.creatures.map(c => c.name));
    console.log('\n---\n');

    console.log('7. Testing GET /creatures/:id - Invalid ID (should fail)');
    try {
      await axios.get(`${BASE_URL}/creatures/invalid-id`);
    } catch (error) {
      console.log('✅ Expected error - Status:', error.response.status);
      console.log('✅ Error message:', error.response.data.error.message);
    }
    console.log('\n---\n');

    console.log('8. Testing POST /creatures - Missing name (should fail)');
    try {
      await axios.post(`${BASE_URL}/creatures`, {
        authorId: 'user123',
        origin: 'Somewhere'
      });
    } catch (error) {
      console.log('✅ Expected error - Status:', error.response.status);
      console.log('✅ Error message:', error.response.data.error.message);
    }
    console.log('\n---\n');

    console.log('=== All tests completed successfully! ===');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testCreatureAPI();
