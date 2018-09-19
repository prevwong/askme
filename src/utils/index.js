
export const asyncForEach = async (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
        await callback(arr[i], i, arr);
    }
}




export default {
    asyncForEach,
}