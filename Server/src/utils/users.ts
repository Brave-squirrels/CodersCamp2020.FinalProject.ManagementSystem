const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {
  validateUser
} = require('../models/user');
const {
  sednEmail
} = require('./email');
const mongoose = require('mongoose');
const auth = require('../middleware/authorization');
const admin = require('../middleware/admin');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const User = res.locals.models.user;
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  // // send email -----------------
  const url = `http://127.0.0.1:8080/api/users/confirmation/${token}`;
  sednEmail(req.body.email, url);

  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/email', async (req, res) => {
  function validate(req) {
    const schema = {
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      token: Joi.string()
    };
    return Joi.validate(req, schema);
  }

  const {
    error,
    value
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // // send email -----------------
  const url = `http://127.0.0.1:8080/api/users/confirmation/${req.body.token}`;
  sednEmail(req.body.email, url);

  res.send('Email sent');
});

router.get('/confirmation/:token', async (req, res) => {
  const User = res.locals.models.user;

  let user = await jwt.verify(req.params.token, process.env.JWTPRIVATEKEY);
  user = await User.findByIdAndUpdate(user._id, {
    isVerified: true
  }, {
    new: true
  });

  res.redirect('http://localhost:3000/confirmed');
});

router.get('/', async (req, res) => {
  const User = res.locals.models.user;
  const users = await User.find()
    .select('_id email')
    .sort('email');

  res.send(users);
});

router.get('/count', async (req, res) => {
  const User = res.locals.models.user;
  const usersCount = await User.find()
    .then(response => response.length);

  res.send(`${usersCount}`);
});

router.get('/me', auth, async (req, res) => {
  const User = res.locals.models.user;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'name', 'email', 'character_id']));
});

router.get('/:id', async (req, res) => {
  const User = res.locals.models.user;
  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findById(req.params.id);
  }

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.get('/character/:character_id?', async (req, res) => {
  const User = res.locals.models.user;

  const character_idParam = req.params.character_id;

  const searchObj = () => {
    if (character_idParam != 'All')
      return {
        character_id: character_idParam
      };
    else
      return;
  }

  const user = await User.find(searchObj()).sort('name');
  if (!user) res.status(404).send(`Guild with type ${req.params.character_id} not found`);

  res.send(_.pick(user[0], ['_id', 'email', 'name']));
});

router.get('/search/:charId&:tags?', async (req, res) => {
  const User = res.locals.models.user;

  const charIdParam = req.params.charId;
  const tagsArray = req.params.tags ? req.params.tags.split('_') : '';

  const searchObj = () => {
    if (charIdParam != 'All')
      return {
        character_id: charIdParam
      };
    else
      return;
  }

  const user = await User
    .find(searchObj())
    .sort('email');

  const result = filterByValue(user, tagsArray)

  res.send(
    result.map((elem) => {
      state = {
        _id: elem._id,
        name: elem.name,
        email: elem.email,
        character_id: elem.character_id,
      }
       return (state)
      })
  )
});

router.put('/me/password', auth, async (req, res) => {
  const User = res.locals.models.user;
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findByIdAndUpdate(
    req.user._id, {
      password: newPassword
    }, {
      new: true,
    },
  );
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.put('/:id/password', [auth, /*admin*/], async (req, res) => {
  const User = res.locals.models.user;
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(req.body.password, salt);

  let user;
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    user = await User.findByIdAndUpdate(req.params.id, {
      password: newPassword
    }, {
      new: true
    });
  }

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(_.pick(user, ['_id', 'email']));
});

router.put('/:id/character_id', (req, res) => {
  const User = res.locals.models.user;
  getUsers(User, req.params.id).then(result => {
    if (!result) {
      res.status(404).send(`User with this id: ${req.params.id} not found`);
    } else {
      User.findByIdAndUpdate(
        req.params.id, {
          character_id: req.body.character_id,
        }, {
          new: true
        },
      ).then(
        r => {
          res.send('CharID updated!');
        },
        err => {
          res.status(403).send('Bad request!');
        },
      );
    }
  });
});

async function getUsers(User, id) {
  if (id) {
    return await User.find({
      _id: id
    }).then(
      result => {
        return result[0];
      },
      err => console.log('Error', err),
    );
  } else {
    return await User.find().then(
      result => {
        return result;
      },
      err => console.log('Error', err),
    );
  }
}

function filterByValue(user, tags) {
  if (!tags)
    return user;
  return user.filter(o => {
    return tags.every(t => {
      return o.email.concat(o.description, o.type).toLowerCase().includes(t);
    })
  })
}

module.exports = router;