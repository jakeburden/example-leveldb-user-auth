const fs = require('fs')

const postcss = require('postcss')
const atImport = require('postcss-import')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const uncss = require('uncss')

const css = fs.readFileSync('src/styles/index.css', 'utf8')

const htmls = ['static/index.html',
               'templates/signup.html',
               'templates/login.html']

postcss([atImport, autoprefixer])
  .process(css)
  .then(result => {
    fs.writeFileSync('public/styles/bundle.css', result.css)
    const opts = {
      stylesheets: ['styles/bundle.css'],
      csspath: '../public'
    }
    uncss(htmls, opts, (err, output) => {
      if (err) console.error(err)
      fs.writeFileSync('public/styles/bundle.css', output)
      postcss([cssnano])
        .process(output)
        .then(result => {
          fs.writeFileSync('public/styles/bundle.css', result.css)
        })
    })
  })
