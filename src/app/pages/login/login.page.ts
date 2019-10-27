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
  private loginErrorTitle: string;
  private loginErrorSubTitle: string;
  private loginSuccessTitle: string;
  private loginSuccessSubtitle: string;

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
          this.showLoginSuccess();
          this.loginFormModel.reset();
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
      header: this.loginErrorTitle,
      message: this.loginErrorSubTitle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async showLoginSuccess() {
    const alert = await this.alertController.create({
      header: this.loginSuccessTitle,
      message: this.loginSuccessSubtitle + this.loginFormModel.value.username,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navController.navigateBack('');
          }
        }
      ]
    });

    await alert.present();
  }

  navigateHome() {
    this.navController.navigateBack('');
  }

  initTranslate() {
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data: string) => {
      this.loginErrorTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_MESSAGE').subscribe((data: string) => {
      this.loginErrorSubTitle = data;
    });
    this.translateService.get('LOGIN_SUCCESS_TITLE').subscribe((data: string) => {
      this.loginSuccessTitle = data;
    });
    this.translateService.get('LOGIN_SUCCESS_MESSAGE').subscribe((data: string) => {
      this.loginSuccessSubtitle = data;
    });
  }
}
