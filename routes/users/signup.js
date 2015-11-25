const pass = require('pwd')
const extend = require('extend')
const body = require('body/any')

module.exports = (req, res) => {
  const level = require('level')
  const db = level('db', {
    keyEncoding: require('bytewise'),
    valueEncoding: 'json'
  })

  body(req, res, (err, params) => {
    if (err) console.err(err)

    const info = {
      name: params.username,
      meta: {
        firstname: params.firstname,
        lastname: params.lastname,
        email: params.email
      }
    }

    pass.hash(params.password, (err, salt, hash) => {
      if (err) console.error(err)

      const user = extend({}, info, {salt: salt}, {hash: hash})
      db.put(`users\x00${user.name}`, info, err => {
        if (err) console.error(err)

        db.close(err => {
          if (err) console.error(err)
          res.end(`${user.name} has signed up!\n`)
        })
      })
    })
  })
}
