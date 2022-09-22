const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/bcrypt', function (req, res, next) {
  bcrypt.hash(req.body.password,10,function(err,hash) {
    if(err)
    console.log(err)
    else
    console.log(hash)
  })
})

module.exports = router;
