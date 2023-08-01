export const setQueryParams = (parameters) => {
    // loop through parameters object into query parameters
    let queryString = '';

    for(const key in parameters) {

        // replace spaces with +
        parameters[key] = parameters[key].replace(/\s/g, '+');
        
        // check if key is the last key in the object
        if(key === Object.keys(parameters)[Object.keys(parameters).length - 1]) {
            queryString += `${key}:${parameters[key]}`
            break;
        }


        queryString += `${key}:${parameters[key]}%`

    }

    return queryString;
}

