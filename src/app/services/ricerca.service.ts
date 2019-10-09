import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {URL, URL_BASE} from '../constants';
import {Observable} from 'rxjs';
import {Ricerca} from '../model/ricerca.model';

@Injectable({
    providedIn: 'root'
})

export class RicercaService {

    constructor(private http: HttpClient) {
    }

    getRicercheByUtente(idUtente): Observable<Ricerca[]> {
        const ricercheUrl = `${URL.RICERCHE}/${idUtente}`;
        return this.http.get<Ricerca[]>(ricercheUrl);
    }

    createRicerca(ricerca: Ricerca): Observable<Ricerca> {
        return this.http.post<Ricerca>(URL.RICERCHE, ricerca);
    }

    deleteRicerca(idRicerca): Observable<Ricerca> {
        const ricercheUrl = `${URL.RICERCHE}/${idRicerca}`;
        return this.http.delete<Ricerca>(ricercheUrl);
    }
}
