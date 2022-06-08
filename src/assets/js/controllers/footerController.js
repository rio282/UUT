import {App} from "../app.js";
import {Controller} from "./controller.js";

export class FooterController extends Controller {
    #footerView

    constructor() {
        super();
        this.#setupView();
    }

    /**
     * View setup
     *
     * @returns {Promise<void>}
     * @private
     */
    async #setupView() {
        this.#footerView = await super.loadHtmlIntoFooter("html_views/footer.html")

        const anchors = this.#footerView.querySelectorAll("a.foot-link");
        anchors.forEach(anchor => anchor.addEventListener("click", (event) => this.#handleClickNavigationItem(event)));
    }

    /**
     * Reads data attribute on each .nav-link and then when clicked navigates to specific controller
     *
     * @param event - clicked anchor event
     * @returns {boolean} - to prevent reloading
     * @private
     */
    #handleClickNavigationItem(event) {
        const clickedAnchor = event.target;
        const controller = clickedAnchor.dataset.controller;

        if (typeof controller === "undefined") {
            App.print("Missing tag: data-controller", "!");
            return false;
        }
        App.loadController(controller);

        // return false to prevent reloading the page
        return false;
    }
}
