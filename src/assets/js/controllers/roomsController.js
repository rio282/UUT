import {Controller} from "./controller.js";
import {RoomsRepository} from "../repositories/roomsRepository.js";
import {Loader} from "../framework/utils/Loader.js";
import {App} from "../app.js";
import * as httpCodes from "../framework/utils/httpErrorCodes.js";

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

        this.#setupCreateRoomForm();
    }

    #setupCreateRoomForm() {
        const roomIdInput = this.#roomsView.querySelector("#create-room-id__field");
        const roomKeyInput = this.#roomsView.querySelector("#create-room-key__field");
        const generateRoomIdBtn = this.#roomsView.querySelector("#create-room-id-generate__btn");
        const generateRoomKeyBtn = this.#roomsView.querySelector("#create-room-key-generate__btn");
        const roomIdCopyBtn = this.#roomsView.querySelector("#create-room-id-copy__btn");
        const roomKeyCopyBtn = this.#roomsView.querySelector("#create-room-key-copy__btn");
        const roomKeyShowBtn = this.#roomsView.querySelector("#create-room-key-input__btn");
        const createRoomBtn = this.#roomsView.querySelector("#create-room__btn");

        [generateRoomIdBtn, generateRoomKeyBtn].forEach(genBtn => {
            const inputField = this.#roomsView.querySelector(`#${genBtn.getAttribute("data-target")}`);
            genBtn.addEventListener("click", () => inputField.value = App.generateUUID());
        });

        roomKeyShowBtn.addEventListener("click", () => {
            // show / hide room_key
            roomKeyInput.type = (roomKeyInput.type === "password") ? "text" : "password";
            roomKeyShowBtn.innerHTML = (roomKeyInput.type === "password") ? `Show ${this.#openedEyeHtml}` : `Hide ${this.#closedEyeHtml}`;
        });

        [roomIdCopyBtn, roomKeyCopyBtn].forEach(copyBtn => {
            copyBtn.addEventListener("click", () => {
                const copyHtml = `<i class="fa fa-copy"></i>`;
                const copiedHtml = `<i class="fa fa-check"></i>`;

                const inputField = this.#roomsView.querySelector(`#${copyBtn.getAttribute("data-target")}`);

                inputField.select();
                roomKeyInput.setSelectionRange(0, 99999); // For mobile devices
                navigator.clipboard.writeText(roomKeyInput.value).then(() => {
                    copyBtn.innerHTML = `Copied! ${copiedHtml}`;
                    super.sleep(1000).then(() => copyBtn.innerHTML = `Copy ${copyHtml}`);
                });
            });
        });

        createRoomBtn.addEventListener("click", async () => {
            await Loader.show();

            const roomId = roomIdInput.value;
            const roomKey = roomKeyInput.value;
            const roomMemory = this.#roomsView.querySelector("#create-room-memory").value;
            const autoDeleteAfter = `${this.#roomsView.querySelector("#create-room-auto-delete-number").value}_${this.#roomsView.querySelector("#create-room-auto-delete-time").value}`;

            // try to create a room
            await this.#roomsRepository.createRoom(roomId, roomKey, roomMemory, autoDeleteAfter).then(async () => {
                // load room page
                App.loadController(App.CONTROLLER_ROOM, roomId);
            }).catch(error => {
                if (error.code === httpCodes.BAD_REQUEST_CODE && String(error.reason).includes("RoomAlreadyExistsError")) {
                    // room was found
                    // TODO: replace with yes no thing xd
                    alert(`Found already existing room with room_id '${roomId}'.\nDo you want to visit this room?`);
                    App.loadController(App.CONTROLLER_ROOM, roomId);
                } else {
                    alert("Unknown server error.");
                }
            });
        });
    }
}
