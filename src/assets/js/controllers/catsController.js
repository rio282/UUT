import {Controller} from "./controller.js";
import {CatsRepository} from "../repositories/catsRepository.js";
import {Loader} from "../framework/utils/Loader.js";
import {App} from "../app.js";

export class CatsController extends Controller {
    #catsView;
    #catsRepository;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        this.#catsView = await super.loadHtmlIntoContent("html_views/cats.html");
        this.#catsRepository = new CatsRepository();
        this.#createCatCards().then(() => App.print("Loaded cat cards."));
    }

    async #createCatCards() {
        await Loader.show().then(async () => {
            const timeline = this.#catsView.querySelector("#cat-cards-timeline");
            const response = await fetch("html_views/templates/cat_card.html");
            if (!response.ok) {
                App.print("Couldn't fetch cat card html.", "!");
                return;
            }
            const catCardHtml = await response.text();

            for (let postNumber = 1; postNumber <= 10; postNumber++) {
                let catCard = document.createElement("div");
                catCard.innerHTML = catCardHtml; // assign template to newly created element
                timeline.append(catCard);

                // assign values for post
                catCard.id = `post-${postNumber}`;
                catCard.querySelector("#title").textContent = `Title ${postNumber}`;

            }
        });

        await Loader.hide();
    }
}
