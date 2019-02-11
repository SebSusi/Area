import {Action} from './action';
import {Adapter} from './adapter';

export class Area {
    private _name: String;
    private _actions: Action[];
    private _on = false;
    private _id: String;


    constructor(id: String, name: String = 'Basic Area', actions: Action[] = [], on: boolean = false) {
        this._name = name;
        this._actions = actions;
        this._on = on;
        this._id = id;
    }

    get id(): String {
        return this._id;
    }

    set id(value: String) {
        this._id = value;
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
        return new Area(item.id, item.name, item.actions);
    }
}
