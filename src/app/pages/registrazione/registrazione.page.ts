import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActionSheetController, AlertController, LoadingController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {Citta} from '../../model/citta.model';
import {TranslateService} from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.page.html',
  styleUrls: ['./registrazione.page.scss'],
})
export class RegistrazionePage implements OnInit {

  private nuovoUtente: Utente = new Utente();
  private registerFormModule: FormGroup;
  private registrationTitle: string;
  private messageTitle: string;
  private confirmButton: string;
  private immagine: any;

  constructor(private formBuilder: FormBuilder,
              private navController: NavController,
              private utenteService: UtenteService,
              private alertController: AlertController,
              private translateService: TranslateService,
              private camera: Camera,
              public actionSheetController: ActionSheetController,
              private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.initTranslate();
    this.registerFormModule = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
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
    this.nuovoUtente.immagine = this.immagine;
    this.utenteService.registerUtente(this.nuovoUtente).subscribe((nuovoUtente: Utente) => this.registrazioneCompletata(),
            error => (console.log('Username già presa')));
  }

  async registrazioneCompletata() {

    const alert = await this.alertController.create({
      header: this.registrationTitle,
      message: this.messageTitle,
      buttons: [
        {
          text: this.confirmButton,
          handler: () => {
            console.log('Utente registrato: ' + this.nuovoUtente.username);
            this.navController.back();
            }
        }
      ]
    });
    await alert.present();
  }

  initTranslate() {
    this.translateService.get('REGISTRAZIONE_SUCCESSO_TITLE').subscribe((data: string) => {
      this.registrationTitle = data;
    });
    this.translateService.get('REGISTRAZIONE_SUCCESSO_MESSAGE').subscribe((data: string) => {
      this.messageTitle = data;
    });
    this.translateService.get('CONFIRM_BUTTON').subscribe((data: string) => {
      this.confirmButton = data;
    });
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.showLoading(imageData);
      this.immagineAggiunta();
    }, (err) => {
        this.immagineNonAggiunta();
    });
  }

  async showLoading(base64: string) {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading image...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    loading.present();
    this.setImmagine(base64);
    await loading.dismiss();
  }

  async setImmagine(base64: string) {
    this.immagine = base64;
    await (this.immagine != null);
  }

  async immagineAggiunta() {

    const alert = await this.alertController.create({
      header: 'Immagine Aggiunta',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async immagineNonAggiunta() {

    const alert = await this.alertController.create({
      header: 'Errore! Immagine non aggiunta',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
