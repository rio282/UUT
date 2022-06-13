import {NetworkManager} from "../framework/utils/networkManager.js";

export class RoomsRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/rooms"
        this.#networkManager = new NetworkManager();
    }

    async createRoom(roomId, roomKey, roomMemory, autoDeleteAfter) {
        return await this.#networkManager.doRequest(`${this.#route}`, "POST", {
            room_id: roomId,
            room_key: roomKey,
            room_memory: roomMemory,
            auto_delete_after: autoDeleteAfter
        });
    }

    async getRoom(roomId) {
        return await this.#networkManager.doRequest(`${this.#route}/${roomId}`, "GET");
    }
}
