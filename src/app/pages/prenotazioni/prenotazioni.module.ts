import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrenotazioniPage } from './prenotazioni.page';
import {TranslateModule} from '@ngx-translate/core';
import {NgCircleProgressModule} from 'ng-circle-progress';

const routes: Routes = [
  {
    path: '',
    component: PrenotazioniPage
  },
  {
    path: 'recensione/:id/:timestamp',
    children: [
      {
        path: '',
        loadChildren: '../recensione/recensione.module#RecensionePageModule'
      }
    ]
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule.forChild(),
        IonicModule,
        RouterModule.forChild(routes),
        NgCircleProgressModule
    ],
  declarations: [PrenotazioniPage]
})
export class PrenotazioniPageModule {}
