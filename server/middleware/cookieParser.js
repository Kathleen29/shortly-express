const parseCookies = (req, res, next) => {
  var cookieObj = {},
  rc = req.headers.cookie;

  rc && rc.split(';').forEach(function( cookie ) {
    // console.log("cookie!!!!!!!",cookie);
    var parts = cookie.split('=');
    // console.log("!!!!!!!!!!!!!!parts:", parts);
    // console.log("DECODE THING: ",decodeURI(parts.join('=')))
    cookieObj[parts.shift().trim()] = decodeURI(parts.join('='));
    // console.log("Obj: ",cookieObj)

  });
  req.cookies = cookieObj;
  next();

};
// {shortlyid: 18ea4fb6ab3178092ce936c591ddbb90c99c9f66}

module.exports = parseCookies;
/*
var http = require('http');

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

*/