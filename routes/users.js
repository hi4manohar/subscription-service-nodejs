var express = require('express');
var router = express.Router();
var validator = require('validator');
const { selectUser, addUser } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:username', async function(req, res) {

  const { username = false } = req.params;

  if( !username || !validator.isAlphanumeric(username) ) {
    return res.status(406).json({
      status: false,
      msg: 'Username can only contain numbers and letters'
    })
  }

  // check if user exist
  try {
    const getUser = await selectUser(username);
    if( getUser.length > 0 ) {
      return res.status(208).json({
        status: false,
        msg: `A user with username ${username} Already exist`
      })
    } else {
      const addUserStatus = await addUser(username);
      return res.status(200).json({
        status: true,
        msg: 'User added'        
      })
    }
  } catch(err) {
    throw err;
  }

})

router.get('/:username', async function(req, res) {

  const { username = false } = req.params;

  if( !username || !validator.isAlphanumeric(username) ) {
    return res.status(406).json({
      status: false,
      msg: 'Username can only contain numbers and letters'
    })
  }

  try {
    const getUser = await selectUser(username);
    if( getUser.length > 0 ) {
      return res.status(200).json({
        user_name: getUser[0].username,
        "created_at": getUser[0].created_at
      })
    } else {
      return res.status(200).json({
        status: false,
        msg: `No user found with username ${username}`
      })
    }
  } catch(err) {
    throw err;
  }
})

module.exports = router;
