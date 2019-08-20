import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrenotazioniPage } from './prenotazioni.page';

const routes: Routes = [
  {
    path: '',
    component: PrenotazioniPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrenotazioniPage]
})
export class PrenotazioniPageModule {}
