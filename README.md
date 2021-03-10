## About Project

A Basic REST service for a "Subscription as
a Service" startup . This REST service can be used by companies that will define
subscriptions plans to which the users of the platform can subscribe to.

## How To Start

* Use npm install
* use npm start to start the app
* For Debug Mode use DEBUG=subscription-service-nodejs:* npm start
* Import `subscript-service.sql` in the mysql using some gui tools or from Terminal
* Configure host and password for the DB in `configs/mysql.config.js`

## API ROUTES

* /user
* /subscription

## PUT /user/
creates a user with specified username in the DB.

Sample Input:  PUT /user/jay 
Required Output: Just a HTTP status: 200 on success, other appropriate code for
failures

## GET /user/< username>
Sample Input:  GET /user/jay
Sample Output:
{
  "user\_name": "jay",
  "created\_at": "2020-02-29 19:30:00"
}

## /subscription
This is the primary API being tested in this challenge.
This will need to provide mechanisms to:
Register a new subscription for an existing user, with a specified plan and
start date

## POST /subscription/
Inputs:
{
  "user\_name": < username >,
  "plan\_id": < plan_id >,
  "start\_date": < date in YYYY-MM-DD format >
}

## Sample Input
{ "user_name": "jay", "plan_id": "PRO_1M", "start_date": "2020-03-03" }
Expected Output:
{ "status": <["SUCCESS"|"FAILIURE"]>, "amount": <+/- amount
credited/debited> }