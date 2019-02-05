import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {ConnectionService} from '../../services/connection.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    connectionService: ConnectionService;
    signingUp: boolean;
    loginForm: FormGroup;
    userForm: FormGroup;
    userError: string;

    constructor(private socialAuthService: AuthService, private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
        this.connectionService = new ConnectionService(http, router);
        this.signingUp = false;
        this.userError = '';
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
        this.userForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            passwordConfirm: ['', [Validators.required]]
        }, {
            validator: this.matchPassword
        });
    }

    ngOnInit() {
        window.localStorage.setItem('token', '');
    }

    login(email, password) {
        this.userError = '';
        const jsonLoginForm = {
            email: email,
            password: password
        };
        this.connectionService.login(jsonLoginForm).then(response => {
            if (response['success']) {
                window.localStorage.setItem('token', response['token']);
                this.router.navigateByUrl('/home');
            } else if (response['message']) {
                this.userError = response['message'];
            }
        });
    }

    loginSocial (platform) {
        this.userError = '';
        let socialPlatformProvider;
        if (platform === 'Google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } else if (platform === 'Facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
            userData['access_token'] = userData.authToken;
                this.connectionService.loginSocial(socialPlatformProvider, userData).then(response => {
                    if (response['success']) {
                        window.localStorage.setItem('token', response['token']);
                        this.router.navigateByUrl('/home');
                    } else if (response['message']) {
                        this.userError = response['message'];
                    }
                });
            }
        );
    }

    signUp(username, email, password) {
        this.userError = '';
        const jsonUserForm = {
            username: username,
            email: email,
            password: password
        };
        this.connectionService.signUp(jsonUserForm).then(response => {
            if (response['success']) {
                this.login(email, password);
            } else if (response['message']) {
                this.userError = response['message'];
            }
        });
    }

    matchPassword(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('passwordConfirm').value) {
            return {invalid: true};
        }
    }

}
