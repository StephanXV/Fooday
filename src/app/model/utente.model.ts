import {Immagine} from './immagine.model';

export class Utente {
    nome: string;
    cognome: string;
    email: string;
    sesso: string;
    telefono: string;
    nascita: Date;
    immagineProfilo: Immagine;
}
