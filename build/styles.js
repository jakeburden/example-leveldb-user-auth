const fs = require('fs')
const postcss = require('postcss')
const atImport = require('postcss-import')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

const css = fs.readFileSync('src/styles/index.css', 'utf8')

postcss([atImport, autoprefixer, cssnano])
  .process(css, {
    from: 'src/styles/index.css',
    to: 'public/styles/bundle.css'
  })
  .then(result => {
    fs.writeFileSync('public/styles/bundle.css', result.css)
    fs.writeFileSync('public/styles/bundle.css.map', result.map)
  })
