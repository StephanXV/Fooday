import {Immagine} from './immagine.model';
import {Citta} from './citta.model';

export class Utente {
    id: number;
    nome: string;
    cognome: string;
    email: string;
    sesso: string;
    telefono: string;
    nascita: Date;
    srcImmagineProfilo: string;
    citta: Citta;
}