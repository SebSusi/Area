import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

@Injectable()
export class ApiService {
    apiUrl: string;

    get http(): HttpClient {
        return this._http;
    }

    constructor(private _http: HttpClient, private router: Router) {
        this.apiUrl = environment.apiUrl;
    }

    static getHeaders() {
        if (window.localStorage.getItem('token')) {
            const token = window.localStorage.getItem('token');
            return new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Authorization': token});
        }
        return new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    }

    checkError(data) {
        if (data['success'] || !data['message']) {
            return;
        }
        if (data['field'] === 'Authorization') {
            this.router.navigateByUrl('/login');
        }
        throw new Error(data['message']);
    }

    apiGet(path = '') {
        const headers = ApiService.getHeaders();

        return this._http.get(`${this.apiUrl}${path}`, {headers: headers})
            .pipe(tap(res => {this.checkError(res); }));
    }

    apiPost(path, data) {
        const headers = ApiService.getHeaders();

        return this._http.post(`${this.apiUrl}${path}`, data, {headers: headers})
            .pipe(tap(res => {this.checkError(res); }));
    }

    apiPut(path, data) {
        const headers = ApiService.getHeaders();

        return this._http.put(`${this.apiUrl}${path}`, data, {headers: headers})
            .pipe(tap(res => {this.checkError(res); }));
    }

    apiDelete(path) {
        const headers = ApiService.getHeaders();

        return this._http.delete(`${this.apiUrl}${path}`, {headers: headers})
            .pipe(tap(res => {this.checkError(res); }));
    }
}
