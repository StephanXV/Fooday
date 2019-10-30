import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {TranslateModule} from '@ngx-translate/core';
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'ricerca',
        children: [
          {
            path: '',
            loadChildren: '../ricerca/ricerca.module#RicercaPageModule'
          }
        ]
      },
      {
        path: 'prenotazioni',
        children: [
          {
            path: '',
            loadChildren: '../prenotazioni/prenotazioni.module#PrenotazioniPageModule',
            canActivate: [AuthGuard],
            data: {pag: ['prenotazioni']}
}
        ]
      },
      {
        path: 'preferiti',
        children: [
          {
            path: '',
            loadChildren: '../preferiti/preferiti.module#PreferitiPageModule',
            canActivate: [AuthGuard],
            data: {pag: ['preferiti']}
          }
        ]
      },
      {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../profilo/profilo.module#ProfiloPageModule',
            canActivate: [AuthGuard],
            data: {pag: ['profilo']}
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
