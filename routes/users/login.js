const pass = require('pwd')
// const cookie = require('cookie')
const body = require('body/any')

module.exports = (req, res) => {
  const level = require('level')
  const db = level('db', {
    keyEncoding: require('bytewise'),
    valueEncoding: 'json'
  })

  body(req, res, (err, params) => {
    if (err) console.error(err)

    if (db.isClosed()) {
      db.get(`users\x00${params.username}`, (err, user) => {
        if (err) console.error(err)

        pass.hash(params.password, user.salt, (err, hash) => {
          if (err) console.error(err)

          user.hash === hash ?
           res.end('Auth!') :
           res.end('Incorrect username or password')
        })
      })
    }
  })
}
