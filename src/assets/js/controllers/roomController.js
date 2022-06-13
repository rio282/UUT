import {Controller} from "./controller.js";
import {Loader} from "../framework/utils/Loader.js";

export class RoomController extends Controller {
    #roomView;
    #roomKey;

    #lockedHtml = `<i class="fa fa-eye-lock"></i>`;
    #unlockedHtml = `<i class="fa fa-eye-unlocked"></i>`;

    constructor(roomKey) {
        super();
        this.#roomKey = roomKey;
        this.#setupView().then(async () => await Loader.hide());
    }

    async #setupView() {
        this.#roomView = await super.loadHtmlIntoContent("html_views/room.html");


    }
}
