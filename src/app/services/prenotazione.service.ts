import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {URL} from '../constants';
import {Prenotazione} from '../model/prenotazione.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PrenotazioneService {

    constructor(private http: HttpClient) {
    }

    getPrenotazioni(idUtente): Observable<Prenotazione[]> {
        const prenotazioniUrl = `${URL.PRENOTAZIONI}/${idUtente}`;
        return this.http.get<Prenotazione[]>(prenotazioniUrl);
    }

}
