import {App} from "../../app.js";

export class NetworkManager {
    /**
     * Request to server using NodeJS
     *
     * @param route
     * @param data
     * @param method - GET, POST etc.
     * @returns {Promise<*>}
     */
    async doRequest(route, method, data = {}) {
        const url = baseUrl + route;

        let response;
        try {
            const options = {
                method: method,
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            };

            // for post: add data to fetch request if exists
            let json = "<none>";
            if (Object.entries(data).length !== 0) {
                json = JSON.stringify(data);
                options.body = json;
            }

            // do request
            response = await fetch(url, options);
            if (!response.ok) {
                const jsonErrResponse = await response.json();
                let errorMsg = response.statusText;

                // if error
                if ("reason" in jsonErrResponse)
                    errorMsg = jsonErrResponse.reason;
                return this.#onFail(response.status, errorMsg);
            }

            // return response
            return await response.json();
        } catch (e) {
            let responseCode = 1000;
            if (typeof response !== "undefined") {
                responseCode = response.status;
                e = response.statusText;
            }
            return this.#onFail(responseCode, e);
        }
    }

    /**
     * Error handler for this class
     *
     * @private
     * @param errorCode - response code from server or 1000 if not sent back
     * @param error - error message + status
     */
    #onFail(errorCode, error) {
        // ni server response
        if (errorCode === 1000 && error === null) {
            //1. request did not arrive at server, error in client side code
            //2. server cant process request and can't give back valid json
            error = "Request did not arrive at server or no valid json response received from server.";
        }

        App.print(`Error with response code: ${errorCode} and message: ${JSON.stringify(error)}`, "!");
        return Promise.reject({code: errorCode, reason: error});
    }
}
