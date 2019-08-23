import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaRistorantiPage } from './lista-ristoranti.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRistorantiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaRistorantiPage]
})
export class ListaRistorantiPageModule {}
