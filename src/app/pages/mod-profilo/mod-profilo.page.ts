import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';

@Component({
  selector: 'app-mod-profilo',
  templateUrl: './mod-profilo.page.html',
  styleUrls: ['./mod-profilo.page.scss'],
})
export class ModProfiloPage implements OnInit {
  private profileFormModule: FormGroup;
  private utente: Utente;
  constructor(private formBuilder: FormBuilder,
              private utenteService: UtenteService,
              private navController: NavController) { }

  ngOnInit() {
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
    this.profileFormModule = this.formBuilder.group( {
      nome: [this.utente.nome, Validators.compose([Validators.required])],
      cognome: [this.utente.cognome, Validators.compose([Validators.required])],
      email: [this.utente.email, Validators.compose([Validators.required])],
      nuovaPassword: ['', Validators.compose([Validators.required])],
      telefono: [this.utente.telefono, Validators.compose([Validators.required])],
      citta: [this.utente.citta.nome, Validators.compose([Validators.required])],
      data: [this.utente.nascita, Validators.compose([Validators.required])],
      sesso: [this.utente.sesso, Validators.compose([Validators.required])]
    });
  }

  onProfileSubmit() {
    this.navController.navigateBack('tabs/profilo');
  }
}
