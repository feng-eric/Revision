var express = require('express');
var router = express.Router();
var User = require('../models/user')
var auth = require('../auth/auth');

/**
 * POST Request
 * Creating a new user
 * Request Body:
 * name: String
 * email: String
 * password: String, minimum 10 characters
 */
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    
    const token = await user.generateAuthToken();
    console.log("User is created");
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
  
})

/**
 * POST Request
 * Logging in as an user
 * Request Body:
 * email: String
 * password: String, minimum 10 characters
 */
router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).send({error: 'Login failed'});
    }
    
    const token = await user.generateAuthToken();
    console.log("User is logged in with new session");
    res.send({user, token});
  } catch (err) {
    res.status(400).send(err);
  }
})

/**
 * GET Request
 * Obtains log in information about current user and the tokens
 * Requires authorization to access
 */
router.get('/me', auth, async(req, res) => {
  res.send(req.user);
})

/**
 * POST Request
 * Logs out the current user by removing the token
 * Requires authorization to access
 */
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });

    await req.user.save();
    res.send()
  } catch (err) {
    res.status(500).send(err);
  }
})

/**
 * POST Request
 * Logs out all sessions of the user by removing all tokens
 * Requires authorization to access
 */
router.post('/logout/all', auth, async(req, res) => {
  try {
    // At position 0, remove length of tokens array
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
