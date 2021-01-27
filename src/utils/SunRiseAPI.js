import {CONFIG_SUNRISE_API} from "./utils";

class SunRiseAPI {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    getInfo(date) {
        return fetch(`${this._baseUrl}&date=${date}`, {
            method: 'GET',
            headers: {
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
    }
}

const sunriseApi = new SunRiseAPI(CONFIG_SUNRISE_API);
export default sunriseApi;