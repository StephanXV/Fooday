import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recensione} from '../model/recensione.model';
import {Observable} from 'rxjs';
import {URL} from '../constants';
import {Prenotazione} from '../model/prenotazione.model';

@Injectable({
    providedIn: 'root'
})

export class RecensioneService {

    constructor(private http: HttpClient) {
    }

    createRecensione(recensione: Recensione): Observable<Recensione> {
        return this.http.post<Recensione>(URL.RECENSIONI, recensione);
    }

    getRecensioni(idRistorante): Observable<Recensione[]> {
        const url = `${URL.PRENOTAZIONI}/${idRistorante}`;
        return this.http.get<Recensione[]>(url);
    }

}
