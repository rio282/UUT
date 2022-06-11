import {Controller} from "./controller.js";
import {RoomsRepository} from "../repositories/roomsRepository.js";
import {Loader} from "../framework/utils/Loader.js";
import {App} from "../app.js";

export class RoomsController extends Controller {
    #roomsView;
    #roomsRepository;

    #openedEyeHtml = `<i class="fa fa-eye"></i>`;
    #closedEyeHtml = `<i class="fa fa-eye-slash"></i>`;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        this.#roomsView = await super.loadHtmlIntoContent("html_views/rooms.html");
        this.#roomsRepository = new RoomsRepository();

        this.#setupCreateRoom();
        this.#setupPeekRoom();
    }

    #setupCreateRoom() {
        const roomKeyInput = this.#roomsView.querySelector("#create-room-key__field");

        const generateRoomKey = this.#roomsView.querySelector("#create-room-key-generate__btn");
        generateRoomKey.addEventListener("click", () => roomKeyInput.value = App.generateUUID());

        const roomKeyInputBtn = this.#roomsView.querySelector("#create-room-key-input__btn");
        roomKeyInputBtn.addEventListener("click", () => {
            roomKeyInput.type = (roomKeyInput.type === "password") ? "text" : "password";
            roomKeyInputBtn.innerHTML = (roomKeyInput.type === "password") ? `Show ${this.#openedEyeHtml}` : `Hide ${this.#closedEyeHtml}`;
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

        const roomDoorInput = this.#roomsView.querySelector("#create-door__field");
        const createRandomDoorBtn = this.#roomsView.querySelector("#create-room-door-random__btn");
        createRandomDoorBtn.addEventListener("click", () => {
            roomDoorInput.value = super.randInt(0, 999999);
        });


        const createRoomBtn = this.#roomsView.querySelector("#create-room__btn");
        createRoomBtn.addEventListener("click", async () => {
            await Loader.show();
            // TODO: create room & nav to that room page (send create request to db)
            //  - make room mvc


            await Loader.hide();
        });
    }

    #setupPeekRoom() {
        const roomKeyPeekInput = this.#roomsView.querySelector("#peek-room-key__field");

        const roomKeyPeekInputBtn = this.#roomsView.querySelector("#peek-room-key-input__btn");
        roomKeyPeekInputBtn.addEventListener("click", () => {
            roomKeyPeekInput.type = (roomKeyPeekInput.type === "password") ? "text" : "password";
            roomKeyPeekInputBtn.innerHTML = (roomKeyPeekInput.type === "password") ? `Show ${this.#openedEyeHtml}` : `Hide ${this.#closedEyeHtml}`;
        });

        const roomKeyPeekPasteBtn = this.#roomsView.querySelector("#peek-room-key-copy__btn");
        roomKeyPeekPasteBtn.addEventListener("click", () => {
            try {
                navigator.clipboard.readText().then(text => roomKeyPeekInput.value = text);
            } catch (e) {
                if (e instanceof TypeError) {
                    alert("Error: Your browser doesn't support clipboard reading.");
                    return;
                }

                App.print(e.toString(), "!");
            }
        });

        const roomPeekBtn = this.#roomsView.querySelector("#peek-room__btn");
        roomPeekBtn.addEventListener("click", async () => {
            await Loader.show();


            await Loader.hide();
        });
    }
}
