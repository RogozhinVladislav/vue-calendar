const moment = require('moment');
const execSync = require('child_process').execSync;

const dateTime = moment().format('MM/DD/YYYY HH:mm:ss');

execSync(`vue-cli-service build && git add . && git commit -m \"Release at ${dateTime}\" && git push heroku master`, { stdio: [0, 1, 2]} );