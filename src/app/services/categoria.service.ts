import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {URL} from '../constants';
import {Observable} from 'rxjs';
import {Categoria} from '../model/categoria.model';

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(URL.CATEGORIE);
    }

    getCategoria(idCategoria): Observable<Categoria> {
        const categoriaUrl = `${URL.CATEGORIE}/${idCategoria}`;
        return this.http.get<Categoria>(categoriaUrl);
    }

}
