import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfiloPage } from './profilo.page';

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
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: '../login/login.module#LoginPageModule'
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
  declarations: [ProfiloPage]
})
export class ProfiloPageModule {}
