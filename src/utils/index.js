import { parseNumber, formatNumber } from "libphonenumber-js";

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

export const shuffle = (a) =>  {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export const capitalize = (str) => {
    try {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (err) {
        return str;
    }
}

export const getCategoryName = (id) => {
    let categories = {
        18: "science",
        21: "sports",
        25: "art",
        27: "animals",
        22: "geography"
    };

    return capitalize(categories[id]);


}

export const decodeHTMLEntities = (text) => {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

    return text;
}

export const formatPhoneNumber = (phone_number) => {
    const parsed = parseNumber(phone_number, {
        extended: true,
        defaultCountry: 'MY'
    });
    return formatNumber(parsed, 'E.164');
}
export default {
    asyncForEach,
}