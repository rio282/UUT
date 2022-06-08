import {App} from "../app.js";
import {Controller} from "./controller.js";
import {ApiRepository} from "../repositories/apiRepository.js";

export class ApiController extends Controller {
    #apiView;
    #apiRepository;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        this.#apiView = await super.loadHtmlIntoContent("html_views/api.html");
        this.#apiRepository = new ApiRepository();
    }
}
