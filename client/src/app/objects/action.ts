import {Adapter} from './adapter';
import {Area} from './area';
import {Option} from './option';

export class Action {
    private _id: string;
    private _type: string;
    private _name: string;
    private _connectedAccountId: string;
    private _options: Map<string, (string|number|boolean)>[];

    constructor(id: string = '', type: string = '', name: string = '',
                connectedAccountId: string = '', options: Map<string, string | number | boolean>[] = []) {
        this._id = id;
        this._type = type;
        this._name = name;
        this._connectedAccountId = connectedAccountId;
        this._options = options;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get options(): Map<string, string | number | boolean>[] {
        return this._options;
    }

    set options(value: Map<string, string | number | boolean>[]) {
        this._options = value;
    }
}

export class ActionAdapter {
    static adapt(item: any): Action {
        return new Action(item.id, item.type, item.connectedAccount, item.params);
    }
}
