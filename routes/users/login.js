const crypto = require('crypto')

module.exports = sessions => (req, res, db, pass, params) => {
  db.get(`users\x00${params.username}`, (err, user) => {
    if (err) console.error(err)

    if (user) {
      pass.hash(params.password, user.salt, (err, hash) => {
        if (err) console.error(err)

        if (user.hash === hash) {
          const sid = crypto.randomBytes(64).toString('hex')
          sessions[sid] = user.name
          res.setHeader('set-cookie', 'session=' + sid)
          res.end(sid)
        } else res.end('Incorrect username or password\n')
      })
    } else res.end('Incorrect username or password\n')
  })
}
