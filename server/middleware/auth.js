const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var hash = req.cookies.shortlyid;
  Promise.resolve(hash)
    .then(result => {
      if(!result){
        throw result;
      }
      return models.Sessions.get({hash})
    })

    .then(session => {
      if(!session){
        throw session;
      }
      return session;
    })

  // console.log("cookis!!!!!!!!!!!!!!: ",cookies)

    .catch(() => {
      // req.session = {};
      return models.Sessions.create()
        .then(result => {
          // console.log("result:=================",result);
          return models.Sessions.get({id: result.insertId});
        })
        .then(session => {
          res.cookie('shortlyid', session.hash);
          return session;
        })
    })

   /* An incoming request with no cookies should generate a session with a unique hash and store it the sessions database. The middleware function should use this unique hash to set a cookie in the response headers. (Ask yourself: How do I set cookies using Express?). * */

    .then(result => {

    //     console.log("RESULT: ", result)
    req.session = result;
    //     req.session.userId = result.id;
    //     var id = result.id;
    //     models.Users.get({id})
    //     .then(result =>{
    //       req.session.user = {username: result.username};

        // console.log("req.hash======= :",req.session.hash)
        // console.log("req.cookies: =======", req.cookies);
        // console.log("res.cookies: =========",res.cookies);
        // res.cookie('shortlyid', req.session.hash);
        // console.log("what is res.cookies?????",res.cookies);

        next();
      })

  // }

}

//hash = res.header.cookie
/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if(!models.Sessions.isLoggedIn(req.session)){
    res.redirect('/login');
  } else {
    next();
  }
}