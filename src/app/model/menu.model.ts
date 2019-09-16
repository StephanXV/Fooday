import {Pietanza} from './pietanza.model';

export class Menu {
    id: number;
    antipasti: Pietanza[];
    primi: Pietanza[];
    secondi: Pietanza[];
    dessert: Pietanza[];
    bevande: Pietanza[];
}
