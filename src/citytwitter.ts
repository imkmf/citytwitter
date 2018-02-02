import { readFile } from 'fs'

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

const logJson = (json: City) => {
  console.log(json)
}

const parseFile = (filename: string, callback: ((json: City) => void)) => {
  readFile(filename, 'utf8', function (err, data) {
    if (err) { throw err }
    const obj: City = JSON.parse(data)
    const validated = obj
    callback(validated)
  })
}

parseFile('examples/losangeles-short.json', logJson)
