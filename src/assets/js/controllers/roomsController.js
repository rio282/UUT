import {Controller} from "./controller.js";
import {RoomsRepository} from "../repositories/roomsRepository.js";
import {Loader} from "../framework/utils/Loader.js";
import {App} from "../app.js";

export class RoomsController extends Controller {
    #roomsView;
    #roomsRepository;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        this.#roomsView = await super.loadHtmlIntoContent("html_views/rooms.html");
        this.#roomsRepository = new RoomsRepository();

        const roomKeyInput = this.#roomsView.querySelector("#create-room-key__field");

        const generateRoomKey = this.#roomsView.querySelector("#create-room-key-generate__btn");
        generateRoomKey.addEventListener("click", () => roomKeyInput.value = App.generateUUID());

        const roomKeyInputBtn = this.#roomsView.querySelector("#create-room-key-input__btn");
        roomKeyInputBtn.addEventListener("click", () => {
            const openedEyeHtml = `<i class="fa fa-eye"></i>`;
            const closedEyeHtml = `<i class="fa fa-eye-slash"></i>`;

            roomKeyInput.type = (roomKeyInput.type === "password") ? "text" : "password";
            roomKeyInputBtn.innerHTML = (roomKeyInput.type === "password") ? `Show ${openedEyeHtml}` : `Hide ${closedEyeHtml}`;
        });

        const roomKeyCopyBtn = this.#roomsView.querySelector("#create-room-key-copy__btn");
        roomKeyCopyBtn.addEventListener("click", () => {
            const copyHtml = `<i class="fa fa-copy"></i>`;
            const copiedHtml = `<i class="fa fa-check"></i>`;

            roomKeyInput.select();
            roomKeyInput.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(roomKeyInput.value).then(result => {
                roomKeyCopyBtn.innerHTML = `Copied! ${copiedHtml}`;
                super.sleep(1000).then(() => roomKeyCopyBtn.innerHTML = `Copy ${copyHtml}`);
            });
        });

        const createRoomBtn = this.#roomsView.querySelector("#create-room__btn");
        createRoomBtn.addEventListener("click", async () => {
            await Loader.show();
            // TODO: create room & nav to that room page (send create request to db)
            //  - make room mvc


            await Loader.hide();
        });
    }
}
