import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  recentResearches = ['napoli', 'arrosticini', 'bistrot', 'carlo cracco', 'cannavacciuolo'];
  value;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.value);
    this.router.navigateByUrl('tabs/ricerca/lista-ristoranti');

  }

}
