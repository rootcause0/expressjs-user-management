const express = require('express');
const db = require('../scripts/mysql.js')
const bcrypt = require('bcrypt')
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST users create */
router.post('/register', function (req, res, next) {
  const userName = req.body.userName
  const password = req.body.password

  const hashedPassword = bcrypt.hashSync(req.body.password, process.env.BCRYPT_SALT)

  let insertSql = "INSERT INTO ?? (name,password) VALUES(?,?)"
  const inserts = ['users', userName, hashedPassword]
  insertSql = db.mysql.format(insertSql, inserts)
  db.connection.query(insertSql, function (error, results, fields) {
    if (error)
      throw error
  })

  res.send('The user has been successfully registered!')

})

module.exports = router;
