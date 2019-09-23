import {Utente} from './utente.model';
import {Ristorante} from './ristorante.model';

export class Prenotazione {
    id: number;
    giorno: Date;
    orario: string;
    posti: number;
    timestamp: string;
    scontoApplicato: number;
    utente: Utente;
    ristorante: Ristorante;
}
