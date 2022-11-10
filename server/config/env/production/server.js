// Path: ./config/env/production/server.js`

module.exports = ({ env }) => ({
    url: env('https://bcr-server.herokuapp.com/'),
  });
  
  