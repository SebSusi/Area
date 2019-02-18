import {Action} from './action';

export class Area {
    private _name: string;
    private _actions: Action[];
    private _on = false;
    private _id: string;


    constructor(id: string, name: string = 'Basic Area', actions: Action[] = [], on: boolean = false) {
        this._name = name;
        this._actions = actions;
        this._on = on;
        this._id = id;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
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

export class AreaAdapter {
    static adapt(item: any): Area {
        return new Area(item.id, item.name, item.actions);
    }
}
