var express = require('express');
var router = express.Router();
var User = require('../models/user')
var auth = require('../auth/auth');
var { ErrorHandler } = require('../helpers/error');
var bcrypt = require('bcryptjs')

/**
 * POST Request
 * Creating a new user
 * Request Body:
 * name: String
 * email: String
 * password: String, minimum 10 characters
 */
router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body);

    await user.save()
      .catch((err) => {
        throw new ErrorHandler(400, err._message);
      });
    
    const token = await user.generateAuthToken();
    console.log("User is created");
    res.status(201).send({ user, token });
  } catch (err) {
    next(err);
  }
  
})

/**
 * POST Request
 * Logging in as an user
 * Request Body:
 * email: String
 * password: String, minimum 10 characters
 */
router.post('/login', async(req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (!user) 
      throw new ErrorHandler(400, 'Invalid Email');
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) 
      throw new ErrorHandler(400, 'Invalid Password');
    
    const token = await user.generateAuthToken();

    console.log("User is logged in with new session");
    res.send({user, token});
  } catch (err) {
    next(err);
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

router.get('/all', auth, async(req, res) => {
  try {
    User.find(
        {},
        null,
        {
            sort: { createdAt: 1 }
        },
        (err, users) => {
            if (err) {
                return next(new ErrorHandler(400, err.message));
            }
            res.status(200).send(users);
        }
    )
  } catch (err) {
    next(err);
  }
})

/**
 * POST Request
 * Logs out the current user by removing the token
 * Requires authorization to access
 */
router.post('/logout', auth, async (req, res) => {
  console.log(req.user)
  try {
    req.user.tokens = req.user.tokens.filter((tokens) => {
      return tokens.token != req.token;
    });

    await req.user.save()
      .catch((err) => {
        throw new ErrorHandler(400, err._message);
      });

    res.send();
  } catch (err) {
    next(err);
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

    await req.user.save()
      .catch((err) => {
        throw new ErrorHandler(400, err._message);
      });

    res.send();
  } catch (err) {
    next(err);
  }
})

module.exports = router;
