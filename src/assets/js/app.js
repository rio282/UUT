import {SessionManager} from "./framework/utils/sessionManager.js"
import {NavbarController} from "./controllers/navbarController.js"
import {FooterController} from "./controllers/footerController.js"
import {HomeController} from "./controllers/homeController.js";
import {ApiController} from "./controllers/apiController.js";
import {CatsController} from "./controllers/catsController.js";

export class App {
    static sessionManager = new SessionManager();

    static CONTROLLER_NAVBAR = "navbar";
    static CONTROLLER_FOOTER = "footer";
    static CONTROLLER_HOME = "home";
    static CONTROLLER_API = "api";
    static CONTROLLER_CAT = "cats";

    constructor() {
        App.loadController(App.CONTROLLER_NAVBAR);
        App.loadController(App.CONTROLLER_FOOTER);

        App.loadControllerFromUrl(App.CONTROLLER_HOME);
    }

    static loadController(name, params = {}) {
        App.print(`loadController: ${name}`);

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

            case App.CONTROLLER_CAT:
                new CatsController();
                break;

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
}

window.addEventListener("DOMContentLoaded", () => {
    new App();
});
