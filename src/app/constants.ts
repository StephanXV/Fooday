export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/myunivaq/api';

export const URL = {
    LOGIN: URL_BASE + '/login',
    LOGOUT: URL_BASE + '/logout',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
    NOTIZIE: URL_BASE + '/notizie',
    INSEGNAMENTI: URL_BASE + '/insegnamenti',
    PRENOTAZIONI: URL_BASE + '/prenotazioni',
    RISTORANTI: URL_BASE + '/ristoranti',
    CATEGORIE: URL_BASE + '/categorie',
    CITTA: URL_BASE + '/citta',
    APPELLI: URL_BASE + '/appelli'
};

export const X_AUTH = 'X-Auth';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';
