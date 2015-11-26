module.exports = (body, db, pass) => fn => (req, res) => {
  body(req, res, (err, params) => {
    if (err) console.error(err)
    fn(req, res, db, pass, params)
  })
}
