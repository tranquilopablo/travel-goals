const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const getCoordsForAddress = require('../util/location');

const Place = require('../models/place');

let DUMMY_PLACES = [
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
];

///////////////////////////////////////////////////////////////////////////////
// GET PLACE BY PLACE ID
router.get('/:pid', async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new Error('Nieudana próba znalezienia miejsca.');
    error.code = 500;
    return next(error);
  }
  if (!place) {
    const error = new Error('Nie znaleziono tego miejsca');
    error.code = 404;
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
});
//////////////////////////////////////////////////////////////////////////////////////////
// GET PLACES BY USER ID
router.get('/user/:uid', async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new Error('Nieudana próba pobrania miejsc, spróbuj ponownie');
    error.code = 500;
    return next(error);
  }
  if (!places || places.length === 0) {
    const error = new Error('Nie znaleziono żadnych miejsc tego uzytkownika!');
    error.code = 404;
    return next(error);
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
});

/////////////////////////////////////////////////////////////////////////////////////////
// CREATE PLACE
router.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Niepoprawne dane, sprawdź i popraww.');
      error.code = 422;
      return next(error);
    }

    const {
      id,
      title,
      description,
      address,
      creator,
      priority,
      status,
      done,
      image,
    } = req.body;
    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }

    // const createdPlace = {
    //   id: 'p7',
    //   title: 'Kościół Mariacki 2',
    //   description: 'Jedna z najsłyniejszych polskich kaplic!',
    //   image:
    //     'https://t3.gstatic.com/images?q=tbn:ANd9GcTsYfPmGJlhdYYoimizj9KjzYltxPMxmA3fOq7VYtpCUFdwFR8W',
    //   address: 'plac Mariacki 5, 31-042 Kraków, Polska',
    //   location: coordinates,
    //   creator: 'u7',
    //   done: true,
    //   priority: 2,
    //   status: 2,
    // };

    const createdPlace = new Place({
      title,
      description,
      address,
      location: coordinates,
      image:
        'https://t3.gstatic.com/images?q=tbn:ANd9GcTsYfPmGJlhdYYoimizj9KjzYltxPMxmA3fOq7VYtpCUFdwFR8W',
      creator,
      priority,
      status,
      done: false,
    });

    try {
      await createdPlace.save();
    } catch (err) {
      const error = new Error(
        'Próba stworzenia miejsca nieudana, spróbuj ponownie.'
      );
      error.code = 500;
      return next(error);
    }
    res.status(201).json({ place: createdPlace });
  }
);

/////////////////////////////////////////////////////////////////////////////////////////
// UPDATE PLACE
router.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Niepoprawne dane, sprawdź i popraw.');
      error.code = 422;
      return next(error);
    }
    const placeId = req.params.pid;

    const { title, description, image, address, priority, status } = req.body;

    const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    updatedPlace.image = image;
    updatedPlace.address = address;
    updatedPlace.priority = priority;
    updatedPlace.status = status;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({ place: updatedPlace });
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////
// DELETE PLACE
router.delete('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    const error = new Error('Nie znaleziono miejsca o podanym id.');
    error.code = 404;
    return next(error);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: 'usunieto miiejsce!' });
});

module.exports = router;
