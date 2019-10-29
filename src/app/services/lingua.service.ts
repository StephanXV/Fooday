import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LinguaService {

    constructor(
        private translate: TranslateService) { }

    getDefaultLanguage() {
        const lng = this.translate.getBrowserLang();
        this.translate.setDefaultLang(lng);
        return lng;
    }

    setLanguage(setLang) {
        console.log('setto lingua', setLang);
        this.translate.use(setLang);
    }

}
