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
        this.emitActions(true);
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

    setActiveActionById(id: string) {
        this.setActiveAction(this._actions.findIndex(item => item.id === id));
    }

    setActiveAction(index) {
        this._selected = index;
    }
}
