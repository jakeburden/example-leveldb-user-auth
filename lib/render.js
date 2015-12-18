module.exports = (gzip, fs, hyperstream, auth, db) => template => (req, res) => {
  res.setHeader('content-type', 'text-html')
  const user = auth(req, res, db)

  const hs = hyperstream({
    '#app': fs.createReadStream(`./templates/${template}.html`),
    '#user': {
      _text: `Hello, ${user ? user.name : 'Guest'}`
    }
  })

  fs.createReadStream('./static/index.html')
    .pipe(hs)
    .pipe(gzip(req))
    .pipe(res)
}
