import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrenotazioniPage } from './prenotazioni.page';
import {TranslateModule} from '@ngx-translate/core';

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
        TranslateModule.forChild(),
        IonicModule,
        RouterModule.forChild(routes)
    ],
  declarations: [PrenotazioniPage]
})
export class PrenotazioniPageModule {}
