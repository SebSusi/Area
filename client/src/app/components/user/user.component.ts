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

    constructor(private socialAuthService: AuthService, private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
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
        this.userService.linkAccount(jsonLoginForm).subscribe(
            _ => {
                this.changeInfo('BlindTest account created.');
                this.updateLocalInfo();
            }, res => {
                this.changeError(res);
            });
    }

    linkSocial(platform) {
        const socialPlatformProvider = this.getSocialPlatformProviderId(platform);
        this.changeInfo('');
        this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
            userData['access_token'] = userData.authToken;
            this.userService.linkSocial(socialPlatformProvider, userData).subscribe(_ => {
                    this.changeInfo(platform + ' account linked.');
                    if (platform === 'google') {
                        this.updateGoogleInfo();
                    } else if (platform === 'facebook') {
                        this.updateFacebookInfo();
                    }
                },
                err => {
                    this.changeError(err);
                });
        });
    }

    unlinkSocial(platform) {
        const socialPlatformProvider = this.getSocialPlatformProviderId(platform);
        this.changeInfo('');
        this.userService.unlinkSocial(socialPlatformProvider).subscribe(_ => {
                this.changeInfo(platform + ' account unlinked.');
                this.profiles[platform] = null;
            },
            err => {
                this.changeError(err);
            });
    }

    changeUsername(username) {
        const jsonUsername = {
            displayName: username
        };
        this.changeInfo('');
        this.updateDisplayName();
        this.userService.changeUsername(jsonUsername).subscribe(_ => {
                this.updateDisplayName();
                this.changeInfo('Username changed.');
            },
            err => {
                this.changeError(err);
            });
    }

    changeEmail(email) {
        const jsonEmail = {
            email: email
        };
        this.changeInfo('');
        this.userService.changeEmail(jsonEmail).subscribe(_ => {
                this.updateLocalInfo();
                this.changeInfo('Email saved.');
            },
            err => {
                this.changeError(err);
            });
    }

    changePassword(password, old) {
        this.changeInfo('');
        const jsonPassword = {
            oldPassword: old,
            password: password
        };
        this.userService.changePassword(jsonPassword).subscribe(_ => {
                this.passwordForm.reset();
                this.changeInfo('Password changed.');
            },
            err => {
                this.changeError(err);
            });
    }

    private updateProfilesInfo() {
        this.updateDisplayName();
        this.updateLocalInfo();
        this.updateGoogleInfo();
        this.updateFacebookInfo();
    }

    private updateDisplayName() {
        this.userService.getCurrent().subscribe(response => {
                this.usernameForm.patchValue({username: response['displayName'], current: response['displayName']});
        });
    }

    private updateLocalInfo() {
        this.userService.getLocal().subscribe(response => {
            if (response['success'] && !this.isEmptyJson(response['local'])) {
                this.profiles['blindtest'] = response['local'];
                this.emailForm.patchValue({email: response['local']['email'], current: response['local']['email']});
            } else {
                this.profiles['blindtest'] = null;
            }
        });
    }

    private updateGoogleInfo() {
        this.userService.getGoogle().subscribe(response => {
            if (response['success'] && !this.isEmptyJson(response['google'])) {
                this.profiles['google'] = response['google'];
            } else {
                this.profiles['google'] = null;
            }
        });
    }

    private updateFacebookInfo() {
        this.userService.getFacebook().subscribe(response => {
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
        return this.userService.getCurrent().subscribe(_ => {
                return _[_['currentConnectionType']]['email'];
        });
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
