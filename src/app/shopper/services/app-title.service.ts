import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppTitleService {
    
    private title$$ = new BehaviorSubject<string>('Shopper');

    public title$ = this.title$$.asObservable();

    public setTitle(title: string) {
        this.title$$.next(title);
    }
}