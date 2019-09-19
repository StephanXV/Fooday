import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-mod-profilo',
  templateUrl: './mod-profilo.page.html',
  styleUrls: ['./mod-profilo.page.scss'],
})
export class ModProfiloPage implements OnInit {
  private profileFormModule: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private navController: NavController) { }

  ngOnInit() {
    this.profileFormModule = this.formBuilder.group( {
      nome: ['Nome', Validators.compose([Validators.required])],
      cognome: ['Cognome', Validators.compose([Validators.required])],
      email: ['Email', Validators.compose([Validators.required])],
      password: ['Password', Validators.compose([Validators.required])],
      telefono: ['3333333336', Validators.compose([Validators.required])],
      citta: ['Vasto', Validators.compose([Validators.required])],
      data: ['08-06-1997', Validators.compose([Validators.required])],
      sesso: ['M', Validators.compose([Validators.required])]
    });
  }

  onProfileSubmit() {
    this.navController.navigateBack('tabs/profilo');
  }
}
