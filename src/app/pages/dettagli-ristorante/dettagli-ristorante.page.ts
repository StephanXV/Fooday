import { Component, OnInit } from '@angular/core';
import {RistoranteService} from '../../services/ristorante.service';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-dettagli-ristorante',
  templateUrl: './dettagli-ristorante.page.html',
  styleUrls: ['./dettagli-ristorante.page.scss'],
})
export class DettagliRistorantePage implements OnInit {
  view: string;
  private ristorante$: Observable<Ristorante>;
  private ristorante: Ristorante;
  private idRistorante: number;
  antipasti = ['Bruschette', 'Arancini', 'Patatine fritte'];
  primi = ['Spaghetti allo scoglio', 'Linguine all\'astice', 'Gnocchi al sugo'];
  secondi = ['Cotoletta alla milanese', 'Arrosto di Maiale'];
  dessert = ['Frutta di stagione', 'Torta al cioccolato', 'Cheesecake'];
  bevande = ['Coca-Cola', 'Birra', 'Acqua', 'Sprite', 'Fanta'];
  reviews = ['Tutto bene', 'Cibo ottimo, prezzo un po meno', 'Ci siamo sentiti a casa, davvero cordiali']
  constructor(private ristoranteService: RistoranteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.view = 'info';
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id'), 0);
      this.dettagliRistorante();
    });
  }

  dettagliRistorante() {
    this.ristorante$ = this.ristoranteService.getRistoranteById(this.idRistorante);
  }
}
