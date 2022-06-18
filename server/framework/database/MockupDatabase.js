const fs = require("fs");
const path = require("path");
const {RoomAlreadyExistsError, RoomNotFoundError} = require("../utils/customErrors");

class DatabaseHelper {

    static #databaseFolder = path.join(__dirname, "..", "..", "..", "db");

    constructor() {
    }


    // TODO: perform check if we need to delete the room


    static createRoom(roomId, roomKey, roomMemory, autoDeleteAfter) {
        // check if room already exists
        const roomFolder = path.join(this.#databaseFolder, roomId);
        if (fs.existsSync(`${roomFolder}`))
            throw new RoomAlreadyExistsError();

        // if room doesn't exist in db
        fs.mkdirSync(`${roomFolder}`);

        // create config file
        const now = Date.now(); // TODO: format
        const configFileContent = `[CONFIG ROOM_${roomId}]\nroom_id: ${roomId}\nroom_key: ${roomKey}\ncreated_on: ${now}\nroom_memory: ${roomMemory}\nauto_delete_after: ${autoDeleteAfter}\n`;
        fs.writeFileSync(path.join(roomFolder, "config.cfg"), configFileContent);
    }

    static getRoom(roomId) {
        let roomKey = "ERROR";
        let roomMemory = "ERROR";

        // check if rooms exists
        const roomFolder = path.join(this.#databaseFolder, roomId);
        if (!fs.existsSync(`${roomFolder}`))
            throw new RoomNotFoundError();

        // get doors
        let doors = [];

        return {
            room_id: roomId,
            room_key: roomKey,
            room_memory: roomMemory,
            doors: doors
        }
    }
}

module.exports = DatabaseHelper
