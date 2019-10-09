import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {Utente} from '../../model/utente.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Account, UtenteService} from '../../services/utente.service';
import {TranslateService} from '@ngx-translate/core';




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
              private navController: NavController,
              private utenteService: UtenteService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.initTranslate();
    this.loginFormModel = this.formBuilder.group({
      username: ['steflo', Validators.compose([
        Validators.required
      ])],
      password: ['stefano', Validators.compose([
        Validators.required
      ])]
    });
  }

  onLogin() {
    const account: Account = this.loginFormModel.value;
    this.utenteService.login(account).subscribe((utente: Utente) => {
          this.loginFormModel.reset();
          this.navController.navigateRoot('tabs');
        },
        (err: HttpErrorResponse) => {
          if (err.status === 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        });
  }

  async showLoginError() {
    const alert = await this.alertController.create({
      header: this.loginTitle,
      message: this.loginSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }

  initTranslate() {
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data: string) => {
      this.loginTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_MESSAGE').subscribe((data: string) => {
      this.loginSubTitle = data;
    });
  }
}
