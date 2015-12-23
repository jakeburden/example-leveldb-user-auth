const has = require('has')

module.exports = (gzip, fs, hyperstream, cookie, sessions, db) => template => (req, res) => {
  res.setHeader('content-type', 'text-html')

  const isLogout = template === 'logout'
  const cookies = cookie.parse(req.headers.cookie || '')
  const isSession = cookies.session &&
                    has(sessions, cookies.session) &&
                    !isLogout

  if (isLogout) {
    delete sessions[cookies.session]
    template = 'index'
  }

  const username = isSession
                   ? sessions[cookies.session]
                   : 'Guest'

  const hs = hyperstream({
    '#app': fs.createReadStream(`./templates/${template}.html`),
    '#user': {
      _text: `Hello, ${username}`
    }
  })

  fs.createReadStream('./static/index.html')
    .pipe(hs)
    .pipe(gzip(req))
    .pipe(res)
}
