import {Citta} from './citta.model';

export class Ristorante {
    id: number;
    nome: string;
    indirizzo: string;
    descrizione: string;
    postiTot: number;
    punteggio: number;
    prezzoMedio: number;
    sconto: number;
    citta: Citta;
}
