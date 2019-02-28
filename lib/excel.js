'use strict';

const xlsx = require('xlsx');

function extractData(excelPath) {
  const workBook = xlsx.readFile(excelPath);
  const sheetName = workBook.SheetNames[0];
  const workSheet = workBook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(workSheet);
}

module.exports = {
  extractData
};
