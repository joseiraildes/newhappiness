const { marked } = require("marked");

function formatBio(bio){
  const parsedBio = marked(bio);

  return parsedBio;
}

module.exports = formatBio