const express = require('express');
const router = express.Router();



/////////////////////////////////////////////////////////////////
// GET ALL USERS
router.get('/', (req, res, next) => {});

//////////////////////////////////////////////////////////////////////
// GET USER BY ID

router.get('/:uid', (req, res, next) => {});

////////////////////////////////////////////////////////////////////
// REGISTER
router.post('/signup', (req, res, next) => {});

////////////////////////////////////////////////////////////////////////
// LOGIN
router.post('/login', (req, res, next) => {});

////////////////////////////////////////////////////////////////////////
//UPDATE USER
router.patch('/:uid', (req, res, next) => {});

//////////////////////////////////////////////////////////////////////////
//DELETE USER
router.delete('/:uid', (req, res, next) => {});

module.exports = router;
