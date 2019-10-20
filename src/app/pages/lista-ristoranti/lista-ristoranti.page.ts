import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {CategoriaService} from '../../services/categoria.service';
import {Categoria} from '../../model/categoria.model';
import {ModalController} from '@ionic/angular';
import {FiltriPage} from '../filtri/filtri.page';
import {Recensione} from 'src/app/model/recensione.model';
import {MappaRistorantiPage} from '../mappa-ristoranti/mappa-ristoranti.page';


@Component({
  selector: 'app-lista-ristoranti',
  templateUrl: './lista-ristoranti.page.html',
  styleUrls: ['./lista-ristoranti.page.scss'],
})
export class ListaRistorantiPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private modalController: ModalController) {
  }

  private categoria: Categoria = new Categoria();
  private idCategoria: number;
  private nomeCitta: string;
  private nomeRisto: string;
  private requestType: number;
  private passaRistorantiModale: Ristorante[];
  private latlng: string;
  private lat: string;
  private lon: string;

  private zoomMap: number;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.requestType = parseInt(params.get('requestType'), 0);
      if (this.requestType === 1) {
        this.idCategoria = parseInt(params.get('id'), 0);
        this.categoriaService.getCategoria(this.idCategoria).subscribe((categoria) => {
          this.categoria.nome = categoria.nome;
        });
        this.getRistorantiByCategoria();
        this.zoomMap = 10;
      } else if (this.requestType === 2) {
        this.nomeCitta = params.get('id');
        console.log('Lista:' + this.nomeCitta);
        this.getRistorantiByCitta();
        this.zoomMap = 14;
      } else if (this.requestType === 3) {
        this.nomeRisto = params.get('id');
        console.log('Lista:' + this.nomeRisto);
        this.getRistorantiByNome();
        this.zoomMap = 10;
      } else if (this.requestType === 4) {
        this.latlng = params.get('id');
        console.log(this.latlng);
        const coord = this.latlng.split(',');
        console.log(coord);
        this.lat = coord[0];
        this.lon = coord[1];
        this.getRistorantiByCoord();
        this.zoomMap = 10;
      }
    });
  }


  getRistorantiByCategoria() {
    console.log('Richiesto elenco ristoranti della categoria: ' + this.idCategoria);
    // this.ristoranti$ = this.ristoranteService.getRistorantiByCategoriaId(this.idCategoria);
    this.ristoranteService.getRistorantiByCategoriaId(this.idCategoria).subscribe((ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }

  getRistorantiByCitta() {
    console.log('Richiesto elenco ristoranti della citta: ' + this.nomeCitta);
    // this.ristoranti$ = this.ristoranteService.getRistorantiByCittaNome(this.nomeCitta);
    this.ristoranteService.getRistorantiByCittaNome(this.nomeCitta).subscribe((ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }

  getRistorantiByNome() {
    console.log('Richiesto elenco ristoranti con nome: ' + this.nomeRisto);
    // this.ristoranti$ = this.ristoranteService.getRistorantiByNome(this.nomeRisto);
    this.ristoranteService.getRistorantiByNome(this.nomeRisto).subscribe((ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }


  async openFilters() {
    const modal = await this.modalController.create({
      component: FiltriPage,
      componentProps: {
        passaRistorantiModale: this.passaRistorantiModale
      }
    });
    modal.onWillDismiss().then(dataReturned => {
      this.passaRistorantiModale = dataReturned.data;
      console.log('Receive: ', this.passaRistorantiModale);
    });
    return await modal.present();
  }

  calcolaMedie(recensioni: Recensione[], ristorante: Ristorante): number {
    let mediaCucina = 0;
    let mediaServizio = 0;
    let mediaPrezzo = 0;
    for (const recensione of recensioni) {
      mediaCucina += recensione.votoCucina;
      mediaServizio += recensione.votoServizio;
      mediaPrezzo += recensione.votoPrezzo;
    }
    mediaCucina /= recensioni.length;
    mediaServizio /= recensioni.length;
    mediaPrezzo /= recensioni.length;
    mediaCucina = Math.floor(mediaCucina * 10) / 10;
    mediaServizio = Math.floor(mediaServizio * 10) / 10;
    mediaPrezzo = Math.floor(mediaPrezzo * 10) / 10;
    ristorante.punteggio = Math.floor(((mediaCucina + mediaServizio + mediaPrezzo) / 3) * 10) / 10;
    return ristorante.punteggio;
  }

  getRistorantiByCoord() {
    this.ristoranteService.getRistorantiAroundUser(this.lat, this.lon).subscribe((ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }

   async openMap() {
      const modal = await this.modalController.create({
        component: MappaRistorantiPage,
        componentProps: {
          passaRistorantiModale: this.passaRistorantiModale,
          zoomMap: this.zoomMap
        }
      });
      modal.onWillDismiss().then(dataReturned => {
        this.passaRistorantiModale = dataReturned.data;
      });
      return await modal.present();
    }
}
