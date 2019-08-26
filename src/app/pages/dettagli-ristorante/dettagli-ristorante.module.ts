import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettagliRistorantePage } from './dettagli-ristorante.page';

const routes: Routes = [
  {
    path: '',
    component: DettagliRistorantePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DettagliRistorantePage]
})
export class DettagliRistorantePageModule {}
