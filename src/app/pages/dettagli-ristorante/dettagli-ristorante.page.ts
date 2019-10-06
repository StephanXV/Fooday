import { Component, OnInit } from '@angular/core';
import {RistoranteService} from '../../services/ristorante.service';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Recensione} from '../../model/recensione.model';

declare var f;

@Component({
  selector: 'app-dettagli-ristorante',
  templateUrl: './dettagli-ristorante.page.html',
  styleUrls: ['./dettagli-ristorante.page.scss'],
})
export class DettagliRistorantePage implements OnInit {
  view: string;
  private ristorante$: Observable<Ristorante>;
  private idRistorante: number;
  private mediaCucina = 0;
  private mediaServizio = 0;
  private mediaPrezzo = 0;
  private giorni = ['lunedi', 'martedi', 'mercoledi', 'giovedi',
    'venerdi', 'sabato', 'domenica'];
  constructor(private ristoranteService: RistoranteService, private route: ActivatedRoute) {
    /*coll[0].addEventListener('click', function() {
      this.classList.toggle('active');
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });*/
  }

  ngOnInit() {
    this.view = 'info';
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idRistorante = parseInt(params.get('id'), 0);
      this.dettagliRistorante();
    });
  }

  dettagliRistorante() {
    this.ristorante$ = this.ristoranteService.getRistoranteById(this.idRistorante);
    this.ristoranteService.getRistoranteById(this.idRistorante).subscribe( (ristorante) => {
      this.calcolaMedie(ristorante.recensioni);
    });

  }

  calcolaMedie(recensioni: Recensione[]) {
    for (const recensione of recensioni) {
      this.mediaCucina += recensione.votoCucina;
      this.mediaServizio += recensione.votoServizio;
      this.mediaPrezzo += recensione.votoPrezzo;
    }
    this.mediaCucina /= recensioni.length;
    this.mediaServizio /= recensioni.length;
    this.mediaPrezzo /= recensioni.length;
    this.mediaCucina = Math.floor(this.mediaCucina * 10) / 10;
    this.mediaServizio = Math.floor(this.mediaServizio * 10) / 10;
    this.mediaPrezzo = Math.floor(this.mediaPrezzo * 10) / 10;

  }

  callF() {
    f();
  }


}
