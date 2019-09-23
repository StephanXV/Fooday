import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {Observable} from 'rxjs';
import {RistoranteService} from '../../services/ristorante.service';

@Component({
  selector: 'app-lista-ristoranti',
  templateUrl: './lista-ristoranti.page.html',
  styleUrls: ['./lista-ristoranti.page.scss'],
})
export class ListaRistorantiPage implements OnInit {

  private ristoranti$: Observable<Ristorante[]>;
  private requestType: number;
  private idCategoria: number;
  private nomeCitta: string;

  constructor(private route: ActivatedRoute, private ristoranteService: RistoranteService ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.requestType = parseInt(params.get('requestType'), 0);
      switch (this.requestType) {
        case 1:
          this.idCategoria = parseInt(params.get('id'), 0);
          this.getRistorantiByCategoria();
          break;
        case 2:
          this.nomeCitta = params.get('city');
          this.getRistorantiByCitta();
          break;
      }
    });
  }

  getRistorantiByCategoria() {

  }

  getRistorantiByCitta() {

  }

}
