import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Area, AreaAdapter} from '../objects/area';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AreaService {
    private _adapter = new AreaAdapter();
    private _areas: Area[] = [];
    constructor(private _http: HttpClient, private _router: Router, private api: ApiService) {
    }


    get areas(): Area[] {
        return this._areas;
    }

    getAreas(): Observable<Area[]> {
        const url = 'https://next.json-generator.com/api/json/get/EkdygAcV8';
        return this._http.get(url).pipe(
            map((data: any[]) => data.map(item => this._adapter.adapt(item))),
            tap(data => this._areas = data)
        );
    }

    getArea(id: String): Observable<Area> {
        const url = 'https://next.json-generator.com/api/json/get/4JboGC5VU';
        return this._http.get(url).pipe(
            map(data => this._adapter.adapt(data)),
            tap(data => this.updateArea(data))
        );
    }

    private updateArea(data: Area) {
        const id = this._areas.findIndex(item => item.id === data.id);
        console.log(data);
        if (id === -1) {
            this._areas.push(data);
        } else {
            this._areas[id] = data;
        }
    }
}
