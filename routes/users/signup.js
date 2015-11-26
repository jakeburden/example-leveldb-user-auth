module.exports = (req, res, db, pass, params) => {
  pass.hash(params.password, (err, salt, hash) => {
    if (err) console.error(err)

    params.password = undefined
    const user = Object.assign({}, params, {'salt': salt}, {'hash': hash})

    db.get(`users\x00${params.username}`, (err, _) => {
      if (err) {
        if (err.notFound) {
          db.put(`users\x00${params.username}`, user, err => {
            if (err) console.error(err)
            res.end(`${params.username} has signed up!\n`)
          })
        } else console.error(err)
      } else res.end(`${params.username} already exist, please try again.\n`)
    })
  })
}

