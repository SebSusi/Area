import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private _http: HttpClient, private _router: Router, private api: ApiService, public afAuth: AngularFireAuth) {
  }

  public putAccount(name, type, data) {
      console.log(name, type, data);
      this.api.apiPost('/account', {name: name, type: type, data: data}).subscribe();
  }

  public putTwitter() {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
              this.putAccount(res['additionalUserInfo']['profile']['name'], 'twitter', res);
          });
  }

    public putGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth
            .signInWithPopup(provider)
            .then(res => {
                console.log(res);
                this.putAccount(res['additionalUserInfo']['profile']['name'], 'google', res);
            });
    }

    public putFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
            .signInWithPopup(provider)
            .then(res => {
                console.log(res);
                this.putAccount(res['additionalUserInfo']['profile']['name'], 'facebook', res);
            });
    }

    public getAccounts() {
      return this.api.apiGet('/account');
    }
}
