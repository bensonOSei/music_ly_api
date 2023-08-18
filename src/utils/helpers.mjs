import { DateTime, Interval } from "luxon";

export const setQueryParams = (parameters) => {
    // loop through parameters object into query parameters
    let queryString = '';

    for(const key in parameters) {

        // check if key is the last key in the object
        if(key === Object.keys(parameters)[Object.keys(parameters).length - 1]) {
            queryString += `${key}:${parameters[key]}`
            break;
        }


        queryString += `${key}:${parameters[key]}%`

    }

    return queryString;
}


export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const isExpired = (expiryDate) => {
    // console.log('ex-date',expiryDate)
    
    const expiry = new Date(expiryDate).getTime();
    const now = new Date().getTime();
    const interval = expiry - now
    // console.log('expiry',expiry)
    // console.log('now',now)
    // console.log('interval', interval)

    return interval <= 0;
}

export const getExpirationDate = () => {
    // set expiration to 1 hour from now
    const expiration = DateTime.now().plus({ hours: 1 });

    return expiration.toISO();
}

