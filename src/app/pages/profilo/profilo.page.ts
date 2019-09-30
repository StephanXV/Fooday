import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private utente: Utente;

  constructor(private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
  }

  onLogoutButtonClick() {
    this.utenteService.logout();
    this.navController.navigateRoot('tabs');
  }

}
