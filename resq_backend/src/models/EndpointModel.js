const fs = require('fs');
const endpoint = require('../../endpoint.json');

const Endpoint = {};

Endpoint.findAll = async () => {
  return endpoint;
};

module.exports = { Endpoint };