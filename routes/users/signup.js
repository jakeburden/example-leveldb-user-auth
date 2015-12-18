module.exports = (req, res, db, pass, params) => {
  const validUserName = params.username.length >= 1
  const validPassword = params.password.length >= 6

  pass.hash(params.password, (err, salt, hash) => {
    if (err) console.error(err)

    params.password = undefined
    const user = Object.assign({}, params, {'salt': salt}, {'hash': hash})
    console.log('username', user.username)
    db.get(`users\x00${user.username}`, (err, _) => {
      if (err) {
        if (err.notFound) {
          if (!validUserName) {
            return res.end('Usernames need to have at least 1 character.\n')
          }
          if (!validPassword) {
            return res.end('Passwords need to have at least 6 characters.\n')
          }

          db.put(`users\x00${user.username}`, user, err => {
            if (err) console.error(err)
            db.get(`users\x00${user.username}`, (err, signup) => {
              if (err) console.error(err)
              res.end(`${signup.username} has signed up!\n`)
            })
          })
        } else console.error(err)
      } else res.end(`${user.username} already exist, please try again.\n`)
    })
  })
}
