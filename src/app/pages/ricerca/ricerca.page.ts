import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.page.html',
  styleUrls: ['./ricerca.page.scss'],
})
export class RicercaPage implements OnInit {

  recentResearches = ['napoli', 'arrosticini', 'bistrot', 'carlo cracco', 'cannavacciuolo'];

  constructor() { }

  ngOnInit() {
  }

}
