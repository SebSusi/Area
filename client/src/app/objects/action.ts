import {Adapter} from './adapter';
import {Area} from './area';

export class Action {
    private _name: String;
    private _type: String;
    private _params: Map<string, (string|number|boolean)>[];
    private _infos: Map<string, (string|number|boolean)>[];

    constructor(name: string = 'basic action', type: string = 'unknown', params: Map<string, string | number | boolean>[] = [], infos: Map<string, string | number | boolean>[] = []) {
        this._name = name;
        this._type = type;
        this._params = params;
        this._infos = infos;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get type(): String {
        return this._type;
    }

    set type(value: String) {
        this._type = value;
    }

    get params(): Map<string, string | number | boolean>[] {
        return this._params;
    }

    set params(value: Map<string, string | number | boolean>[]) {
        this._params = value;
    }

    get infos(): Map<string, string | number | boolean>[] {
        return this._infos;
    }

    set infos(value: Map<string, string | number | boolean>[]) {
        this._infos = value;
    }
}

export class ActionAdapter implements Adapter<Action> {
    adapt(item: any): Action {
        return new Action(item.name, item.type);
    }
}
