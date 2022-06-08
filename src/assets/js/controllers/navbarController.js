import {App} from "../app.js";
import {Controller} from "./controller.js";
import {Loader} from "../framework/utils/Loader.js";

export class NavbarController extends Controller {
    #navbarView

    constructor() {
        super();
        this.#setupView();
    }

    /**
     * Loads contents of desired HTML file into the index.html .navigation div
     *
     * @returns {Promise<void>}
     * @private
     */
    async #setupView() {
        //await for when HTML is
        this.#navbarView = await super.loadHtmlIntoNavigation("html_views/navbar.html");

        const anchors = this.#navbarView.querySelectorAll("a.nav-link");
        anchors.forEach(anchor => anchor.addEventListener("click", (event) => this.#handleClickNavigationItem(event)));

        // highlight correct anchor when page is loaded
        anchors.forEach(anchor => {
            const url = document.location.href.split("/")[3].replace("#", "");
            if (typeof anchor.dataset.controller !== "undefined" && anchor.dataset.controller === url)
                anchor.classList.add("active");
        });
    }

    /**
     * Reads data attribute on each .nav-link and then when clicked navigates to specific controller
     *
     * @param event - clicked anchor event
     * @returns {boolean} - to prevent reloading
     * @private
     */
    #handleClickNavigationItem(event) {
        // remove loading screen if still there
        Loader.show(false).then(() => {
            const clickedAnchor = event.target;
            const controller = clickedAnchor.dataset.controller;

            // highlight active anchor
            this.#navbarView.querySelectorAll("a.nav-link").forEach((anchor) => anchor.classList.remove("active"));
            clickedAnchor.classList.add("active");

            // load controller
            if (typeof controller === "undefined") {
                console.error("No data-controller attribute defined in anchor HTML tag, don't know which controller to load!")
                return false;
            }
            App.loadController(controller);

            // return false to prevent reloading the page
            return false;
        });
    }
}
