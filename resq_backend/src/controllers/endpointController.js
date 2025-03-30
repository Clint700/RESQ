const { Endpoint } = require("../models/EndpointModel");

exports.getAllEndpoints = async (req, res) => {
    try {
      const endpoints = await Endpoint.findAll();
      console.log('endpointsCon', endpoints);
      res.status(200).json(endpoints);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };