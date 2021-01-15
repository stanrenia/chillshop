import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { FireAuthState } from 'akita-ng-fire';

export interface Profile {
    displayName: string;
    photoURL: string;
}

export interface AuthState extends FireAuthState<Profile> {}

const initialAuthState = {};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(initialAuthState);
    }
}
