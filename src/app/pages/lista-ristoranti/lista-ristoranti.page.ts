import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {Observable} from 'rxjs';
import {RistoranteService} from '../../services/ristorante.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-lista-ristoranti',
  templateUrl: './lista-ristoranti.page.html',
  styleUrls: ['./lista-ristoranti.page.scss'],
})
export class ListaRistorantiPage implements OnInit {

  private ristoranti$: Observable<Ristorante[]>;
  private idCategoria: number;
  private nomeCitta: string;

  constructor(private route: ActivatedRoute, private ristoranteService: RistoranteService ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (parseInt(params.get('id'), 0)) {
        this.idCategoria = parseInt(params.get('id'), 0);
        this.getRistorantiByCategoria();
      } else {
        this.nomeCitta = params.get('city');
        this.getRistorantiByCitta();
      }
      });
  }

  getRistorantiByCategoria() {
    console.log('Richiesto elenco ristoranti della categoria ' + this.idCategoria);
    this.ristoranti$ = this.ristoranteService.getRistorantiByCategoriaId(this.idCategoria);
  }

  getRistorantiByCitta() {
    console.log('Richiesto elenco ristoranti della citta' + this.nomeCitta);
    this.ristoranti$ = this.ristoranteService.getRistorantiByCittaId(this.idCategoria);
  }

}
