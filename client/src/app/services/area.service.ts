import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Area, AreaAdapter} from '../objects/area';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AreaService {
    private _adapter = new AreaAdapter();
    constructor(private _http: HttpClient, private _router: Router, private api: ApiService) {
    }

    getAreas(): Observable<Area[]> {
        const url = 'https://next.json-generator.com/api/json/get/4k_9XCtVI';
        return this._http.get(url).pipe(
            map((data: any[]) => data.map(item => this._adapter.adapt(item))),
        );
    }

    getArea(id: Number): Observable<Area> {
        const url = 'https://next.json-generator.com/api/json/get/4y9sGCYN8';
        return this._http.get(url).pipe(map(data => this._adapter.adapt(data)));
    }
}
