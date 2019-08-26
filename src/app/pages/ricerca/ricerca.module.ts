import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RicercaPage } from './ricerca.page';

const routes: Routes = [
  {
    path: '',
    component: RicercaPage
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
    path: 'lista-ristoranti',
    children: [
      {
        path: '',
        loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
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
  declarations: [RicercaPage]
})
export class RicercaPageModule {}
