import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-prenota',
  templateUrl: './prenota.page.html',
  styleUrls: ['./prenota.page.scss'],
})
export class PrenotaPage implements OnInit {

  private bookFormModule: FormGroup;
  private numbers: number[] = [1 , 2, 3, 4, 5];
  private orari = ['18:30', '19:00', '19:30', '20:00', '20:30'];

  constructor(private formBuilder: FormBuilder,
              private navController: NavController) { }

  ngOnInit() {
    this.bookFormModule = this.formBuilder.group({
      posti: ['', Validators.compose([Validators.required])],
      data: ['', Validators.compose([Validators.required])],
      orario: ['', Validators.compose([Validators.required])],
      nome: ['', Validators.compose([Validators.required])],
      punti: ['', Validators.compose([Validators.required])]
    });
  }

  onBookSubmit() {
    console.log('Prenotazione confermata');
    this.navController.navigateBack('');
  }
}
