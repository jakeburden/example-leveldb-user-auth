module.exports = (req, res, db, pass, params) => {
  pass.hash(params.password, (err, salt, hash) => {
    if (err) console.error(err)

    params.password = undefined
    const user = Object.assign({}, params, {'salt': salt}, {'hash': hash})

    db.put(`users\x00${params.username}`, user, err => {
      if (err) console.error(err)
      res.end(`${params.username} has signed up!\n`)
    })
  })
}
