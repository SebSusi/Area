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

  public _accounts: any[];

  public putAccount(name, type, data) {
      this.api.apiPost('/area_account', {name: name, type: type, data: data}).subscribe(
          data => {console.log(data); this._accounts.push({name: name, type: type, id: data['id']}); }
      );
  }

  public putTwitter() {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
          .signInWithPopup(provider)
          .then(res => {
              this.putAccount(res['additionalUserInfo']['profile']['name'], 'twitter',  res['credential']);
          });
  }

    public putGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth
            .signInWithPopup(provider)
            .then(res => {
                this.putAccount(res['additionalUserInfo']['profile']['name'], 'google', res['credential']);
            });
    }

    public putFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
            .signInWithPopup(provider)
            .then(res => {
                this.putAccount(res['additionalUserInfo']['profile']['name'], 'facebook', res['credential']);
            });
    }

    get accounts(): any[] {
      return this._accounts;
    }

    public getAccounts(type: string = null) {
      this.api.apiGet('/area_account/' + (type ? type : '')).subscribe(data => {this._accounts = (data as any[]); });
    }

    public deleteAccount(type, id) {
      this.api.apiDelete('/area_account/' + type + '/' + id).subscribe(
          data => {
              const idx = this._accounts.findIndex(item => item['id'] === id);
              this.accounts.splice(idx, 1);
          }
      );
    }
}
