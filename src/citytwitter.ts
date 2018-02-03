import { readFile, writeFile } from 'fs'

import template from './template'

export interface Account {
  name?: string;
  handle: string;
  notes: string;
}

export interface Section {
  name?: string;
  permalink: string;
  accounts: [Account];
  subsections: [Section];
}

export interface Meta {
  contact_url: string;
}

export interface City {
  city: string;
  state: string;
  sections: [Section];
  meta?: Meta;
}

const compileHtml = (data: City): string => template(data)

const validateJson = (data: City): City => {
  console.log(`Validated JSON for ${data.city}.`)
  return data
}

const pipeline = (data: City): string => {
  console.log(`Trying to compile HTML for ${data.city}.`)
  const compiled = compileHtml(data)
  console.log(`Successfully compiled HTML for ${data.city}.`)
  writeToFile('dist/index.html', compiled)
  return compiled
}

const writeToFile = (filename: string, data: string): Promise<void> => {
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

const parseFile = (filename: string, callback: ((json: City) => string)): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        const city: City = JSON.parse(data)
        const validated = validateJson(city)
        resolve(callback(validated))
      }
    })
  })
}

parseFile('examples/losangeles-short.json', pipeline)
  .then((_: string) => console.log('Successfully ran citytwitter. Woo!'))
  .catch(err => { throw err })
