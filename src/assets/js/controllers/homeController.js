import {App} from "../app.js";
import {Controller} from "./controller.js";
import {HomeRepository} from "../repositories/homeRepository.js";

export class HomeController extends Controller {
    #homeView;
    #homeRepository;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        this.#homeView = await super.loadHtmlIntoContent("html_views/home.html");
        this.#homeRepository = new HomeRepository();
    }


}
