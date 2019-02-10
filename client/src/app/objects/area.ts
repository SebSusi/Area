import {Action} from './action';
import {Adapter} from './adapter';

export class Area {
    private _name: String;
    private _actions: Action[];
    private _on = false;


    constructor(name: String = 'Basic Area', actions: Action[] = [], on: boolean = false) {
        this._name = name;
        this._actions = actions;
        this._on = on;
    }

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

export class AreaAdapter implements Adapter<Area> {
    adapt(item: any): Area {
        return new Area(item.name, item.actions);
    }
}
