const cors = require("cors");

const corsOptions = {
  origin: ['https://kangservices.netlify.app', 'http://localhost:5173'], // Allow both frontend and local dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // HTTP methods allowed
  credentials: true // Include cookies, auth headers
};

module.exports = cors(corsOptions);
