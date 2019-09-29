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
  private nome: string;
  private cognome: string;
  private email: string;
  private nascita: string;
  private sesso: string;
  private telefono: string;

  constructor(private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
    this.nome = this.utente.nome;
    this.cognome = this.utente.cognome;
    this.email = this.utente.email;
    this.nascita = this.utente.nascita;
    this.sesso = this.utente.sesso;
    this.telefono = this.utente.telefono;
  }

  onLogoutButtonClick() {
    this.utenteService.logout();
    this.navController.navigateRoot('tabs');
  }

}
