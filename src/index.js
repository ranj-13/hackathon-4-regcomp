const fs = require('fs');
const csv = require('csv-parser');
const { anonymizeData, shuffleData } = require('./anonymizer');

const inputFilePath = 'data/input.csv';
const outputFilePath = 'data/output.csv';

const columnsToAnonymize = {
  name: 'mask',
  email: 'mask',
  phone: 'mask'
};

const anonymizedData = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    anonymizedData.push(anonymizeData(row, columnsToAnonymize));
  })
  .on('end', () => {
    const shuffledData = shuffleData(anonymizedData);
    fs.writeFileSync(outputFilePath, JSON.stringify(shuffledData, null, 2));
    console.log('Data anonymized and saved to', outputFilePath);
  });

