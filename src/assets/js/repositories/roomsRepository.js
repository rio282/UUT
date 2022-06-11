import {NetworkManager} from "../framework/utils/networkManager.js";

export class RoomsRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/rooms"
        this.#networkManager = new NetworkManager();
    }

    async create(roomKey, doorNumber, roomMemory, autoDeleteAfter) {
        return await this.#networkManager.doRequest(`${this.#route}`, "POST", {
            room_key: roomKey,
            door_number: doorNumber,
            room_memory: roomMemory,
            auto_delete_after: autoDeleteAfter
        });
    }

    async peek(roomKey, doorNumber) {
        return await this.#networkManager.doRequest(`${this.#route}/${roomKey}/${doorNumber}`, "GET");
    }
}
