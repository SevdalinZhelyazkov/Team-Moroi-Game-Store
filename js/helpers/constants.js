const AUTH_TOKEN = 'auth-token';
const USER_NAME = 'username';
const USER_ID = 'user_id';
const GAMES_IN_CART = 'games_in_cart';
const PAGE_SIZE_BIG = 8;
const PAGE_SIZE_SMALL = 4;
const USERNAME_MIN_LENGTH = 3;
const PASSWORD_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MAX_LENGTH = 20;

const ORDERBY = {
    DEFAULT: 0,
    TITLE_ASC: 1,
    TITLE_DESC: 2,
    PRICE_ASC: 3,
    PRICE_DESC: 4
};

let constants = {
    AUTH_TOKEN,
    USER_NAME, 
    USER_ID,
    GAMES_IN_CART,
    PAGE_SIZE_BIG,
    PAGE_SIZE_SMALL,
    ORDERBY,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
};

export { constants as CONSTANTS };