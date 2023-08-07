const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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
router.post('/signup', (req, res, next) => {
  const { name, email, password, id, image } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    const error = new Error('Uzytkownik o podanym email już istnieje!');
    error.code = 422;
    return next(error);
  }

  const createdUser = {
    id,
    name,
    email,
    password,
    image,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
});

////////////////////////////////////////////////////////////////////////
// LOGIN
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  let existingUser = DUMMY_USERS.find((user) => user.email === email);

  if (!existingUser || existingUser.password !== password) {
    const error = new Error('Nie można zalogować, sprawdż poprawność danych.');
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
