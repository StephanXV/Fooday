import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {URL, URL_BASE} from '../constants';
import {Observable} from 'rxjs';
import {Citta} from '../model/citta.model';

@Injectable({
    providedIn: 'root'
})

export class CittaService {

    constructor(private http: HttpClient) {
    }

    cittaInput(): Observable<Citta[]> {
        return this.http.get<Citta[]>( URL.CITTA);

    }

}
