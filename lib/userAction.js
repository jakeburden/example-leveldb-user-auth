module.exports = (body, db, pass) => callback => (req, res) => {
  body(req, res, (err, params) => {
    if (err) console.error(err)
    callback(req, res, db, pass, params)
  })
}
