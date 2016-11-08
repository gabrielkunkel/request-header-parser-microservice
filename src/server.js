/**
 * Created by gabrielkunkel on 11/6/16 in JavaScript.
 */

import express from 'express'
import useragent from 'express-useragent'

const port = process.env.PORT || 8888

let app = express();

app.use(useragent.express())

app.get('/', function (req, res) {

  // get the ip address
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  // get the language
  let lang = req.header('accept-language') + '';
  let langArray = lang.split(',');

  res.json({
    ipaddress:  ip + '',
    language: langArray[0],
    software: req.useragent.platform + ': ' + req.useragent.os
  });

});

app.listen(port, function () {
  console.log('Listening on port: ' + port);
});

export default app;