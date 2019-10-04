import {Ristorante} from './ristorante.model';
import {Utente} from './utente.model';
import {RecensioneId} from './recensioneId.model';

export class Recensione {
    recensioneId: RecensioneId;
    votoCucina: number;
    votoServizio: number;
    votoPrezzo: number;
    descrizione: string;
    utente: Utente;
    ristorante: Ristorante;
}
