import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  private registerFormModule: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private navController: NavController) { }

  ngOnInit() {
    this.registerFormModule = this.formBuilder.group( {
      nome: ['', Validators.compose([Validators.required])],
      cognome: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      telefono: ['', Validators.compose([Validators.required])],
      citta: ['', Validators.compose([Validators.required])],
      data: ['', Validators.compose([Validators.required])],
      sesso: ['', Validators.compose([Validators.required])]
    });
  }

  onRegister() {
    this.navController.navigateRoot('login');
  }
}
