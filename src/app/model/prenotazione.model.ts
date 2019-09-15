import {Utente} from './utente.model';
import {Ristorante} from './ristorante.model';

export class Prenotazione {
    id: number;
    orario: Date;
    posti: number;
    timestamp: Date;
    scontoApplicato: number;
    utente: Utente;
    ristorante: Ristorante;
}
