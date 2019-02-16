import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {AreaTemplate, AreaTemplateAdapter} from '../objects/area-template';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
    private _template: AreaTemplate;
    private adapater = new AreaTemplateAdapter();

    constructor(private _http: HttpClient, private _router: Router, private api: ApiService) {
    }

    initStructure() {
        const url = 'https://next.json-generator.com/api/json/get/VyOVzLxHL';
        this._http.get(url).pipe(map(data => this.adapater.adapt(data)), tap(data => this._template = data)).subscribe();
    }

    get template(): AreaTemplate {
        return this._template;
    }
}