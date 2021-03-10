var express = require('express');
var router = express.Router();
const { selectUser, getPlan, addSubscription, getSubscription } = require('../models');
const moment = require('moment');

/* GET users listing. */
router.post('/', async function(req, res, next) {

  const { user_name: userName = false, plan_id: planId = false, start_date: startDate = false } = req.body;

  // validate all the inputs

  if( !userName || !planId || !startDate ) {
    return res.status(406).json({
      status: false,
      msg: 'All three parameters required `user_name, plan_id and start_date`'
    })
  }

  const getUser = await selectUser(userName);
  if( getUser.length <= 0 ) {
    return res.status(406).json({
      status: false,
      msg: `Cannot find user with username: ${userName}`
    })
  }
  const { id: userId } = getUser[0];

  const getPlanData = await getPlan(planId);
  if( getPlanData.length <= 0 ) {
    return res.status(406).json({
      status: false,
      msg: `Cannot find any plan with Name: ${planId}`
    })
  }
  const { id: planUniqueIdForDb, cost } = getPlanData[0];

  const addSubscriptionStatus = await addSubscription(userId, planUniqueIdForDb, startDate);

  if( addSubscriptionStatus ) {
    return res.status(200).json({
      status: 'SUCCESS',
      amount: `${cost} Amount Debited`
    })
  }
});

router.get('/:username/:date?', async function(req, res) {

  const { username, date = false } = req.params;

  const getUser = await selectUser(username);
  if( getUser.length <= 0 ) {
    return res.status(406).json({
      status: false,
      msg: `Cannot find user with username: ${username}`
    })
  }
  const { id: userId } = getUser[0];

  const subscriptions = await getSubscription(userId);

  const final = subscriptions.map((el) => {
    return {
      plan_id: el.plan_id,
      start_date: el.start_date,
      valid_till: Number(el.valid_till) > 0 ? moment(el.start_date, 'YYYY-MM-DD').add(el.valid_till, 'days').format('YYYY-MM-DD') : 0
    }
  })

  if( date ) {
    const specifiedDate = moment(date);
    let diffDays = 0;
    const finalForSpecifiedDate = final.find((el) => {
      diffDays = moment(el.valid_till).diff(specifiedDate, 'days');
      return diffDays > 0;
    })

    return res.json({
      plan_id: finalForSpecifiedDate.plan_id,
      days_left: diffDays >= 0 ? diffDays : 0 
    });
  }

  return res.json(final);
})

module.exports = router;
