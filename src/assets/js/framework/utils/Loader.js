export class Loader {
    constructor() {
    }

    /**
     * Loads loader view, puts it into an element and shows it
     *
     * @returns {Promise<void>}
     */
    static async #showLoader() {
        // get html data
        const response = await fetch("/html_views/templates/loader.html");
        if (!response.ok)
            return;

        // create & add loader element to page
        const loader = document.createElement("div");
        document.body.prepend(loader);

        const html = await response.text();
        loader.innerHTML = "";
        loader.innerHTML = html;
    }

    /**
     * Destroys our loader element
     */
    static #destroyLoader() {
        // our loader is wrapped inside another parent div, so that's why we get the parent element
        const loaderParentDiv = document.querySelector("#loader-overlay");
        if (loaderParentDiv) loaderParentDiv.parentElement.remove();
    }

    /**
     * Show our beautiful loader... or not!
     *
     * @param showLoaderElement - true or false
     * @returns {Promise<void>}
     */
    static async show(showLoaderElement = true) {
        this.#destroyLoader(); // remove so we dont get duplicates
        if (showLoaderElement)
            await this.#showLoader();
    }

    static async hide() {
        await Loader.show(false);
    }
}
