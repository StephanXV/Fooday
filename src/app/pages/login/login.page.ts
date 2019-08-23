import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginFormModel: FormGroup;
  private loginTitle: string;
  private loginSubTitle: string;

  constructor(private formBuilder: FormBuilder,
              private alertController: AlertController,
              private navController: NavController) {
  }

  ngOnInit() {
    this.loginFormModel = this.formBuilder.group({
      username: ['fabrizio', Validators.compose([
        Validators.required
      ])],
      password: ['pavan', Validators.compose([
        Validators.required
      ])]
    });
  }

  onLogin() {
    this.navController.navigateRoot('tabs');
  }
}
