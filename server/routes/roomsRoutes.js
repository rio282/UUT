const fs = require("fs");
const path = require("path");

class RoomsRoutes {
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #route;
    #app;

    #databaseFolder = path.join(__dirname, "..", "..", "db");

    constructor(app) {
        this.#app = app;
        this.#route = "/rooms";
        this.#handleIncoming();
    }

    #handleIncoming() {
        // custom error type
        function RoomAlreadyExistsError(message = "Room already exists.") {
            this.name = "RoomAlreadyExistsError";
            this.message = message;

            let error = new Error(this.message);
            error.name = this.name;
            this.stack = error.stack;
        }

        function RoomNotFoundError(message = "Can't find room.") {
            this.name = "RoomNotFoundError";
            this.message = message;

            let error = new Error(this.message);
            error.name = this.name;
            this.stack = error.stack;
        }

        RoomAlreadyExistsError.prototype = Object.create(Error.prototype);
        RoomNotFoundError.prototype = Object.create(Error.prototype);

        // try to create room
        this.#app.post(`${this.#route}`, async (req, res) => {
            try {
                const roomId = req.body.room_id;
                const roomKey = req.body.room_key;
                const roomMemory = req.body.room_memory;
                const autoDeleteAfter = req.body.auto_delete_after;

                // TODO: perform check if we need to delete the room

                // check if room already exists
                const roomFolder = path.join(this.#databaseFolder, roomId);
                if (fs.existsSync(`${roomFolder}`))
                    throw new RoomAlreadyExistsError();

                // if room doesn't exist in db
                fs.mkdirSync(`${roomFolder}`);

                // create config file
                // TODO: add 'created_on' tag
                const configFileContent = `[CONFIG ROOM_${roomId}]\nroom_memory: ${roomMemory}\nauto_delete_after: ${autoDeleteAfter}\n`;
                fs.writeFileSync(path.join(roomFolder, "config.cfg"), configFileContent);

                res.status(this.#errorCodes.HTTP_OK_CODE).json({message: `Room ${roomId} has been made available.`});
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });

        // get all info on room (including doors)
        this.#app.get(`${this.#route}/:room_key`, async (req, res) => {
            try {
                const roomKey = req.params.room_key;

                // check if rooms exists
                const roomFolder = path.join(this.#databaseFolder, roomKey);
                if (!fs.existsSync(`${roomFolder}`))
                    throw new RoomNotFoundError();

                // get doors
                let doors = [];

                res.status(this.#errorCodes.HTTP_OK_CODE).json({message: `Found room '${roomKey}'!`, doors: doors});
            } catch (e) {
                res.status(this.#errorCodes.BAD_REQUEST_CODE).json({reason: e.toString()})
            }
        });
    }
}

module.exports = RoomsRoutes
