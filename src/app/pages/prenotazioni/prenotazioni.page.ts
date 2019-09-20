import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Prenotazione} from '../../model/prenotazione.model';
import {PrenotazioneService} from '../../services/prenotazione.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit {
  idUtente = 1;
  private prenotazioni$: Observable<Prenotazione[]>;

  constructor(private prenotazioneService: PrenotazioneService) { }

  ngOnInit() {
    this.prenotazioni$ = this.prenotazioneService.getPrenotazioni(this.idUtente);
  }

}
