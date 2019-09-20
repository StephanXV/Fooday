import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Citta} from '../../model/citta.model';
import {CittaService} from '../../services/citta.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  private citta$: Observable<Citta[]>;
  recentResearches = ['napoli', 'arrosticini', 'bistrot', 'carlo cracco', 'cannavacciuolo'];
  value1: string;
  value2: string;

  constructor(private router: Router, private cittaService: CittaService) { }

  ngOnInit() {

  }

  onSubmit1() {
    console.log(this.value1);
    if (this.value1 != null) {
      this.router.navigateByUrl('tabs/ricerca/lista-ristoranti');
    }
  }

  onSubmit2() {
    console.log(this.value2);
    if (this.value2 != null) {
      this.router.navigateByUrl('tabs/ricerca/lista-ristoranti');
    }
  }
}
