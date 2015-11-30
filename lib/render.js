module.exports = (fs, tr, template) => (greq, res) => {
  res.setHeader('content-type', 'text-html')

  const ws = tr.createWriteStream('#app')
  fs.createReadStream(`./templates/${template}.html`).pipe(ws)
  fs.createReadStream('./static/index.html').pipe(tr).pipe(greq).pipe(res)
}
