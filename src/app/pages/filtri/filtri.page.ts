import {Component, Input, OnInit} from '@angular/core';
import {__await} from 'tslib';
import {ModalController, Platform} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {Categoria} from '../../model/categoria.model';
import {CategoriaService} from '../../services/categoria.service';

@Component({
  selector: 'app-filtri',
  templateUrl: './filtri.page.html',
  styleUrls: ['./filtri.page.scss'],
})
export class FiltriPage implements OnInit {
  private votiVal: any;
  private prezzoVal: { upper: any, lower: any};
  private categorie$: Observable<Categoria[]>;
  private categoriaScelta: Categoria;
  private isToggledPromo: boolean;
  private ordinaPerSelected: string;

  constructor(private modalController: ModalController,
              private categoriaService: CategoriaService,
              private platform: Platform) {
      this.platform.ready().then(() => {
        this.categorie$ = this.categoriaService.list();
        this.prezzoVal = {
          upper: 150,
          lower: 0
        };
        this.isToggledPromo = false;
        this.categoriaScelta = null;
        this.votiVal = null;
    });
  }
  @Input() passaRistorantiModale: Ristorante[];

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  changeCategoria(categoria) {
    this.categoriaScelta = categoria;
  }

  notifyPromoToggle() {
    console.log('Toggled: ' + this.isToggledPromo);
  }

  checkValueOrdina(event: CustomEvent<any>) {
    this.ordinaPerSelected = event.detail.valueOf().value;
  }

  async applicaFiltri() {
    for (const risto of this.passaRistorantiModale) {
      if (this.categoriaScelta != null) { // filtra categorie
        let check = false;
        for (const cate of risto.categorie) {
          if (cate.nome === this.categoriaScelta.nome) {
            check = true;
            continue;
          }
        }
        if (!check) {
          this.passaRistorantiModale = this.passaRistorantiModale.filter(item => item !== risto); // rimuovi
          continue;
        }
      }
      if (this.isToggledPromo === true && risto.sconto === 0) { // filtra promo
        this.passaRistorantiModale = this.passaRistorantiModale.filter(item => item !== risto); // rimuovi
        console.log('passo 1');
        continue;
      }
      if (this.votiVal != null && risto.punteggio < this.votiVal) { // filtra punteggio
        this.passaRistorantiModale = this.passaRistorantiModale.filter(item => item !== risto); // rimuovi
        console.log('passo 2');
        continue;
      }
      if (risto.prezzoMedio < this.prezzoVal.lower || risto.prezzoMedio > this.prezzoVal.upper) { // filtra prezzo
        this.passaRistorantiModale = this.passaRistorantiModale.filter(item => item !== risto); // rimuovi
        console.log('passo 3');
        continue;
      }
      if (this.ordinaPerSelected === 'aperto') { // filtra apertura
        const now = new Date();
        const days = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'];
        const day = days[ now.getDay() ];
        for (const gg of risto.orari) {
          if (gg.giorno === day && gg.apertura === 'Chiuso') {
            this.passaRistorantiModale = this.passaRistorantiModale.filter(item => item !== risto); // rimuovi
          }
        }
      }
    }
    if (this.ordinaPerSelected === 'prezzo') { // ordina per prezzo
      this.passaRistorantiModale.sort(function(a, b) {
        return a.prezzoMedio - b.prezzoMedio;
      });
    } else if (this.ordinaPerSelected === 'popolarita') { // ordina per popolarità
      this.passaRistorantiModale.sort(function(a, b) {
        return b.punteggio - a.punteggio;
      });
    }
    console.log(this.passaRistorantiModale);
    await this.modalController.dismiss(this.passaRistorantiModale);
  }
}
