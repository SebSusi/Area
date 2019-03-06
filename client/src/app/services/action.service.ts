import {Injectable} from '@angular/core';
import {Area} from '../objects/area';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {map, tap} from 'rxjs/operators';
import {Action, ActionAdapter} from '../objects/action';
import {ActionType} from '../objects/actions-template';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
    private _actions: Action[] = [];
    private _selected: number;

    public actionsObservable = new Subject();

    constructor(private _http: HttpClient, private _router: Router, private api: ApiService) {
    }

    emitActions(reset: boolean = false) {
        this.actionsObservable.next(reset);
    }

    get actions(): Action[] {
        return this._actions;
    }

    getAction(id: string): Action {
        if (id === undefined)
            return this._actions[this._selected];
        this.setActiveActionById(id);
        if (this._selected <= -1)
            throw new Error('Can\'t find this action');
        return this._actions[this._selected];
    }

    getActions(area: Area, type: ActionType = ActionType.TRIGGER) {
        const url = 'https://next.json-generator.com/api/json/get/4JboGC5VU';
        return this._http.get(url).pipe(
            map(data => ActionAdapter.adaptArea(data)),
            tap(data => this._actions = data)
        );
    }

    updateAction(actionId: string) {
        const url = 'blablabla.fr';
        return this._http.put(url, this._actions[actionId]);
    }

    setAction(action: Action) {
        this.getAction(action.id);
        this._actions[this._selected] = action;
    }

    getActionIndex(id: string) {
        return this._actions.findIndex(item => item.id === id);
    }

    setActiveActionById(id: string) {
        this.setActiveAction(this.getActionIndex(id));
    }

    setActiveAction(index) {
        if (index !== this._selected) {
            this._selected = index;
            this.emitActions(index !== undefined);
        }
        this._selected = index;
    }

    getNewAction() {
        const url = 'https://next.json-generator.com/api/json/get/VkTIxMH8L';
        return this._http.get(url).pipe(
            map(data => ActionAdapter.adapt(data, ActionType.REACTION)),
            tap(data => data.id = Math.random().toString(36).substring(7)),
            tap(data => this._actions.push(data))
        );
    }


    deleteAction(id: string) {
        const idx = this.getActionIndex(id);
        if (idx === -1)
            throw new Error('Can\'t find this action');
        this.actions.splice(idx, 1);
        if (this._selected >= idx)
            this.setActiveAction(0);
        // Todo
        const url = 'https://next.json-generator.com/api/json/get/VkTIxMH8L';
        return this._http.get(url).pipe();
    }
}
