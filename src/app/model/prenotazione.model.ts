import {Utente} from './utente.model';
import {Ristorante} from './ristorante.model';
import {PrenotazioneId} from './prenotazioneId.model';

export class Prenotazione {
    prenotazioneId: PrenotazioneId;
    nome: string;
    giorno: Date;
    orario: string;
    posti: number;
    scontoApplicato: number;
    utente: Utente;
    usaPunti: boolean;
    isValutata: boolean;
    ristorante: Ristorante;
}
