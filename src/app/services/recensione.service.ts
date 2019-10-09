import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recensione} from '../model/recensione.model';
import {Observable} from 'rxjs';
import {URL} from '../constants';

@Injectable({
    providedIn: 'root'
})

export class RecensioneService {

    constructor(private http: HttpClient) {
    }

    createRecensione(recensione: Recensione): Observable<Recensione> {
        return this.http.post<Recensione>(URL.RECENSIONI, recensione);
    }

}
