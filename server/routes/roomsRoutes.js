const fs = require("fs");
const path = require("path");

class RoomsRoutes {
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #databaseHelper = require("../framework/database/MockupDatabase");
    #route;
    #app;

    constructor(app) {
        this.#app = app;
        this.#route = "/rooms";
        this.#handleIncoming();
    }

    #handleIncoming() {
        // try to create room
        this.#app.post(`${this.#route}`, async (req, res) => {
            try {
                const roomId = req.body.room_id;
                const roomKey = req.body.room_key;
                const roomMemory = req.body.room_memory;
                const autoDeleteAfter = req.body.auto_delete_after;

                this.#databaseHelper.createRoom(roomId, roomKey, roomMemory, autoDeleteAfter);

                res.status(this.#errorCodes.HTTP_OK_CODE).json({message: `Room ${roomId} has been made available.`});
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });

        // get all info on room (including doors)
        this.#app.get(`${this.#route}/:room_key`, async (req, res) => {
            try {
                const roomKey = req.params.room_key;

                const room = this.#databaseHelper.getRoom();

                res.status(this.#errorCodes.HTTP_OK_CODE).json({
                    message: `Found room '${room.room_id}'!`,
                    doors: room.doors
                });
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });
    }
}

module.exports = RoomsRoutes
