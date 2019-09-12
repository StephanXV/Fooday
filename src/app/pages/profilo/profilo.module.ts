import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfiloPage } from './profilo.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProfiloPage
  },
  {
    path: 'preferenze',
    children: [
      {
        path: '',
        loadChildren: '../preferenze/preferenze.module#PreferenzePageModule'
      }
    ]
  },
  {
    path: 'mod-profilo',
    children: [
      {
        path: '',
        loadChildren: '../mod-profilo/mod-profilo.module#ModProfiloPageModule'
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
  declarations: [ProfiloPage]
})
export class ProfiloPageModule {}
