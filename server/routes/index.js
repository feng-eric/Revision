var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', (req, res) => {
  // console.log(process.env.AWS_ACCESS_KEY_ID);
  // console.log(process.env.AWS_SECRET_ACCESS_KEY);
  // console.log(process.env.AWS_BUCKET_NAME);
  res.status(200).send('hi');
})

module.exports = router;
