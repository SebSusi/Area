import {ActionType} from './actions-template';

export class Action {
    public id: string;
    public serviceName: string;
    public name: string;
    public type: ActionType;
    public account: { id: string, type: string };
    public fields: any = {};

    constructor(id: string = '', service: string = '', name: string = '', type: ActionType,
                connectedAccountId: { id: string, type: string }, options: any[]) {
        this.id = id;
        this.serviceName = service;
        this.name = name;
        this.account = connectedAccountId ? connectedAccountId : { id: '', type: ''};
        if (options !== undefined)
            for (const obj of options) {
                this.fields[obj.name] = obj.value;
            }
        this.type = type;
    }
}

export class ActionAdapter {
    static adaptArea(item: any): Action[] {
        const i = item['reactions'].map(data => ActionAdapter.adapt(data, ActionType.REACTION));
        if (item['action'] && item['action'].id)
            i.unshift(ActionAdapter.adapt(item['action'], ActionType.TRIGGER));
        return i;
    }

    static adapt(item: any, type: ActionType): Action {
        return new Action(item.id, item.serviceName, item.name, type, item.account, item.fields);
    }
}
