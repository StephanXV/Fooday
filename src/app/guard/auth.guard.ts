import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild} from '@angular/router';
import {UtenteService} from '../services/utente.service';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    private pag: any;

    constructor(private utenteService: UtenteService, private navController: NavController) {
    }


    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        if (route.data.pag !== undefined) {
            this.pag = route.data.pag.toString();
        } else {
            this.pag = null;
        }

        return this.utenteService.isLogged()
            .pipe(
                take(1),
                map((isLoggedIn: boolean) => {
                    console.log(isLoggedIn);
                    if (!isLoggedIn) {
                        this.navController.navigateRoot('login', {queryParams: {
                                parametro: this.pag
                            }});
                        return false;
                    }
                    return true;
                })
            );
    }

    canActivateChild(): Observable<boolean> {
        // @ts-ignore
        return this.canActivate();
    }

}
