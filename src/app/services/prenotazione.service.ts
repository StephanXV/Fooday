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

    list(): Observable<Prenotazione[]> {
        return this.http.get<Prenotazione[]>(URL.PRENOTAZIONI);

    }

}
