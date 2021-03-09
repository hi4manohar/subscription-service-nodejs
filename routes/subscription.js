var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET users listing. */
router.post('/', function(req, res, next) {

  const { user_name = false, plan_id = false, start_date = false } = req.body;

  if( !user_name || !plan_id || !start_date ) {
    return res.status(406).json({
      status: false,
      msg: 'All three parameters required `user_name, plan_id and start_date`'
    })
  }

  res.json(req.body);
});

module.exports = router;
