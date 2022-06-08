import {NetworkManager} from "../framework/utils/networkManager.js";

export class ApiRepository {
    #route
    #networkManager

    constructor() {
        this.#route = "/api"
        this.#networkManager = new NetworkManager();
    }

    async getAll() {

    }

    async get() {

    }


    async post() {

    }
}
