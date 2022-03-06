import {NotificationManager} from "react-notifications";

export const genericNetworkError = err => {

    NotificationManager.error(
        err.response.data.errors
            ? transformError(err.response.data.errors)
            : err.response.data,
        'ERROR !'
    );
};

export function transformError(arr) {

    let e = '';
    for (let key in arr) {
        let value = arr[key];
        e += value
    }

    return e;
}
