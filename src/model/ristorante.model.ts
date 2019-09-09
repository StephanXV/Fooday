import {Citta} from './citta.model';
import {Immagine} from './immagine.model';
import {Menu} from './menu.model';
import {Categoria} from './categoria.model';
import {Orario} from './orario.model';

export class Ristorante {
    nome: string;
    indirizzo: string;
    descrizione: string;
    postiTot: number;
    punteggio: number;
    prezzoMedio: number;
    sconto: number;
    citta: Citta;
    immagini: Immagine[];
    menu: Menu;
    categorie: Categoria[];
    orari: Orario[];
}
