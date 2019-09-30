import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Prenotazione} from '../../model/prenotazione.model';
import {PrenotazioneService} from '../../services/prenotazione.service';
import {Utente} from '../../model/utente.model';
import {UtenteService} from '../../services/utente.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit {
  private utente: Utente;
  private prenotazioni$: Observable<Prenotazione[]>;

  constructor(private prenotazioneService: PrenotazioneService,
              private utenteservice: UtenteService) { }

  ngOnInit() {
    this.utenteservice.getUtente().subscribe( (utente) => {
      this.utente = utente;
      this.listPrenotazioni(); });
  }

  listPrenotazioni() {
    this.prenotazioni$ = this.prenotazioneService.getPrenotazioni(this.utente.id);
  }

}
