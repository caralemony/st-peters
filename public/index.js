var results = document.getElementById('results');

const printResponse = (emotion) => {
  results.innerText = emotion;
};

module.exports = printResponse;
