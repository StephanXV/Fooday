import {Immagine} from './immagine.model';

export class Utente {
    name: string;
    surname: string;
    email: string;
    sex: string;
    phone: string;
    birthday: Date;
    immagineProfilo: Immagine;
}
