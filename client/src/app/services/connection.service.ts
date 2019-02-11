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

    linkAccount(data) {
        return this.s.apiPost('/auth/local/link', data);
    }

    linkSocial(socialPlatformProvider, userData) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.linkGoogle(userData);
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.linkFacebook(userData);
        }
    }

    linkGoogle(data) {
        return this.s.apiPost('/auth/google', data);
    }

    linkFacebook(data) {
        return this.s.apiPost('/auth/facebook', data);
    }

    unlinkAccount(data) {
        return this.s.apiDelete('/auth/local/link');
    }

    unlinkSocial(socialPlatformProvider) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.unlinkGoogle();
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.unlinkFacebook();
        }
    }

    unlinkGoogle() {
        return this.s.apiDelete('/auth/google');
    }

    unlinkFacebook() {
        return this.s.apiDelete('/auth/facebook');
    }
}
