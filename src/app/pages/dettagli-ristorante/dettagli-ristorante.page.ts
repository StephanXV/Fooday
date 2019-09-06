import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dettagli-ristorante',
  templateUrl: './dettagli-ristorante.page.html',
  styleUrls: ['./dettagli-ristorante.page.scss'],
})
export class DettagliRistorantePage implements OnInit {
  view: string;
  antipasti = ['Bruschette', 'Arancini', 'Patatine fritte'];
  primi = ['Spaghetti allo scoglio', 'Linguine all\'astice', 'Gnocchi al sugo'];
  secondi = ['Cotoletta alla milanese', 'Arrosto di Maiale'];
  dessert = ['Frutta di stagione', 'Torta al cioccolato', 'Cheesecake'];
  bevande = ['Coca-Cola', 'Birra', 'Acqua', 'Sprite', 'Fanta'];
  reviews = ['Tutto bene', 'Cibo ottimo, prezzo un po meno', 'Ci siamo sentiti a casa, davvero cordiali']
  constructor() { }

  ngOnInit() {
    this.view = 'info';
  }
}
