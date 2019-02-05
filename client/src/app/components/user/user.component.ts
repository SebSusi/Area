import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
    userService: UserService;
    usernameForm: FormGroup;
    emailForm: FormGroup;
    passwordForm: FormGroup;
    linkForm: FormGroup;
    userInfo: String;
    userError: String;
    linkLocal: Boolean;
    showBlindtest: Boolean;
    showGoogle: Boolean;
    showFacebook: Boolean;
    profiles: Object;

    constructor(private socialAuthService: AuthService, private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
        this.userService = new UserService(this.http, this.router);
        this.linkLocal = false;
        this.showBlindtest = false;
        this.showGoogle = false;
        this.showFacebook = false;
        this.userInfo = '';
        this.userError = '';
        this.profiles = {blindtest: null, google: null, facebook: null};
        this.usernameForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            current: ['', []]
        }, {
            validator: this.differentUsername
        });
        this.emailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            current: ['', []]
        }, {
            validator: this.differentEmail
        });
        this.passwordForm = this.formBuilder.group({
            oldPassword: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        }, {
            validator: this.matchPassword
        });
        this.linkForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        }, {
            validator: this.matchPassword
        });

    }

    ngOnInit() {
        this.linkForm.patchValue({email: this.getCurrentEmail()});
        this.updateProfilesInfo();
    }

    linkAccount(email, password) {
        const jsonLoginForm = {
            email: email,
            password: password
        };
        this.changeInfo('');
        this.userService.linkAccount(jsonLoginForm).then(response => {
            if (response['success']) {
                this.changeInfo('BlindTest account created.');
                this.updateLocalInfo()
            } else if (response['message']) {
                this.changeError(response['message']);
            }
        });
    }

    linkSocial(platform) {
        const socialPlatformProvider = this.getSocialPlatformProviderId(platform);
        this.changeInfo('');
        this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
            userData['access_token'] = userData.authToken;
            this.userService.linkSocial(socialPlatformProvider, userData).then(response => {
                if (response['success']) {
                    this.changeInfo(platform + ' account linked.');
                    if (platform === 'Google') {
                        this.updateGoogleInfo();
                    } else if (platform === 'Facebook') {
                        this.updateFacebookInfo();
                    }
                } else if (response['message']) {
                    this.changeError(response['message']);
                }
            });
        });
    }

    unlinkSocial(platform) {
        const socialPlatformProvider = this.getSocialPlatformProviderId(platform);
        this.changeInfo('');
        this.userService.unlinkSocial(socialPlatformProvider).then(response => {
            if (response['success']) {
                this.changeInfo(platform + ' account unlinked.');
                if (platform === 'Google') {
                    this.profiles['google'] = null;
                } else if (platform === 'Facebook') {
                    this.profiles['facebook'] = null;
                }
            } else if (response['message']) {
                this.changeError(response['message']);
            }
        });
    }

    changeUsername(username) {
        const jsonUsername = {
            displayName: username
        };
        this.changeInfo('');
        this.updateDisplayName();
        this.userService.changeUsername(jsonUsername).then(response => {
            if (response['success']) {
                this.updateDisplayName();
                this.changeInfo('Username changed.');
            } else if (response['message']) {
                this.changeError(response['message']);
            }
        });
    }

    changeEmail(email) {
        const jsonEmail = {
            email: email
        };
        this.changeInfo('');
        this.userService.changeEmail(jsonEmail).then(response => {
            if (response['success']) {
                this.updateLocalInfo();
                this.changeInfo('Email saved.');
            } else if (response['message']) {
                this.changeError(response['message']);
            }
        });
    }

    changePassword(password, old) {
        this.changeInfo('');
        const jsonPassword = {
            oldPassword: old,
            password: password
        };
        this.userService.changePassword(jsonPassword).then(response => {
            if (response['success']) {
                this.passwordForm.reset();
                this.changeInfo('Password changed.');
            } else if (response['message']) {
                this.changeError(response['message']);
            }
        });
    }

    private updateProfilesInfo() {
        this.updateDisplayName();
        this.updateLocalInfo();
        this.updateGoogleInfo();
        this.updateFacebookInfo();
    }

    private updateDisplayName() {
        this.userService.getCurrent().then(response => {
            if (response['success']) {
                this.usernameForm.patchValue({username: response['displayName'], current: response['displayName']});
            }
        });
    }

    private updateLocalInfo() {
        this.userService.getLocal().then(response => {
            if (response['success'] && !this.isEmptyJson(response['local'])) {
                this.profiles['blindtest'] = response['local'];
                this.emailForm.patchValue({email: response['local']['email'], current: response['local']['email']});
            } else {
                this.profiles['blindtest'] = null;
            }
        });
    }

    private updateGoogleInfo() {
        this.userService.getGoogle().then(response => {
            if (response['success'] && !this.isEmptyJson(response['google'])) {
                this.profiles['google'] = response['google'];
            } else {
                this.profiles['google'] = null;
            }
        });
    }

    private updateFacebookInfo() {
        this.userService.getFacebook().then(response => {
            if (response['success'] && !this.isEmptyJson(response['facebook'])) {
                this.profiles['facebook'] = response['facebook'];
            } else {
                this.profiles['facebook'] = null;
            }
        });
    }

    private changeInfo(info) {
        this.userError = '';
        this.userInfo = info;
    }

    private changeError(err) {
        this.userInfo = '';
        this.userError = err;
    }

    private getCurrentEmail() {
        this.userService.getCurrent().then(response => {
            if (response['success']) {
                return response[response['currentConnectionType']]['email'];
            }
        });
        return '';
    }

    private getSocialPlatformProviderId(platform) {
        if (platform === 'Google') {
            return GoogleLoginProvider.PROVIDER_ID;
        } else if (platform === 'Facebook') {
            return FacebookLoginProvider.PROVIDER_ID;
        }
    }

    private isEmptyJson(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }

    matchPassword(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('passwordConfirm').value) {
            return {invalid: true};
        }
    }

    differentUsername(c: AbstractControl): { invalid: boolean } {
        if (c.get('current').value === c.get('username').value) {
            return {invalid: true};
        }
    }

    differentEmail(c: AbstractControl): { invalid: boolean } {
        if (c.get('current').value === c.get('email').value) {
            return {invalid: true};
        }
    }


}
