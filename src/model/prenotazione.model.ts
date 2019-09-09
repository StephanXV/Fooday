import {Utente} from './utente.model';
import {Ristorante} from './ristorante.model';

export class Prenotazione {
    orario: Date;
    posti: number;
    timestamp: Date;
    scontoApplicato: number;
    utente: Utente;
    ristorante: Ristorante;
}
