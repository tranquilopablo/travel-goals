const express = require('express');
const router = express.Router();

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
router.post('/signup', (req, res, next) => {});

////////////////////////////////////////////////////////////////////////
// LOGIN
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => (user.email = email));

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new Error('Nie można zalogować, sprawdż poprawność danych.'));
  }
  error.code = 403;
  return next(error);
});

////////////////////////////////////////////////////////////////////////
//UPDATE USER
router.patch('/:uid', (req, res, next) => {});

//////////////////////////////////////////////////////////////////////////
//DELETE USER
router.delete('/:uid', (req, res, next) => {});

module.exports = router;
