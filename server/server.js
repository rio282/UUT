const SERVER_PORT = process.env.PORT || 3000;
const SERVER_CONFIG_FILE = getConfigFilePath();
const SERVER_CONFIG = require(SERVER_CONFIG_FILE);

global.serverConfigFile = SERVER_CONFIG_FILE;
global.serverConfig = SERVER_CONFIG;
global.appPath = process.env.APP || "./";
global.wwwrootPath = process.env.WWWROOT || "../src/"; // front end

const app = require("./app");
app.listen(SERVER_PORT, () => console.log(`\n[*] Server listening on port ${SERVER_PORT}!`));

function getConfigFilePath() {
    return "./config/config.json";
}
