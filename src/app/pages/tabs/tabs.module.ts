import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

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
            loadChildren: '../prenotazioni/prenotazioni.module#PrenotazioniPageModule'
          }
        ]
      },
      {
        path: 'preferiti',
        children: [
          {
            path: '',
            loadChildren: '../preferiti/preferiti.module#PreferitiPageModule'
          }
        ]
      },
      {
        path: 'profilo',
        children: [
          {
            path: '',
            loadChildren: '../profilo/profilo.module#ProfiloPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
