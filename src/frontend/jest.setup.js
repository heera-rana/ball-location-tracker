const fetch = require('node-fetch');

global.fetch = fetch;
global.URL.createObjectURL = function() {};
global.self = global;