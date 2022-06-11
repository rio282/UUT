import {Controller} from "./controller.js";
import {RoomsRepository} from "../repositories/roomsRepository.js";
import {Loader} from "../framework/utils/Loader.js";

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
        generateRoomKey.addEventListener("click", () => roomKeyInput.value = this.#generateUUID());

        const roomKeyInputBtn = this.#roomsView.querySelector("#create-room-key-input__btn");
        roomKeyInputBtn.addEventListener("click", () => {
            roomKeyInput.type = (roomKeyInput.type === "password") ? "text" : "password";
            roomKeyInputBtn.textContent = (roomKeyInput.type === "password") ? "Show" : "Hide";
        });

        const roomKeyCopyBtn = this.#roomsView.querySelector("#create-room-key-copy__btn");
        roomKeyCopyBtn.addEventListener("click", () => {
            const copySvg = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-clipboard" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>`;

            roomKeyInput.select();
            roomKeyInput.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(roomKeyInput.value).then(result => {
                roomKeyCopyBtn.innerHTML = `Copied! ${copySvg}`;
                super.sleep(1000).then(() => roomKeyCopyBtn.innerHTML = `Copy ${copySvg}`);
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


    /**
     * LITERAL MAGIC, DO NOT TOUCH!
     *
     * @returns {string} - randomly generated UUID
     */
    #generateUUID() {
        let d = new Date().getTime();
        let d2 = ((typeof performance !== "undefined") && performance.now && (performance.now() * 1000)) || 0;
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}
