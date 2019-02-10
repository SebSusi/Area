import {Action} from './action';

export class Area {
    private _name: String = 'Basic Area';
    private _actions: Action[];
    private _on = false;

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get actions(): Action[] {
        return this._actions;
    }

    set actions(value: Action[]) {
        this._actions = value;
    }

    get on() {
        return this._on;
    }

    set on(value) {
        this._on = value;
    }
}
