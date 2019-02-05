import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ApiService {
    apiUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.apiUrl = environment.apiUrl;
    }

    static getHeaders() {
       if (window.localStorage.getItem('token')) {
          const token = window.localStorage.getItem('token');
           return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': token });
       }
       return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }

    apiGet(path = '') {
        const headers = ApiService.getHeaders();

        return this.http.get(`${this.apiUrl}${path}`, {headers: headers}).toPromise();
    }

    apiPost(path, data) {
        const headers = ApiService.getHeaders();

        return this.http.post(`${this.apiUrl}${path}`, data, {headers: headers}).toPromise();
    }

    apiPut(path, data) {
        const headers = ApiService.getHeaders();

        return this.http.put(`${this.apiUrl}${path}`, data, {headers: headers}).toPromise();
    }

    apiDelete(path) {
        const headers = ApiService.getHeaders();

        return this.http.delete(`${this.apiUrl}${path}`, {headers: headers}).toPromise();
    }
}
