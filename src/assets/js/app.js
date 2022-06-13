import {SessionManager} from "./framework/utils/sessionManager.js"
import {NavbarController} from "./controllers/navbarController.js"
import {FooterController} from "./controllers/footerController.js"
import {HomeController} from "./controllers/homeController.js";
import {ApiController} from "./controllers/apiController.js";
import {RoomsController} from "./controllers/roomsController.js";
import {RoomController} from "./controllers/roomController.js";

export class App {
    static sessionManager = new SessionManager();

    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_FOOTER = "footer";
    static CONTROLLER_HOME = "home";
    static CONTROLLER_API = "api";
    static CONTROLLER_ROOMS = "rooms";
    static CONTROLLER_ROOM = "room";
    static CONTROLLER_EMAIL = "email";

    constructor() {
        App.loadController(App.CONTROLLER_NAVBAR);
        App.loadController(App.CONTROLLER_FOOTER);

        App.loadControllerFromUrl(App.CONTROLLER_HOME);
    }

    static loadController(name, params = {}) {
        App.print(`LOAD CONTROLLER: ${name}`);

        // switch to passed controller
        switch (name) {
            case App.CONTROLLER_NAVBAR:
                new NavbarController();
                break;

            case App.CONTROLLER_FOOTER:
                new FooterController();
                break;

            case App.CONTROLLER_HOME:
                new HomeController();
                break;

            case App.CONTROLLER_API:
                new ApiController();
                break;

            case App.CONTROLLER_ROOMS:
                new RoomsController();
                break;

            case App.CONTROLLER_ROOM:
                new RoomController(params);
                break;

            // case App.CONTROLLER_EMAIL:
            //     new EmailController();
            //     break;

            default:
                return false;
        }

        return true;
    }

    static loadControllerFromUrl(fallbackController) {
        const currentController = App.getCurrentController();

        if (currentController) {
            if (!App.loadController(currentController)) {
                App.loadController(fallbackController);
            }
        } else {
            App.loadController(fallbackController);
        }
    }

    static getCurrentController() {
        return location.hash.slice(1);
    }


    static setCurrentController(name) {
        location.hash = name;
    }

    static print(message, severity = "*") {
        if (severity === "!")
            console.error(`[${severity}] ${message}`);
        else console.log(`[${severity}] ${message}`);
    }

    /**
     * LITERAL MAGIC, DO NOT TOUCH!
     *
     * @returns {string} - randomly generated UUID
     */
    static generateUUID() {
        let d = new Date().getTime();
        let d2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new App();
});
