import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


import {URL} from '../constants';
import {Observable} from 'rxjs';
import {Ristorante} from '../model/ristorante.model';

@Injectable({
    providedIn: 'root'
})

export class RistoranteService {

    constructor(private http: HttpClient) {
    }

    getRistorantiByCittaId(idCitta): Observable<Ristorante[]> {
        const ristorantiByCittaUrl = `${URL.RISTORANTI_CITTA}/${idCitta}`;
        return this.http.get<Ristorante[]>(ristorantiByCittaUrl);

    }

    getRistorantiByCategoriaId(idCategoria): Observable<Ristorante[]> {
        const ristorantiByCategoriaUrl = `${URL.RISTORANTI_CATEGORIA}/${idCategoria}`;
        return this.http.get<Ristorante[]>(ristorantiByCategoriaUrl);
    }

    getRistoranteById(idRistorante): Observable<Ristorante> {
        const ristoranteUrl = `${URL.RISTORANTI}/${idRistorante}`;
        return this.http.get<Ristorante>(ristoranteUrl);
    }
}
