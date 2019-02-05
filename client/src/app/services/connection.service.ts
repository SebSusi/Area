import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

@Injectable({
    providedIn: 'root'
})

export class ConnectionService extends ApiService {
    constructor(http: HttpClient, router: Router) {
        super(http, router);
    }

    login(data) {
        return this.apiPost('/auth/local/in', data);
    }

    signUp(data) {
        return this.apiPost('/auth/local/up', data);
    }

    loginSocial(socialPlatformProvider, userData) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.loginGoogle(userData);
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.loginFacebook(userData);
        }
    }

    loginGoogle(data) {
        return this.apiPost('/auth/google', data);
    }

    loginFacebook(data) {
        return this.apiPost('/auth/facebook', data);
    }

    getConnectionInfo() {
        return this.apiGet('/account/profile/current');
    }

    logout() {
        return this.apiGet('/auth/logout');
    }
}
