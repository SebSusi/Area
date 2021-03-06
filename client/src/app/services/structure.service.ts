import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {AreaTemplate, AreaTemplateAdapter} from '../objects/area-template';
import {map, tap} from 'rxjs/operators';
import {ActionType} from '../objects/actions-template';
import {Action} from '../objects/action';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
    private _template: AreaTemplate;
    private adapater = new AreaTemplateAdapter();

    constructor(private _http: HttpClient, private _router: Router, private api: ApiService) {
    }

    initStructure() {
        this.api.apiGet('/area_info').pipe(map(data => this.adapater.adapt(data)),
            tap(data => {this._template = data})).subscribe();
    }

    get template(): AreaTemplate {
        return this._template;
    }

    getServices() {
        if (this.template === undefined)
            return undefined;
        return this.template.getServices();
    }

    getOptions(action: Action) {
        if (this.template === undefined)
            return undefined;
        return this.template.getOptions(action.serviceName, action.type, action.name);
    }

    getActionsTypes(action: Action) {
        if (this.template === undefined)
            return undefined;
        return this.template.getActionsTypes(action.serviceName, action.type);
    }

    getActionTemplate(action: Action) {
        if (this.template === undefined)
            return undefined;
        return this.template.getAction(action.serviceName, action.type, action.name);
    }
}