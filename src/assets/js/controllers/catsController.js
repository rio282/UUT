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
        this.#createCatCards().then(_ => App.print("Loaded cat cards."));
    }

    async #createCatCards() {
        await Loader.show();

        this.#catsView.querySelector("#cat-cards");

        // await Loader.hide();
    }
}
