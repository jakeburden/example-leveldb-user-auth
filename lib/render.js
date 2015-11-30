module.exports = (fs, hyperstream, template) => (greq, res) => {
  res.setHeader('content-type', 'text-html')

  const hs = hyperstream({
    '#app': fs.createReadStream(`./templates/${template}.html`)
  })

  fs.createReadStream('./static/index.html').pipe(hs).pipe(greq).pipe(res)
}
