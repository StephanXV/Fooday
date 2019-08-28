import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  onLoginButtonClick() {
    this.navController.navigateRoot('login');
  }

}
