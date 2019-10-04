import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {URL} from '../constants';
import {Prenotazione} from '../model/prenotazione.model';
import {Observable} from 'rxjs';
import {Recensione} from '../model/recensione.model';

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

    deletePrenotazioni(idUtente, idRistorante, timestamp) {
        const url = `${URL.PRENOTAZIONI_DELETE}/${idUtente}/${idRistorante}/${timestamp}`;
        return this.http.delete(url);
    }

    createPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
        return this.http.post<Prenotazione>(URL.PRENOTAZIONI, prenotazione);
    }




}
