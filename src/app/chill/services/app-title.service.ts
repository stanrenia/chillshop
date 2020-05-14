import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppTitleService {
  private title$$ = new BehaviorSubject<string>('Shopper');
  private isDisplayed$$ = new BehaviorSubject<boolean>(true);

  public title$ = this.title$$.asObservable();
  public isDisplayed$ = this.isDisplayed$$.asObservable();

  public setTitle(title: string) {
    this.title$$.next(title);
    if (title) {
      this.setDisplay(true);
    }
  }

  public setDisplay(isDisplayed: boolean) {
    this.isDisplayed$$.next(isDisplayed);
  }
}
