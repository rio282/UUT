class HomeRoutes {
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #route;
    #app;

    constructor(app) {
        this.#app = app;
        this.#handleIncoming();
        // this.#route = `/${name.toLowerCase().replace("routes", "")}`;
        // console.log(this.#route)

        this.#route = "/home";
    }

    #handleIncoming() {
        this.#app.get(`${this.#route}/:param1`, async (req, res) => {
            try {
                const param1 = req.params.param1;
                let data = "works!!" + param1;

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });
    }
}

module.exports = HomeRoutes
