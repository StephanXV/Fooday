import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'lista-ristoranti',
        children: [
          {
            path: '',
            loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
          }
        ]
      },
      {
        path: 'lista-ristoranti/:requestType/:id',
        children: [
          {
            path: '',
            loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
          }
        ]
      },
      {
        path: 'dettagli-ristorante/:id',
        children: [
          {
            path: '',
            loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
          }
        ]
      },
      {
        path: 'preferenze',
        children: [
          {
            path: '',
            loadChildren: '../preferenze/preferenze.module#PreferenzePageModule'
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
