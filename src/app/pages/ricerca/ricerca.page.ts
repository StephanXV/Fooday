import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  recentResearches = ['napoli', 'arrosticini', 'bistrot', 'carlo cracco', 'cannavacciuolo'];
  value1;
  value2;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit1() {
    console.log(this.value1);
    this.router.navigateByUrl('tabs/ricerca/lista-ristoranti');
  }

  onSubmit2() {
    console.log(this.value2);
    this.router.navigateByUrl('tabs/ricerca/lista-ristoranti');
  }
}
