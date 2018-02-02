import { render } from 'ejs'
import { readFile } from 'fs'

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

export interface City {
  city: string;
  state: string;
  sections: [Section];
}

// const logJson = (json: City) => {
//   console.log(json)
// }

// Should add a function to replace renderHtml:
// pipeline where we pre-log, validate, post-log, compile, and write
const compileHtml = (city: City): string => render(template, city)

const parseFile = (filename: string, callback: ((json: City) => string)): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        const obj: City = JSON.parse(data)
        const validated = obj
        resolve(callback(validated))
      }
    })
  })
}

parseFile('examples/losangeles-short.json', compileHtml)
  .then((html: string) => console.log(html))
  .catch(err => { throw err })
