import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Ristorante} from '../../model/ristorante.model';
import {Observable} from 'rxjs';
import {RistoranteService} from '../../services/ristorante.service';
import {CategoriaService} from '../../services/categoria.service';
import {Categoria} from '../../model/categoria.model';
import {ModalController} from '@ionic/angular';
import {FiltriPage} from '../filtri/filtri.page';


@Component({
  selector: 'app-lista-ristoranti',
  templateUrl: './lista-ristoranti.page.html',
  styleUrls: ['./lista-ristoranti.page.scss'],
})
export class ListaRistorantiPage implements OnInit {

  private categoria: Categoria = new Categoria();
  private idCategoria: number;
  private nomeCitta: string;
  private nomeRisto: string;
  private requestType: number;
  private passaRistorantiModale: Ristorante[];

  constructor(private route: ActivatedRoute,
              private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private modalController: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.requestType = parseInt(params.get('requestType'), 0);
      if (this.requestType === 1) {
        this.idCategoria = parseInt(params.get('id'), 0);
        this.categoriaService.getCategoria(this.idCategoria).subscribe( (categoria) => {
          this.categoria.nome = categoria.nome;
        });
        this.getRistorantiByCategoria();
      } else if (this.requestType === 2) {
          this.nomeCitta = params.get('id');
          console.log('Lista:' + this.nomeCitta);
          this.getRistorantiByCitta();
        } else if (this.requestType === 3) {
        this.nomeRisto = params.get('id');
        console.log('Lista:' + this.nomeRisto);
        this.getRistorantiByNome();
      }
    });
  }


  getRistorantiByCategoria() {
    console.log('Richiesto elenco ristoranti della categoria: ' + this.idCategoria);
    // this.ristoranti$ = this.ristoranteService.getRistorantiByCategoriaId(this.idCategoria);
    this.ristoranteService.getRistorantiByCategoriaId(this.idCategoria).subscribe( (ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }

  getRistorantiByCitta() {
    console.log('Richiesto elenco ristoranti della citta: ' + this.nomeCitta);
    // this.ristoranti$ = this.ristoranteService.getRistorantiByCittaNome(this.nomeCitta);
    this.ristoranteService.getRistorantiByCittaNome(this.nomeCitta).subscribe( (ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }

  getRistorantiByNome() {
    console.log('Richiesto elenco ristoranti con nome: ' + this.nomeRisto);
    // this.ristoranti$ = this.ristoranteService.getRistorantiByNome(this.nomeRisto);
    this.ristoranteService.getRistorantiByNome(this.nomeRisto).subscribe( (ristoranti) => {
      this.passaRistorantiModale = ristoranti;
      console.log(this.passaRistorantiModale);
    }, () => console.log('Errore'));
  }

    async  openFilters() {
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

}
