class HomeRoutes {
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #route;
    #app;

    constructor(app) {
        this.#app = app;
        this.#route = "/rooms";
        this.#handleIncoming();
    }

    #handleIncoming() {
        // CREATE ROOM
        this.#app.post(`${this.#route}`, async (req, res) => {
            try {
                const roomKey = req.body.room_key;
                const doorNumber = req.body.door_number;
                const roomMemory = req.body.room_memory;
                const autoDeleteAfter = req.body.auto_delete_after;

                let data = "create: " + roomKey;

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });

        // SEND PEEK ROOM DATA BACK
        this.#app.get(`${this.#route}/:room_key/:door_number`, async (req, res) => {
            try {
                const roomKey = req.params.room_key;
                const doorNumber = req.params.door_number;

                let data = "peek: " + roomKey;

                res.status(this.#errorCodes.HTTP_OK_CODE).json(data);
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });
    }
}

module.exports = HomeRoutes
