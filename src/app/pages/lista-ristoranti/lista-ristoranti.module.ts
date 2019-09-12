import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaRistorantiPage } from './lista-ristoranti.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ListaRistorantiPage
  },
  {
    path: 'dettagli-ristorante',
    children: [
      {
        path: '',
        loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [ListaRistorantiPage]
})
export class ListaRistorantiPageModule {}
