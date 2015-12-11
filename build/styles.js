const fs = require('fs')

const postcss = require('postcss')
const atImport = require('postcss-import')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const uncss = require('uncss')

const css = fs.readFileSync('src/styles/index.css', 'utf8')

const index = fs.readFileSync('static/index.html', 'utf8')
const signup = fs.readFileSync('templates/signup.html', 'utf8')
const login = fs.readFileSync('templates/login.html', 'utf8')

const opts = {
  htmlroot: 'public',
  stylesheets: ['styles/bundle.css']
}

postcss([atImport, autoprefixer])
  .process(css, {
    from: 'src/styles/index.css',
    to: 'public/styles/bundle.css'
  })
  .then(result => {
    fs.writeFileSync('public/styles/bundle.css', result.css)
    uncss([index, login, signup], opts, function (err, output) {
      if (err) console.error(err)
      fs.writeFileSync('public/styles/bundle.css', output)

      postcss([cssnano])
        .process(output, {
          from: 'public/styles/bundle.css',
          to: 'public/styles/bundles.css'
        })
        .then(result => {
          fs.writeFileSync('public/styles/bundle.css', result)
        })
    })
  })
