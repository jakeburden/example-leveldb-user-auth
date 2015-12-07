module.exports = (gzip, fs, hyperstream) => template => (req, res) => {
  res.setHeader('content-type', 'text-html')

  const hs = hyperstream({
    '#app': fs.createReadStream(`./templates/${template}.html`)
  })

  fs.createReadStream('./static/index.html')
    .pipe(hs)
    .pipe(gzip(req))
    .pipe(res)
}
