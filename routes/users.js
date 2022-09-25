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

  const hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT)

  let insertSql = "INSERT INTO ?? (name,password) VALUES(?,?)"
  const inserts = ['users', userName, hashedPassword]
  insertSql = db.mysql.format(insertSql, inserts)
  db.connection.query(insertSql, function (error, results, fields) {
    if (error)
      throw error
  })

  res.send('The user has been successfully registered!')

})

/* POST users login (create session) */
router.post('/login', function (req, res, next) {
  if (!(req.session.username)) {
    const userName = req.body.userName
    const password = req.body.password

    const hashedPassword = bcrypt.hashSync(password, process.env.BCRYPT_SALT)

    let selectSql = "SELECT * FROM ?? WHERE name=? AND password=?"
    const selects = ['users', userName, hashedPassword]

    selectSql = db.mysql.format(selectSql, selects)

    db.connection.query(selectSql, function (error, results, fields) {
      if (error)
        throw error
      if (results.length > 0) {
        req.session.username = results[0].name
        res.send('You\'re successfully signed in !')
      }
      else
        res.send('Invalid login credentials!')
    })
  } else {
    res.send('You\'re already signed in!')
  }

})

/* POST users logout (destroy session) */
router.post('/logout', function (req, res, next) {
  if (!(req.session.username))
    res.send('You\'re not signed in yet!')
  else {
    req.session.destroy()
    res.send('You\'ve successfully logout!')
  }
})


module.exports = router;
