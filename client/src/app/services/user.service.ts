import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

@Injectable({
    providedIn: 'root'
})

export class UserService extends ApiService {
    constructor(http: HttpClient, router: Router) {
        super(http, router);
    }

    linkAccount(data) {
        return this.apiPost('/auth/local/link', data);
    }

    linkSocial(socialPlatformProvider, userData) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.linkGoogle(userData);
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.linkFacebook(userData);
        }
    }

    linkGoogle(data) {
        return this.apiPost('/auth/google', data);
    }

    linkFacebook(data) {
        return this.apiPost('/auth/facebook', data);
    }

    unlinkAccount(data) {
        return this.apiDelete('/auth/local/link');
    }

    unlinkSocial(socialPlatformProvider) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.unlinkGoogle();
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.unlinkFacebook();
        }
    }

    unlinkGoogle() {
        return this.apiDelete('/auth/google');
    }

    unlinkFacebook() {
        return this.apiDelete('/auth/facebook');
    }

    getSocial(socialPlatformProvider) {
        if (socialPlatformProvider === GoogleLoginProvider.PROVIDER_ID) {
            return this.getGoogle();
        } else if (socialPlatformProvider === FacebookLoginProvider.PROVIDER_ID) {
            return this.getFacebook();
        }
    }

    getGoogle() {
        return this.apiGet('/account/profile/google');
    }

    getFacebook() {
        return this.apiGet('/account/profile/facebook');
    }

    getLocal() {
        return this.apiGet('/account/profile/local');
    }

    getCurrent() {
        return this.apiGet('/account/profile/current');
    }

    getProfiles() {
        return this.apiGet('/account/profile');
    }

    changeUsername(data) {
        return this.apiPut('/account/profile/info/display_name', data);
    }

    changeEmail(data) {
        return this.apiPut('/account/profile/local/email', data);
    }

    changePassword(data) {
        return this.apiPut('/account/profile/local/password', data);
    }

}
