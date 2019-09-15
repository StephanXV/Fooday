import {Ristorante} from './ristorante.model';
import {Utente} from './utente.model';

export class Recensione {
    votoCucina: number;
    votoServizio: number;
    votoPrezzo: number;
    descrizione: string;
    timestamp: Date;
    utente: Utente;
    ristorante: Ristorante;
}
