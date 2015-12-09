const fs = require('fs')

const postcss = require('postcss')
const atImport = require('postcss-import')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const uncss = require('uncss')

const css = fs.readFileSync('src/styles/index.css', 'utf8')

postcss([atImport, autoprefixer])
  .process(css, {
    from: 'src/styles/index.css',
    to: 'public/styles/bundle.css'
  })
  .then(result => {
    fs.writeFileSync('public/styles/bundle.css', result.css)
    uncss(['http://0.0.0.0:9090'], function (err, output) {
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
