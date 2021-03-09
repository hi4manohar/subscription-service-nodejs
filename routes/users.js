var express = require('express');
var router = express.Router();
var moment = require('moment');
var validator = require('validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:username', function(req, res) {

  const { username = false } = req.params;

  if( !username || !validator.isAlphanumeric(username) ) {
    return res.status(406).json({
      status: false,
      msg: 'Username can only contain numbers and letters'
    })
  }
  return res.status(200).json({
    user_name: req.params.username,
    "created_at": moment().format('YYYY-MM-DD HH:mm:ss')
  })
})

module.exports = router;
