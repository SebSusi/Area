import {ActionType} from './actions-template';

export class Action {
    private _id: string;
    private _service: string;
    private _name: string;
    private _type: ActionType;
    private _account: {id: string, type: string};
    private _options = new Map<string, string>();

    constructor(id: string = '', service: string = '', name: string = '', type: ActionType,
                connectedAccountId: any, options: any[]) {
        this._id = id;
        this._service = service;
        this._name = name;
        this._account = connectedAccountId;
        if (options !== undefined)
        for (const obj of options) {
            this.options.set(obj.name, obj.value);
        }
        this._type = type;
    }

    set account(value: {id: string, type: string}) {
        this._account = value;
    }

    get account(): {id: string, type: string} {
        return this._account;
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

    get options(): Map<string, string> {
        return this._options;
    }

    set options(value: Map<string, string>) {
        this._options = value;
    }
}

export class ActionAdapter {
    static adaptArea(item: any): Action[] {
        const i = item['reactions'].map(data => ActionAdapter.adapt(data, ActionType.REACTION));
        i.unshift(ActionAdapter.adapt(item['action'], ActionType.TRIGGER));
        return i;
    }

    static adapt(item: any, type: ActionType): Action {
        return new Action(item.id, item.serviceName, item.name, type, item.account, item.fields);
    }
}
