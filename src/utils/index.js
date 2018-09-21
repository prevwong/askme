
export const asyncForEach = async (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        await callback(arr[i], i, arr);
    }
}

export const displayName = (first_name, last_name) =>{
    return first_name + " " + last_name;
}

export const extractFirstLastName = (displayName) => {
    displayName = displayName.split(" ");
    const first_name = displayName[0];
    displayName.shift();
    const last_name = displayName.join(" ");
    return {
        first_name,
        last_name
    }
}


export const expandRoutesToStack = (routes, navigator) => {
    const obj = {};
    Object.keys(routes).forEach(route => {
        obj[`${route}`] = {
            screen: navigator(routes, { initialRouteName: route })
        }
    });
    return obj;
}



export default {
    asyncForEach,
}