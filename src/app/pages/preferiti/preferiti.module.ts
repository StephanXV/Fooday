import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreferitiPage } from './preferiti.page';

const routes: Routes = [
  {
    path: '',
    component: PreferitiPage
  },
  {
    path: 'dettagli-ristorante',
    children: [
      {
        path: '',
        loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
      }
    ]
  },
  {
    path: 'prenota',
    children: [
      {
        path: '',
        loadChildren: '../prenota/prenota.module#PrenotaPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreferitiPage]
})
export class PreferitiPageModule {}
