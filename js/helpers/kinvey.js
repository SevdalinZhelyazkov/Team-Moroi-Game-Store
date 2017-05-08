import { UTILS } from 'utils';

const APP_ID = "kid_BJIASAnyZ";
const APP_SECRET = "7e0b0cfdd62548049f5256fa73c642f3";
const APP_MASTER = "2bf62ebd10b34f76b71e9b33d8f76426";
const AUTORIZATION_STRING = `${APP_ID}:${APP_SECRET}`;
const AUTORIZATION_STRING_MASTER = `${APP_ID}:${APP_MASTER}`;
const AUTORIZATION_HEADER_BOOKS = UTILS.encryptToBase64(AUTORIZATION_STRING_MASTER);
const AUTORIZATION_HEADER_USERS = UTILS.encryptToBase64(AUTORIZATION_STRING);

function getAllGamesUrl(){
    return `https://baas.kinvey.com/appdata/${APP_ID}/games/`;
}

function getGamesByPlatformUrl(filter){
    return `https://baas.kinvey.com/appdata/${APP_ID}/games/?query=${filter}`;
}   

function getGameByTitleUrl(filter){
    return `https://baas.kinvey.com/appdata/${APP_ID}/games/?query=${filter}`;
} 

function searchGameByTitleUrl(filter){
    return `https://baas.kinvey.com/appdata/${APP_ID}/games/?query=${filter}`;
}

function addGamesToUserUrl(userId){
    return `https://baas.kinvey.com/user/${APP_ID}/${userId}`;
}

function getUserGamesUrl(userId){
    return `https://baas.kinvey.com/user/${APP_ID}/${userId}`;
}

function getLoginUrl(){
    return `https://baas.kinvey.com/user/${APP_ID}/login/`;
}

function getRegisterUrl(){
    return `https://baas.kinvey.com/user/${APP_ID}/`;
}


let URLS = {
    getAllGamesUrl: getAllGamesUrl,
    getGamesByPlatformUrl: getGamesByPlatformUrl,
    getGameByTitleUrl: getGameByTitleUrl,
    searchGameByTitleUrl: searchGameByTitleUrl,
    addGamesToUserUrl: addGamesToUserUrl,
    getUserGamesUrl: getUserGamesUrl,
    getLoginUrl: getLoginUrl,
    getRegisterUrl: getRegisterUrl
};

let GAMES_OPTIONS = {
    headers: {
        'Authorization': `Basic a2lkX0JKSUFTQW55WjoyYmY2MmViZDEwYjM0Zjc2YjcxZTliMzNkOGY3NjQyNg==`,
        'X-Kinvey-API-Version': '3'
    }
};

let USERS_OPTIONS = {
    headers: {
        'Authorization': `Basic ${AUTORIZATION_HEADER_USERS}`
    }
};

let kinvey = {
    URLS: URLS,
    GAMES_OPTIONS: GAMES_OPTIONS,
    USERS_OPTIONS: USERS_OPTIONS
};

export { kinvey as KINVEY };

