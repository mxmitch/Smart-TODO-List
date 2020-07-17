// load .env data into process.env
// require('dotenv').config();

const request = require('request-promise');


const fetchCategory = (text) => {
  const username = 'Frederick';
  const classifierName = 'LHL_midterm_classifier';

  const options = {
    'method': 'POST',
    'uri': `https://api.uclassify.com/v1/${username}/${classifierName}/classify`,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Token ${process.env.DB_UCLASSIFY_READ_KEY}`,
    },
    'body': {
      'texts': [text],
    },
    'json': true,
  };

  return request(options)
    .then((res) => {
      let result = {};
      result.classification = {};
      result['textCoverage'] = res[0]['textCoverage'];
      for (const category of res[0]['classification']) {
        result.classification[category.className] = category.p;
      }

      return result;
    });
};

module.exports = {
  fetchCategory
};
