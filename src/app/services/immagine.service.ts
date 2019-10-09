import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ricerca} from '../model/ricerca.model';
import {URL} from '../constants';

@Injectable({
    providedIn: 'root'
})

export class ImmagineService {

    constructor(private http: HttpClient) {
    }

    getImage(imageUrl: string): Observable<Blob> {
        return this.http.get(imageUrl, { responseType: 'blob'});
    }

}
