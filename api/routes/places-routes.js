const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const getCoordsForAddress = require('../util/location');

const Place = require('../models/place');
const User = require('../models/user');

// let DUMMY_PLACES = [
//   {
//     id: 'p1',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrappers in the world!',
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     address: '20 W 34th St, New York, NY 10001',
//     creator: 'u1',
//   },
//   {
//     id: 'p2',
//     title: 'Golden Gate Bridge',
//     description: 'Iconic suspension bridge in San Francisco!',
//     location: {
//       lat: 37.8199286,
//       lng: -122.4782551,
//     },
//     address: 'Golden Gate Bridge, San Francisco, CA 94129',
//     creator: 'u2',
//   },
//   {
//     id: 'p3',
//     title: 'Eiffel Tower',
//     description: 'Famous wrought-iron lattice tower in Paris!',
//     location: {
//       lat: 48.8583736,
//       lng: 2.2922926,
//     },
//     address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
//     creator: 'u3',
//   },
//   {
//     id: 'p4',
//     title: 'Great Wall of China',
//     description: 'Ancient fortification stretching across northern China!',
//     location: {
//       lat: 40.4319077,
//       lng: 116.5703749,
//     },
//     address: 'Great Wall of China, Huairou, China',
//     creator: 'u4',
//   },
// ];

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

    const { title, description, address, creator, priority, status } = req.body;
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

    let user;
    try {
      user = await User.findById(creator);
    } catch (err) {
      const error = new Error(
        'Próba stworzenia miejsca nieudana, spróbuj ponownie.'
      );
      error.code = 500;
      return next(error);
    }
    if (!user) {
      const error = new Error('Nie można znależć użytkownika dla podanego id.');
      error.code = 404;
      return next(error);
    }

    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdPlace.save({ session: sess });
      user.places.push(createdPlace);
      await user.save({ session: sess });
      await sess.commitTransaction();
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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Niepoprawne dane, sprawdź i popraw.');
      error.code = 422;
      return next(error);
    }
    const placeId = req.params.pid;

    const { title, description, image, address, priority, status, done } =
      req.body;

    let coordinates;
    try {
      coordinates = await getCoordsForAddress(address);
    } catch (error) {
      return next(error);
    }

    let updatedPlace;
    try {
      updatedPlace = await Place.findById(placeId);
    } catch (err) {
      const error = new Error('Coś nie tak, nieudana próba edycji miejsca.');
      error.code = 500;
      return next(error);
    }
    updatedPlace.title = title;
    updatedPlace.description = description;
    updatedPlace.image = image;
    updatedPlace.address = address;
    updatedPlace.location = coordinates;
    updatedPlace.priority = priority;
    updatedPlace.status = status;
    updatedPlace.done = done;

    try {
      await updatedPlace.save();
    } catch (err) {
      const error = new Error('Coś nie tak, nieudana próba edycji miejsca.');
      error.code = 500;
      return next(error);
    }
    res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
  }
);

/////////////////////////////////////////////////////////////////////////////////////////////
// DELETE PLACE
router.delete('/:pid', async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch (err) {
    const error = new Error('Coś nie tak, nieudana próba usunięcia miejsca.');
    error.code = 500;
    return next(error);
  }
  if (!place) {
    const error = new Error('Nie można znależć miejsca dla podanego id.');
    error.code = 404;
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error('Coś nie tak, nieudana próba usunięcia miejsca.');
    error.code = 500;
    return next(error);
  }
  res.status(200).json({ message: 'Miejsce usunięto.' });
});

module.exports = router;
