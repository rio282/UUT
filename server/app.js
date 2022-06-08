const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const errorCodes = require("./framework/utils/httpErrorCodes");

// front end as static directory
app.use(express.static(path.join(__dirname, '../src')));

// helper libs for parsing request bodies from: json to js objects
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routesPath = __dirname + "/routes/";
require("fs").readdirSync(routesPath).forEach( (file) => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        const name = file.replace(".js", "");

        //require the <..>routes.js file
        exports[name] = require(routesPath + file);

        // check if it is a class(function), if it is instantiate it
        if (typeof exports[name] === "function") {
            new exports[name](app);
            console.log(`Loaded and instantiated routes in ${name}.js`)
        } else {
            console.error(`Routes file ${name} found but not able to instantiate. Make sure it is a class, 
            has a constructor and is being exported by module.exports = ..`)
        }
    }
});

// !! keep at bottom of file
app.get("*", (req, res) => {
    res.status(errorCodes.ROUTE_NOT_FOUND_CODE).json({reason: `No endpoint found for ${routesPath}`});
});

module.exports = app;
