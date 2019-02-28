'use strict';

const path = require('path');
const fs = require('fs');

const defaultPath = path.join(__dirname, '..', 'result.sql');
const filePath = process.env.PATH_TO_SAVE_RESULT_FILE || defaultPath;

function deleteFileIfExist() {
  if (!fs.existsSync(filePath)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) {
        reject(err);
      }
      resolve('file removed');
    });
  });
}

function saveQueryInFile(query) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, `${query};\n`, err => {
      if (err) {
        return reject(err);
      }

      resolve('query saved!');
    });
  });
}

module.exports = { saveQueryInFile, deleteFileIfExist };
