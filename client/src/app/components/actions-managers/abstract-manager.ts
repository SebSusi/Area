import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Action} from '../../objects/action';
import {ActionService} from '../../services/action.service';

@Injectable()
export abstract class AbstractManager {

    public _action: Action;

    protected constructor(protected actionService: ActionService) {
        this._action = actionService.getAction(undefined);
        this.actionService.actionsObservable.subscribe(value => {
            this._action = this.actionService.getAction(undefined);
            this.receiveActionUpdate();
        });
    }

    get action(): Action {
        return this._action;
    }

    set action(value: Action) {
        this._action = value;
    }

    emitActionUpdate() {
        this.actionService.emitActions();
    }

    abstract receiveActionUpdate();
}
