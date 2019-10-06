export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/myunivaq/api';

export const URL = {
    LOGIN: URL_BASE + '/login',
    LOGOUT: URL_BASE + '/logout',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
    REGISTRAZIONE: URL_BASE + '/utente/registrazione',
    PRENOTAZIONI: URL_BASE + '/prenotazioni',
    PRENOTAZIONI_DELETE: URL_BASE + '/prenotazioni/delete',
    PRENOTAZIONI_VALUTATA: URL_BASE + '/prenotazioni/valutata',
    RECENSIONI: URL_BASE + '/recensioni',
    PREFERITI: URL_BASE + '/ristoranti/preferiti',
    RISTORANTI: URL_BASE + '/ristoranti',
    RISTORANTI_CITTA_NOME: URL_BASE + '/ristoranti/bynomecitta',
    RISTORANTI_NOME: URL_BASE + '/ristoranti/bynome',
    RISTORANTI_CITTA_ID: URL_BASE + '/ristoranti/byidcitta',
    RISTORANTI_CITTA_AROUND: URL_BASE + '/ristoranti/around',
    RISTORANTI_CATEGORIA: URL_BASE + '/ristoranti/categoria',
    CATEGORIE: URL_BASE + '/categorie',
    CITTA: URL_BASE + '/citta',
    ORARI: URL_BASE + '/orari',
    UTENTI: URL_BASE + '/utenti',
    RICERCHE: URL_BASE + '/ricerche',
    PIETANZE: URL_BASE + '/pietanze',
    IMMAGINI: URL_BASE + '/immagini'
};

export const X_AUTH = 'X-Auth';

export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';
