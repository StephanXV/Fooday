import {Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Ristorante} from '../../model/ristorante.model';
import leaflet from 'leaflet';


@Component({
  selector: 'app-mappa-ristoranti',
  templateUrl: './mappa-ristoranti.page.html',
  styleUrls: ['./mappa-ristoranti.page.scss'],
})
export class MappaRistorantiPage implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(private modalController: ModalController) { }
  @Input() passaRistorantiModale: Ristorante[];
  @Input() zoomMap: number;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map('map').setView(
        [this.passaRistorantiModale[0].latitudine, this.passaRistorantiModale[0].longitudine], this.zoomMap);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
    }).addTo(this.map);

    const customMarkerIcon = leaflet.icon({
      iconUrl: '/assets/images/logo-no-write.png',
      iconSize: [56, 64],
      popupAnchor: [0, -20],
    });

    this.passaRistorantiModale.forEach((restaurant) => {
      leaflet.marker([restaurant.latitudine, restaurant.longitudine], {icon: customMarkerIcon})
          .bindPopup(`<b>${restaurant.nome}
                            <br> Punteggio: ${restaurant.punteggio}</b>`, { autoClose: false })
          .addTo(this.map).openPopup();
    });
  }

  async closeModal() {
    await this.modalController.dismiss(this.passaRistorantiModale);
  }
}
