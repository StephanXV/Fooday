import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Ristorante} from '../../model/ristorante.model';
import {RistoranteService} from '../../services/ristorante.service';
import {Citta} from '../../model/citta.model';
import {Categoria} from '../../model/categoria.model';
import {CategoriaService} from '../../services/categoria.service';
import {NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';
import {URL_BASE} from '../../constants';
import {ImmagineService} from '../../services/immagine.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private requestType: number;
  private cittaLocalizzata = 6;
  private ristoranti$: Observable<Ristorante[]>;
  private categorie$: Observable<Categoria[]>;
  private cities = ['Roma', 'Milano', 'Torino', 'Napoli', 'L\'Aquila'];
  private url = URL_BASE + '/';
  private imageToShow: any;

  constructor(private router: Router, private ristoranteService: RistoranteService,
              private categoriaService: CategoriaService,
              private navController: NavController,
              private sanitizer: DomSanitizer
              ) {}


  ngOnInit() {
    this.ristoranti$ = this.ristoranteService.getRistorantiByCittaId(this.cittaLocalizzata);
    /*this.ristoranti$.subscribe(
        data => { this.createImageFromBlob(data[0].immagini[0].file); }
        );*/
    this.categorie$ = this.categoriaService.list();
    this.navController.navigateRoot('tabs');
  }

  onCategoryClick(idCategoria: number) {
    this.requestType = 1;
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, idCategoria]);
  }

  onCityClick(nomeCitta: string) {
    this.requestType = 2;
    console.log('Home:' + nomeCitta);
    this.router.navigate(['/tabs/home/lista-ristoranti', this.requestType, nomeCitta]);
  }

  /*getImageFromService(yourImageUrl: string) {
    this.isImageLoading = true;
    this.immagineService.getImage(yourImageUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }*/

  createImageFromBlob(image: Blob) {
    console.log(typeof image);
    let myblob = new Blob([image]);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
      }, false);
    if (image) {
      reader.readAsDataURL(myblob);
    }
  }
}
