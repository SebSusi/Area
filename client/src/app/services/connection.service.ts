import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ConnectionService {
    private socials: Map<any, any> = new Map([[GoogleLoginProvider.PROVIDER_ID, 'google'], [FacebookLoginProvider.PROVIDER_ID, 'facebook']]);

    constructor(private http: HttpClient, private router: Router, private s: ApiService) {
    }

    login(data) {
        return this.s.apiPost('/auth/local/in', data)
            .pipe(tap(res => console.log(res)), tap(res => {window.localStorage.setItem('token', res['token']); }));
    }

    signUp(data) {
        return this.s.apiPost('/auth/local/up', data);
    }

    loginSocial(socialId, userData) {
        console.log(socialId);
        console.log(GoogleLoginProvider.PROVIDER_ID);
        console.log(this.socials[socialId]);
        return this.s.apiPost('/auth/' + socialId.toLowerCase(), userData)
            .pipe(tap(res => console.log(res)), tap(res => {window.localStorage.setItem('token', res['token']); }));
    }

    logout() {
        return this.s.apiGet('/auth/logout');
    }
}
