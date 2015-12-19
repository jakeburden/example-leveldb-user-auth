const crypto = require('crypto')
const has = require('has')

module.exports = (sessions, cookie) => (req, res, db, pass, params) => {
  const cookies = cookie.parse(req.headers.cookie || '')
  if (cookies.session && has(sessions, cookies.session)) {
    const username = sessions[cookies.session]
    console.log('sessions', username)
    db.get(`users\x00${username}`, (err, user) => {
      if (err) return console.error('no cookies?', err)
      if (user) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(user))
      } else {
        res.end('Invalid cookie please try again.')
      }
    })
  } else if (params) {
    db.get(`users\x00${params.username}`, (err, user) => {
      if (err) return console.error('no user?', err, params)

      if (user) {
        pass.hash(params.password, user.salt, (err, hash) => {
          if (err) console.error(err)

          if (user.hash === hash) {
            const sid = crypto.randomBytes(64).toString('hex')
            sessions[sid] = user.username
            res.setHeader('set-cookie', 'session=' + sid)
            res.end(sid)
          } else res.end('Incorrect username or password\n')
        })
      } else res.end('Incorrect username or password\n')
    })
  } else return null
}
