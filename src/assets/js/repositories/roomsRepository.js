import {NetworkManager} from "../framework/utils/networkManager.js";

export class RoomsRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/rooms"
        this.#networkManager = new NetworkManager();
    }

    async getAll() {

    }

    async get() {

    }


    async post() {

    }
}
