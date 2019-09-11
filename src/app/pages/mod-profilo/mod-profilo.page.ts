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
      nome: ['Nome'],
      cognome: ['Cognome'],
      email: ['Email'],
      password: ['Password'],
      telefono: ['3333333336'],
      data: ['08-06-1997'],
      sesso: ['M']
    });
  }

  onProfileSubmit() {
    this.navController.navigateBack('tabs/profilo');
  }
}
