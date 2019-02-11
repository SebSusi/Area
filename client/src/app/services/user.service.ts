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
