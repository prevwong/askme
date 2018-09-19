
export const asyncForEach = async (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        await callback(arr[i], i, arr);
    }
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




export default {
    asyncForEach,
}