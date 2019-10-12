import {Citta} from './citta.model';
import {Categoria} from './categoria.model';
import {Prenotazione} from './prenotazione.model';
import {Recensione} from './recensione.model';
import {Orario} from './orario.model';
import {Pietanza} from './pietanza.model';
import {Immagine} from './immagine.model';

export class Ristorante {
    id: number;
    nome: string;
    indirizzo: string;
    descrizione: string;
    postiTot: number;
    punteggio: number;
    prezzoMedio: number;
    sconto: number;
    latitudine: number;
    longitudine: number;
    citta: Citta;
    categorie: Categoria[];
    prenotazioni: Prenotazione[];
    recensioni: Recensione[];
    orari: Orario[];
    pietanze: Pietanza[];
    immagini: Immagine[];

}
