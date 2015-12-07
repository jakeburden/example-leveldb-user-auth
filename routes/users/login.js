module.exports = (req, res, db, pass, params) => {
  db.get(`users\x00${params.username}`, (err, user) => {
    if (err) console.error(err)

    if (user) {
      pass.hash(params.password, user.salt, (err, hash) => {
        if (err) console.error(err)

        user.hash === hash
          ? res.end(`Auth! Hello ${user.username}\n`)
          : res.end('Incorrect username or password\n')
      })
    } else res.end('Incorrect username or password\n')
  })
}
