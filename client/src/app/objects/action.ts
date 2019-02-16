import {ActionType} from './action-template';

export class Action {
    private _id: string;
    private _service: string;
    private _name: string;
    private _type: ActionType;
    private _connectedAccountId: string;
    private _options: Map<string, (string|number|boolean)>[];

    constructor(id: string = '', service: string = '', name: string = '', type: ActionType,
                connectedAccountId: string = '', options: Map<string, string | number | boolean>[] = []) {
        this._id = id;
        this._service = service;
        this._name = name;
        this._connectedAccountId = connectedAccountId;
        this._options = options;
        this._type = type;
    }

    get type(): ActionType {
        return this._type;
    }

    set type(value: ActionType) {
        this._type = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get service(): string {
        return this._service;
    }

    set service(value: string) {
        this._service = value;
    }

    get options(): Map<string, string | number | boolean>[] {
        return this._options;
    }

    set options(value: Map<string, string | number | boolean>[]) {
        this._options = value;
    }
}

export class ActionAdapter {
    static adapt(item: any, type: ActionType): Action {
        return new Action(item.id, item.type, type, item.connectedAccount, item.params);
    }
}
