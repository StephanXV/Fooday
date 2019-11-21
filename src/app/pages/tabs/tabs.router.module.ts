import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';
import {AuthGuard} from '../../guard/auth.guard';
import {NgModule} from '@angular/core';

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
                        path: 'dettagli-ristorante/:id',
                        children: [
                            {
                                path: '',
                                loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                            },
                            {
                                path: 'prenota/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../prenota/prenota.module#PrenotaPageModule',
                                        canActivate: [AuthGuard],
                                        data: {pag: ['prenota']}
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
                        ]
                    },
                    {
                        path: 'lista-ristoranti',
                        children: [
                            {
                                path: '',
                                loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
                            },
                            {
                                path: 'dettagli-ristorante/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'lista-ristoranti/:requestType/:id',
                        children: [
                            {
                                path: '',
                                loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
                            },
                            {
                                path: 'dettagli-ristorante/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                                    }
                                ]
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
                ]
            },
            {
                path: 'ricerca',
                children: [
                    {
                        path: '',
                        loadChildren: '../ricerca/ricerca.module#RicercaPageModule'
                    },
                    {
                        path: 'dettagli-ristorante',
                        children: [
                            {
                                path: '',
                                loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                            }
                        ]
                    },
                    {
                        path: 'lista-ristoranti',
                        children: [
                            {
                                path: '',
                                loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
                            },
                            {
                                path: 'dettagli-ristorante/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        path: 'lista-ristoranti/:requestType/:id',
                        children: [
                            {
                                path: '',
                                loadChildren: '../lista-ristoranti/lista-ristoranti.module#ListaRistorantiPageModule'
                            },
                            {
                                path: 'dettagli-ristorante/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                                    }
                                ]
                            }
                        ]
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
                    },
                    {
                        path: 'dettagli-ristorante/:id',
                        children: [
                            {
                                path: '',
                                loadChildren: '../dettagli-ristorante/dettagli-ristorante.module#DettagliRistorantePageModule'
                            },
                            {
                                path: 'prenota/:id',
                                children: [
                                    {
                                        path: '',
                                        loadChildren: '../prenota/prenota.module#PrenotaPageModule'
                                    }
                                ]
                            }
                        ]
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
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
