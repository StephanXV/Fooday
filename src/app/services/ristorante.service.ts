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

    list(): Observable<Ristorante[]> {
        return this.http.get<Ristorante[]>(URL.RISTORANTI);

    }

}
