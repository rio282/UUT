import {App} from "../app.js";
import {Controller} from "./controller.js";
import {Loader} from "../framework/utils/Loader.js";

export class NavbarController extends Controller {
    #navbarView;
    #anchors;

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

        this.#anchors = this.#navbarView.querySelectorAll("a.nav-link, a.dropdown-item");
        this.#anchors.forEach(anchor => anchor.addEventListener("click", (event) => this.#handleClickNavigationItem(event)));

        // highlight correct anchor when page is loaded
        this.#anchors.forEach(anchor => {
            anchor.classList.remove("active");
            if (typeof anchor.dataset.controller !== "undefined" && anchor.dataset.controller === App.getCurrentController())
                anchor.classList.add("active");
        });

        const themeSwitch = this.#navbarView.querySelector("#dark-theme-switch");
        themeSwitch.addEventListener("change", () => {
            document.body.style.color = (themeSwitch.checked) ? "var(--fg-color-dark)" : "var(--fg-color-light)";
            document.body.style.backgroundColor = document.body.style.color.replace("fg", "bg");
            App.sessionManager.set("dark_theme", themeSwitch.checked);
        });
        themeSwitch.checked = App.sessionManager.get("dark_theme");
        themeSwitch.dispatchEvent(new Event("change"));
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
            if (typeof controller === "undefined") // probably a dropdown
                return;

            // highlight active anchor
            this.#anchors.forEach((anchor) => anchor.classList.remove("active"));
            clickedAnchor.classList.add("active");

            // load controller
            App.loadController(controller);

            return false; // return false to prevent reloading page
        });
    }
}
