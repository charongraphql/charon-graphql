module.exports = function parseQueryForFields(query) {
  console.log(query);
  // query = query.replace(/\s+/g, ' ');
  const stripped = query.replace(/\s+/g, ' ').match(/(?<= {.*){.*}(?=.*})/)[0];
  console.log('stripped:', stripped);
};
