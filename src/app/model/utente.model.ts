import {Immagine} from './immagine.model';
import {Citta} from './citta.model';

export class Utente {
    id: number;
    nome: string;
    cognome: string;
    username: string;
    email: string;
    password: string;
    sesso: string;
    telefono: string;
    nascita: string;
    srcImmagineProfilo: string;
    citta: Citta;
    punti: number;
}
