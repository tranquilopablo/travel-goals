const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const Place = require('../models/place');
const fileUpload = require('../middleware/file-upload');

// const DUMMY_USERS = [
//   {
//     id: 'u1',
//     name: 'Pawel Zguda',
//     image: 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
//     places: 3,
//     email: 'lpn83@yahoo.pl',
//     password: 'kolo12',
//   },
//   {
//     id: 'u2',
//     name: 'Tomasz Rydel',
//     image: 'https://images.pexels.com/photos/4095246/pexels-photo-4095246.jpeg',
//     places: 2,
//     email: 'zgudapawel@gmail.com',
//     password: 'pies44',
//   },
// ];

/////////////////////////////////////////////////////////////////
// GET ALL USERS
router.get('/', async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new Error(
      'Dostęp do użytkowników jest ograniczony, spróbuj póżniej'
    );
    error.code = 500;
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
});

//////////////////////////////////////////////////////////////////////
// GET USER BY ID

router.get('/:uid', async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new Error('Nie udało się znależć użytkownika');
    error.code = 500;
    return next(error);
  }
  if (!user) {
    const error = new Error('Nie znaleziono tego użytkownika');
    error.code = 404;
    return next(error);
  }
  res.status(201).json({
    userId: user.id,
    email: user.email,
    image: user.image,
    name: user.name,
  });
});
////////////////////////////////////////////////////////////////////
// REGISTER

router.post(
  '/signup',
  fileUpload.single('image'),
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
    console.log(req.body);
    const createdUser = new User({
      name,
      email,
      image: req.file.path,
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
router.patch(
  '/:uid',
  fileUpload.single('image'),
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Niepoprawne dane, proszę sprawdzić poprawność.');
      error.code = 422;
      return next(error);
    }
    const { name, email, password } = req.body;
    const userId = req.params.uid;

    let updatedUser;
    try {
      updatedUser = await User.findById(userId);
    } catch (err) {
      const error = new Error(
        'Pojawił się bląd, nie można edytować użytkownika.'
      );
      error.code = 500;
      return next(error);
    }

    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.password = password; //   - zmienic pozniej na haszowane haslo
    if (req.file) {
      updatedUser.image = req.file.path;
    } 

    try {
      await updatedUser.save();
    } catch (err) {
      const error = new Error(
        'Pojawił się bląd, nie można edytować użytkownika.'
      );
      error.code = 500;
      return next(error);
    }
    const userObject = updatedUser.toObject({ getters: true });
    res.status(200).json({
      userId: userObject.id,
      email: userObject.email,
      image: userObject.image,
    });
  }
);

//////////////////////////////////////////////////////////////////////////
//DELETE USER
router.delete('/:uid', async (req, res, next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId).populate('places');
  } catch (err) {
    const error = new Error('Pojawił się bląd, nie można usunąć użytkownika.');
    error.code = 500;
    return next(error);
  }
  if (!user) {
    const error = new Error('Nie można znależć użytkownika o podanym id');
    error.code = 404;
    return next(error);
  }

  const imagePath = user.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.deleteOne({ session: sess });
    await Place.deleteMany({ creator: userId }).session(sess);
    await sess.commitTransaction();
  } catch (err) {
    const error = new Error('Pojawił się bląd, nie można usunąć użytkownika.');
    error.code = 500;
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: 'Usunięto użytkownika' });
});

module.exports = router;
