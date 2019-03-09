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
    private _areas: Area[] = [];
    public id: string;
    constructor(private _http: HttpClient, private _router: Router, private api: ApiService) {
    }

    get areas(): Area[] {
        return this._areas;
    }

    getCurrentArea() {
        if (!this.id)
            return null;
        return this.areas.find(e => e.id === this.id);
    }

    getAreas() {
        return this.api.apiGet('/area').pipe(
            map((data: any[]) => data.map(item => AreaAdapter.adapt(item))),
            tap(data => this._areas = data)
        );
    }

    getArea(id: string, name: string = 'Basic Area'): Observable<Area> {
        if (id === undefined || id.length === 0) {
            return this.api.apiPost('/area/', {name: name, timer: 5, activated: true}).pipe(
                map(data => AreaAdapter.adaptFromNew(data['id'], name)),
                tap(data => this.updateArea(data)),
                tap(data => this.id = data['id'])
            );
        }
        return this.api.apiGet('/area/'.concat(id)).pipe(
            map(data => AreaAdapter.adapt(data)),
            tap(data => this.id = data['id']),
            tap(data => this.updateArea(data))
        );
    }

    private updateArea(data: Area) {
        const id = this._areas.findIndex(item => item.id === data.id);
        if (id === -1) {
            this._areas.push(data);
        } else {
            this._areas[id] = data;
        }
    }

    public getPath() {
        return  '/area/' + this.id;
    }
}
