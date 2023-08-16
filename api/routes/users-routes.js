const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const Place = require('../models/place');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Pawel Zguda',
    image: 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
    places: 3,
    email: 'lpn83@yahoo.pl',
    password: 'kolo12',
  },
  {
    id: 'u2',
    name: 'Tomasz Rydel',
    image: 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
    places: 2,
    email: 'zgudapawel@gmail.com',
    password: 'pies44',
  },
];

/////////////////////////////////////////////////////////////////
// GET ALL USERS
router.get('/', (req, res, next) => {
  res.json({ users: DUMMY_USERS });
});

//////////////////////////////////////////////////////////////////////
// GET USER BY ID

router.get('/:uid', (req, res, next) => {});

////////////////////////////////////////////////////////////////////
// REGISTER
router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        'Nieprawidłowe dane przeszły, proszę sprawdź dane.'
      );
      error.code = 422;
      return next(error);
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new Error(
        'Rejestracja się nie udała, proszę spróbuj ponownie'
      );
      error.code = 500;
      return next(error);
    }
    if (existingUser) {
      const error = new Error(
        'Użytkownik o podanym emailu już istnieje. Proszę zaloguj się w takim razie. '
      );
      error.code = 422;
      return next(error);
    }

    const createdUser = new User({
      name,
      email,
      image:
        'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
      password,
      places: [],
    });
    try {
      await createdUser.save();
    } catch (err) {
      const error = new Error(
        'Rejestracja się nie udała, proszę spróbuj ponownie.'
      );
      error.code = 500;
      return next(error);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
  }
);

////////////////////////////////////////////////////////////////////////
// LOGIN
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error('Logowanie się nie udało, proszę spróbuj ponownie');
    error.code = 500;
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new Error('Podane dane do logowania są nieprawidłowe ');
    error.code = 403;
    return next(error);
  }

  res.json({ message: 'Zalogowano!', existingUser });
});

////////////////////////////////////////////////////////////////////////
//UPDATE USER
router.patch('/:uid', (req, res, next) => {});

//////////////////////////////////////////////////////////////////////////
//DELETE USER
router.delete('/:uid', (req, res, next) => {});

module.exports = router;
