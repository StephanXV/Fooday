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
        path: 'dettagli-ristorante',
        children: [
          {
            path: '',
            loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
          }
        ]
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
