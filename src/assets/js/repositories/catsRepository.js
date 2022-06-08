import {NetworkManager} from "../framework/utils/networkManager.js";

export class CatsRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/cats"
        this.#networkManager = new NetworkManager();
    }

    async getAll() {

    }

    async get() {

    }


    async post() {

    }
}
