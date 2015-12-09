const crypto = require('crypto')
const has = require('has')

module.exports = (sessions, cookie) => (req, res, db, pass, params) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  if (cookies.session && has(sessions, cookies.session)) {
    db.get(`users\x00${sessions[cookies.sessions]}`, (err, user) => {
      if (err) return console.error(err)
      if (user) {
        res.end(user)
      } else {
        res.end('Invalid cookie please try again.')
      }
    })
  } else {
    db.get(`users\x00${params.username}`, (err, user) => {
      if (err) return console.error(err)

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
}
