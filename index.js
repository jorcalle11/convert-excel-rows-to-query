/* eslint-disable no-console */
'use strict';

require('dotenv').config();
const excel = require('./lib/excel');
const db = require('./lib/db');
const file = require('./lib/file');

const pathToExcelFile = process.env.EXCEL_PATH;
const tableName = process.env.TABLE_NAME;

const queries = excel
  .extractData(pathToExcelFile)
  .map(row => db.generateQuery(row, tableName));

const saveAllQueriesInFile = () => {
  return Promise.all(queries.map(file.saveQueryInFile)).then(r => r.length);
};

file
  .deleteFileIfExist()
  .then(saveAllQueriesInFile)
  .then(rows => console.log(`${rows} queries were saved`))
  .catch(e => {
    console.log(e.message);
    console.log(e.stack);
  });
