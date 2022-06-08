import {NetworkManager} from "../framework/utils/networkManager.js";

export class HomeRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/home"
        this.#networkManager = new NetworkManager();
    }

    async getAll() {

    }

    async get(param1) {
        return await this.#networkManager.doRequest(`${this.#route}/${param1}`, "GET");
    }


    async post() {

    }
}
