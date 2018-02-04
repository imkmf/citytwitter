const { readFile, writeFile } = require('fs')
const template = require('./template')

const compileHtml = data => template(data)

const validateJson = data => {
  console.log(`Validated JSON for ${data.city}.`)
  return data
}

const pipeline = data => {
  console.log(`Trying to compile HTML for ${data.city}.`)
  const compiled = compileHtml(data)
  console.log(`Successfully compiled HTML for ${data.city}.`)
  writeToFile('./index.html', compiled)
  return compiled
}

const writeToFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    writeFile(filename, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const parseFile = (filename, callback) => {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        const city = JSON.parse(data)
        const validated = validateJson(city)
        resolve(callback(validated))
      }
    })
  })
}

module.exports = {
  pipeline,
  parseFile
}
