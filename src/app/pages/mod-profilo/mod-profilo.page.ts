import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, NavController} from '@ionic/angular';
import {UtenteService} from '../../services/utente.service';
import {Utente} from '../../model/utente.model';
import {Citta} from '../../model/citta.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-mod-profilo',
  templateUrl: './mod-profilo.page.html',
  styleUrls: ['./mod-profilo.page.scss'],
})
export class ModProfiloPage implements OnInit {
  private profileFormModule: FormGroup;
  private utente: Utente;
  private nuovoUtente: Utente = new Utente();
  private profiloTitle: string;
  private profiloMessage: string;
  private confirmButton: string;

  constructor(private formBuilder: FormBuilder,
              private utenteService: UtenteService,
              private navController: NavController,
              private alertController: AlertController,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.initTranslate();
    this.utenteService.getUtente().subscribe((utente) => {
      this.utente = utente;
    });
    this.profileFormModule = this.formBuilder.group( {
      nome: [this.utente.nome, Validators.compose([Validators.required])],
      cognome: [this.utente.cognome, Validators.compose([Validators.required])],
      username: [this.utente.username, Validators.compose([Validators.required])],
      email: [this.utente.email, Validators.compose([Validators.required])],
      nuovaPassword: ['', Validators.compose([])],
      telefono: [this.utente.telefono, Validators.compose([Validators.required])],
      citta: [this.utente.citta.nome, Validators.compose([Validators.required])],
      data: [this.utente.nascita, Validators.compose([Validators.required])],
      sesso: [this.utente.sesso, Validators.compose([Validators.required])]
    });
  }

  onProfileSubmit() {
    const vecchioUser = this.utente.username;
    this.nuovoUtente.nome = this.profileFormModule.value.nome;
    this.nuovoUtente.cognome = this.profileFormModule.value.cognome;
    this.nuovoUtente.username = this.profileFormModule.value.username;
    this.nuovoUtente.email = this.profileFormModule.value.email;
    this.nuovoUtente.password = this.profileFormModule.value.nuovaPassword;
    this.nuovoUtente.telefono = this.profileFormModule.value.telefono;
    const citta = new Citta();
    citta.nome = this.profileFormModule.value.citta;
    this.nuovoUtente.citta = citta;
    this.nuovoUtente.nascita = this.profileFormModule.value.data;
    this.nuovoUtente.sesso = this.profileFormModule.value.sesso;
    console.log(this.nuovoUtente);
    this.utenteService.updateProfilo(this.nuovoUtente, vecchioUser).subscribe((nuovoUtente: Utente) => this.profiloAggiornato(),
        error => (console.log('Username già presa')));
  }

  async profiloAggiornato() {
    const alert = await this.alertController.create({
      header: this.profiloTitle,
      message: this.profiloMessage,
      buttons: [
        {
          text: this.confirmButton,
          handler: () => {
            console.log('Utente aggiornato: ' + this.nuovoUtente.username);
            this.navController.back();
          }
        }
      ]
    });
    await alert.present();
  }

  initTranslate() {
    this.translateService.get('PROFILO_SUCCESSO_TITLE').subscribe((data: string) => {
      this.profiloTitle = data;
    });
    this.translateService.get('PROFILO_SUCCESSO_MESSAGE').subscribe((data: string) => {
      this.profiloMessage = data;
    });
    this.translateService.get('CONFIRM_BUTTON').subscribe((data: string) => {
      this.confirmButton = data;
    });
  }
}
