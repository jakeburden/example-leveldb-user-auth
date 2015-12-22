const has = require('has')

module.exports = (gzip, fs, hyperstream, cookie, sessions, db) => template => (req, res) => {
  res.setHeader('content-type', 'text-html')

  const isLogout = template === 'logout'
  const cookies = cookie.parse(req.headers.cookie || '')
  const isSession = cookies.session &&
                    has(sessions, cookies.session) &&
                    !isLogout

  if (isLogout) {
    sessions[cookies.session] = undefined
    template = 'index'
  }

  const hs = hyperstream({
    '#app': fs.createReadStream(`./templates/${template}.html`),
    '#user': {
      _text: `Hello, ${isSession ? sessions[cookies.session] : 'Guest'}`
    }
  })

  fs.createReadStream('./static/index.html')
    .pipe(hs)
    .pipe(gzip(req))
    .pipe(res)
}
