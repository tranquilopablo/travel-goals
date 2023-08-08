const API_KEY = process.env.GOOGLE_API_KEY;
const axios = require('axios');

async function getCoordsForAddress(address) {
  const response = await axios.get();

  const coordinates = {};
  return coordinates;
}

module.exports = getCoordsForAddress;
