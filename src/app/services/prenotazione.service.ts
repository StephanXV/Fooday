import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {URL} from '../constants';
import {Prenotazione} from '../model/prenotazione.model';
import {Observable} from 'rxjs';
import {Recensione} from '../model/recensione.model';
import {Utente} from "../model/utente.model";

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

    deletePrenotazioni(idUtente, idRistorante, timestamp): Observable<number> {
        const url = `${URL.PRENOTAZIONI_DELETE}/${idUtente}/${idRistorante}/${timestamp}`;
        return this.http.delete<number>(url);
    }

    createPrenotazione(prenotazione: Prenotazione): Observable<Prenotazione> {
        return this.http.post<Prenotazione>(URL.PRENOTAZIONI, prenotazione);
    }

    prenotazioneValutata(idUtente, idRistorante, timestamp) {
        const url = `${URL.PRENOTAZIONI_VALUTATA}/${idUtente}/${idRistorante}/${timestamp}`;
        return this.http.get(url);
    }

    updatePunti(utente: Utente, usaPunti) {
        const url = `${URL.PRENOTAZIONI}/up/${usaPunti}`;
        return this.http.put<Utente>(url, utente);
    }




}
