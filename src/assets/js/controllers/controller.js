import {App} from "../app.js";

export class Controller {
    #contentViewHtml
    #navigationViewHtml
    #footerViewHtml

    constructor() {
        this.#navigationViewHtml = document.querySelector(".navigation");
        this.#contentViewHtml = document.querySelector(".content");
        this.#footerViewHtml = document.querySelector(".footer");
    }

    /**
     * Function to fetch an html view and load it into an element
     *
     * @param htmlFile - path to html file
     * @param customElement - DOM element to load HTML file into, optional param
     * @returns {Promise<void>}
     * @private
     */
    async #fetchHtmlView(htmlFile, customElement = null) {
        let loadInto = this.#contentViewHtml; // default
        if (customElement instanceof Element) {
            loadInto = customElement;
        }

        try {
            const response = await fetch(htmlFile);
            if (response.ok) {
                const htmlData = await response.text();

                //clear html and load htmlData from file
                loadInto.innerHTML = "";
                loadInto.innerHTML = htmlData;
            } else {
                App.print(response.statusText, "!");
                loadInto.innerHTML = "<p>Failed to load HTML file</p>";
            }
        } catch (e) {
            console.error(e);
            loadInto.innerHTML = "<p>Failed to load HTML file</p>";
        }

        return loadInto;
    }

    /**
     * Load an html specifically into .navigation
     *
     * @param htmlFile - path to html file
     * @returns {Promise<*>}
     */
    async loadHtmlIntoNavigation(htmlFile) {
        return await this.loadHtmlIntoCustomElement(htmlFile, this.#navigationViewHtml);
    }

    /**
     * Load an html specifically into .footer
     *
     * @param htmlFile - path to html file
     * @returns {Promise<*>}
     */
    async loadHtmlIntoFooter(htmlFile) {
        return await this.loadHtmlIntoCustomElement(htmlFile, this.#footerViewHtml);
    }

    /**
     * Load an html file specifically into .content of index.html
     *
     * @param htmlFile - path to html file
     * @returns {Promise<*>}
     */
    async loadHtmlIntoContent(htmlFile) {
        return await this.loadHtmlIntoCustomElement(htmlFile, this.#contentViewHtml);
    }

    /**
     * Load an html file into custom given DOM element
     *
     * @param htmlFile - path to html file
     * @param element - custom elem we want to load the html into
     * @returns {Promise<*>}
     */
    async loadHtmlIntoCustomElement(htmlFile, element) {
        return await this.#fetchHtmlView(htmlFile, element);
    }

    /**
     * Sleeps for a certain amount of time
     *
     * @param ms - amount of milliseconds
     * @returns {Promise<*>}
     */
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
