import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ricerca} from '../model/ricerca.model';
import {URL} from '../constants';
import {Immagine} from '../model/immagine.model';
import {Ristorante} from '../model/ristorante.model';

@Injectable({
    providedIn: 'root'
})

export class ImmagineService {

    constructor(private http: HttpClient) {
    }

    getImage(imageUrl: string): Observable<Blob> {
        return this.http.get(imageUrl, { responseType: 'blob'});
    }

    getImmaginePrincipaleByRistoranteId(idRistorante): Observable<Immagine> {
        const url = `${URL.IMMAGINE_PRINCIPALE}/${idRistorante}`;
        return this.http.get<Immagine>(url);
    }

    getImmaginiRistoranteId(idRistorante): Observable<Immagine[]> {
        const url = `${URL.IMMAGINI}/${idRistorante}`;
        return this.http.get<Immagine[]>(url);
    }
}
