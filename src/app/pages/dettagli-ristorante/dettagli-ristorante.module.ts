import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DettagliRistorantePage } from './dettagli-ristorante.page';
import {TranslateModule} from '@ngx-translate/core';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {HereMapComponent} from '../../here-map/here-map.component';
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DettagliRistorantePage
  },
  {
    path: 'prenota/:id',
    children: [
      {
        path: '',
        loadChildren: '../prenota/prenota.module#PrenotaPageModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'galleria',
    children: [
      {
        path: '',
        loadChildren: '../galleria/galleria.module#GalleriaPageModule'
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
        RouterModule.forChild(routes),
        NgCircleProgressModule,
    ],
    declarations: [DettagliRistorantePage, HereMapComponent],
    exports: [HereMapComponent]
})
export class DettagliRistorantePageModule {}
