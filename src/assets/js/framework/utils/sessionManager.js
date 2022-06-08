import {App} from "../../app.js";

export class SessionManager {
    #session

    constructor() {
        try {
            this.#session = JSON.parse(localStorage.getItem("session"));
        } catch (e) {
            App.print("Failed to parse JSON object from local storage.");
        }

        // create empty session obj if null
        if(!this.#session) {
            this.#session = {};
            this.#saveSession();
        }
    }

     get(key) {
        return this.#session[key];
    }

     set(key, value) {
        this.#session[key] = value;
        this.#saveSession();
    }

     remove(key) {
        delete(this.#session[key]);
        this.#saveSession();
    }

    clear() {
        this.#session = {};
        this.#saveSession();
    }

     #saveSession() {
        localStorage.setItem("session", JSON.stringify(this.#session));
    }
}
