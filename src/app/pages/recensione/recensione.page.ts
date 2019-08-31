import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.page.html',
  styleUrls: ['./recensione.page.scss'],
})
export class RecensionePage implements OnInit {

  private reviewFormModule: FormGroup;
  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  constructor(private formBuilder: FormBuilder,
              private navController: NavController) { }

  ngOnInit() {
    this.reviewFormModule = this.formBuilder.group({
      votoCucina: ['', Validators.compose([Validators.required])],
      votoServizio: ['', Validators.compose([Validators.required])],
      votoPrezzo: ['', Validators.compose([Validators.required])],
      descrizione: ['', Validators.compose([Validators.required])]
    });
  }

  onReviewSubmit(){
    console.log('Recensione Pubblicata');
    this.navController.navigateBack('tabs/prenotazioni');
  }

}
