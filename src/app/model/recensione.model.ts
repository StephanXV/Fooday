import {Ristorante} from './ristorante.model';
import {Utente} from './utente.model';

export class Recensione {
    id: number;
    votoCucina: number;
    votoServizio: number;
    votoPrezzo: number;
    descrizione: string;
    timestamp: Date;
    utente: Utente;
    ristorante: Ristorante;
}
