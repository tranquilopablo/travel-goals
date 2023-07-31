const express = require('express');
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrappers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Golden Gate Bridge',
    description: 'Iconic suspension bridge in San Francisco!',
    location: {
      lat: 37.8199286,
      lng: -122.4782551,
    },
    address: 'Golden Gate Bridge, San Francisco, CA 94129',
    creator: 'u2',
  },
  {
    id: 'p3',
    title: 'Eiffel Tower',
    description: 'Famous wrought-iron lattice tower in Paris!',
    location: {
      lat: 48.8583736,
      lng: 2.2922926,
    },
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    creator: 'u3',
  },
  {
    id: 'p4',
    title: 'Great Wall of China',
    description: 'Ancient fortification stretching across northern China!',
    location: {
      lat: 40.4319077,
      lng: 116.5703749,
    },
    address: 'Great Wall of China, Huairou, China',
    creator: 'u4',
  },
  {
    id: 'p5',
    title: 'Taj Mahal',
    description: 'Magnificent marble mausoleum in Agra, India!',
    location: {
      lat: 27.1751448,
      lng: 78.0421422,
    },
    address:
      'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
    creator: 'u5',
  },
  {
    id: 'p6',
    title: 'Sydney Opera House',
    description: 'Famous performing arts venue in Sydney!',
    location: {
      lat: -33.8567844,
      lng: 151.2152967,
    },
    address: 'Sydney Opera House, Bennelong Point, Sydney, NSW 2000, Australia',
    creator: 'u6',
  },
];



///////////////////////////////////////////////////////////////////////////////
// GET PLACE BY PLACE ID
router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  res.json({ place });
});
//////////////////////////////////////////////////////////////////////////////////////////
// GET PLACES BY USER ID
router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  res.json({ place });
});

/////////////////////////////////////////////////////////////////////////////////////////
// CREATE PLACE
router.post('/', (req, res, next) => {});

/////////////////////////////////////////////////////////////////////////////////////////
// UPDATE PLACE
router.patch('/:pid', (req, res, next) => {});

/////////////////////////////////////////////////////////////////////////////////////////////
// DELETE PLACE
router.delete('/:pid/:uid', (req, res, next) => {});

module.exports = router;
