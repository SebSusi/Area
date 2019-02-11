import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private s: ApiService, private http: HttpClient, private router: Router) {
    }

    getSocial(socialPlatformProvider) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.getGoogle();
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.getFacebook();
        }
    }

    getGoogle() {
        return this.s.apiGet('/account/profile/google');
    }

    getFacebook() {
        return this.s.apiGet('/account/profile/facebook');
    }

    getLocal() {
        return this.s.apiGet('/account/profile/local');
    }

    getCurrent() {
        return this.s.apiGet('/account/profile/current');
    }

    getProfiles() {
        return this.s.apiGet('/account/profile');
    }

    changeUsername(data) {
        return this.s.apiPut('/account/profile/info/display_name', data);
    }

    changeEmail(data) {
        return this.s.apiPut('/account/profile/local/email', data);
    }

    changePassword(data) {
        return this.s.apiPut('/account/profile/local/password', data);
    }

    getConnectionInfo() {
        return this.s.apiGet('/account/profile/current');
    }
}
