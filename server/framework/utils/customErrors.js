function RoomAlreadyExistsError(message = "Room already exists.") {
    this.name = "RoomAlreadyExistsError";
    this.message = message;

    let error = new Error(this.message);
    error.name = this.name;
    this.stack = error.stack;
}

function RoomNotFoundError(message = "Can't find room.") {
    this.name = "RoomNotFoundError";
    this.message = message;

    let error = new Error(this.message);
    error.name = this.name;
    this.stack = error.stack;
}

RoomAlreadyExistsError.prototype = Object.create(Error.prototype);
RoomNotFoundError.prototype = Object.create(Error.prototype);

module.exports = {RoomAlreadyExistsError, RoomNotFoundError};
