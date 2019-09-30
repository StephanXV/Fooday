import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {Citta} from '../../model/citta.model';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  private nuovoUtente: Utente = new Utente();
  private registerFormModule: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
              private utenteService: UtenteService) { }

  ngOnInit() {
    this.registerFormModule = this.formBuilder.group( {
      nome: ['a', Validators.compose([Validators.required])],
      cognome: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([Validators.required])],
      citta: ['', Validators.compose([Validators.required])],
      data: ['', Validators.compose([Validators.required])],
      sesso: ['', Validators.compose([Validators.required])]
    });
  }

  onRegister() {
    this.nuovoUtente.nome = this.registerFormModule.value.nome;
    this.nuovoUtente.cognome = this.registerFormModule.value.cognome;
    this.nuovoUtente.username = this.registerFormModule.value.username;
    this.nuovoUtente.email = this.registerFormModule.value.email;
    this.nuovoUtente.password = this.registerFormModule.value.password;
    this.nuovoUtente.telefono = this.registerFormModule.value.telefono;
    const citta = new Citta();
    citta.nome = this.registerFormModule.value.citta;
    this.nuovoUtente.citta = citta;
    this.nuovoUtente.nascita = this.registerFormModule.value.data;
    this.nuovoUtente.sesso = this.registerFormModule.value.sesso;
    this.utenteService.registerUtente(this.nuovoUtente).subscribe( (nuovoUtente: Utente) => console.log('Fatto'));
  }
}
