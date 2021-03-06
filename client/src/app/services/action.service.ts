import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {Action, ActionAdapter} from '../objects/action';
import {ActionType} from '../objects/actions-template';
import {Subject} from 'rxjs';
import {AreaService} from './area.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
    private _actions: Action[] = [];
    private _selected = 0;

    public actionsObservable = new Subject();

    constructor(private _http: HttpClient, private _router: Router, private api: ApiService, private areaService: AreaService) {
    }

    emitActions(reset: boolean = false) {
        this.actionsObservable.next(reset);
    }

    get actions(): Action[] {
        if (!this.areaService.getCurrentArea())
            return [];
        return this.areaService.getCurrentArea().actions;
    }

    getActiveAction() {
        return this.actions[this._selected];
    }

    getAction(id: string): Action {
        if (id === undefined)
            return this.actions[this._selected];
        this.setActiveActionById(id);
        if (this._selected <= -1)
            throw new Error('Can\'t find this action');
        return this.actions[this._selected];
    }

    postAction(action: Action) {
        this.api.apiPost(this.areaService.getPath() + '/' + (action.type === ActionType.TRIGGER ? 'action' : 'reaction'),
            JSON.stringify(action)).pipe(tap(data => action.id = data['id']), tap(data => console.log(action))).subscribe();
    }

    actionPath(id, type) {
        return this.areaService.getPath() + '/' + (type === ActionType.TRIGGER ? 'action/' : 'reaction/') + id;
    }

    putAction(action) {
        this.api.apiPut(this.actionPath(action.id, action.type),
            JSON.stringify(action)).pipe(tap(data => action.id = data['id'])).subscribe();
    }

    updateAction(actionId: string) {
        const index = this.getActionIndex(actionId);
        if (index < 0 || !actionId)
            return;
        if (actionId.startsWith('local'))
            return this.postAction(this.actions[index]);
        return this.putAction(this.actions[index]);
    }

    setAction(action: Action) {
        this.getAction(action.id);
        this.actions[this._selected] = action;
    }

    getActionIndex(id: string) {
        return this.actions.findIndex(item => item.id === id);
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
        const id = 'local' + Math.random().toString(36).substring(7);
        const data = ActionAdapter.adapt({id: id}, this.actions.length ? ActionType.REACTION : ActionType.TRIGGER);
        this.actions.push(data);
        return id;
    }


    deleteAction(id: string) {
        const idx = this.getActionIndex(id);
        if (idx === -1)
            throw new Error('Can\'t find this action');
        const type = this.actions[idx].account.type;
        this.actions.splice(idx, 1);
        if (this._selected >= idx)
            this.setActiveAction(0);
        return this.api.apiDelete(this.actionPath(id, type)).subscribe();
    }
}
