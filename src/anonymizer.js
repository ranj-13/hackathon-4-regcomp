const faker = require('faker');

function anonymizeData(row, columnsToAnonymize) {
  const anonymizedRow = { ...row };
  for (const column in columnsToAnonymize) {
    if (columnsToAnonymize[column] === 'mask') {
      anonymizedRow[column] = faker.fake("{{name.firstName}} {{name.lastName}}");
    }
  }
  return anonymizedRow;
}

function shuffleData(data) {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}

module.exports = { anonymizeData, shuffleData };
