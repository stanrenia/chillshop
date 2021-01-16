import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { CollectionConfig, FireAuthService } from 'akita-ng-fire';
import { AuthState, AuthStore } from './auth-store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  profile$ = this.select('profile');

  constructor(protected store: AuthStore) {
    super(store);
  }
}