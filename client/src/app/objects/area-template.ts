import {ActionTemplate, ActionType} from './action-template';

export class AreaTemplate {
    public _services = new Map<string, ActionTemplate[]>();

    constructor() {
    }


    get services(): Map<string, ActionTemplate[]> {
        return this._services;
    }

    set services(value: Map<string, ActionTemplate[]>) {
        this._services = value;
    }

    public push(service) {
        if (!this._services.has(service.name))
            this.services.set(service.name, []);
        this.services.get(service.name).push(new ActionTemplate(ActionType.TRIGGER, service.actions));
        this.services.get(service.name).push(new ActionTemplate(ActionType.REACTION, service.reactions));
    }

    getActions(service: string) {
        return this._services.get(service);
    }

    getAction(service: string, action: ActionType) {
        if (service === undefined || this.getActions(service) === undefined)
            return undefined;
        return this.getActions(service).find(item => item.type === action);
    }

    getServices() {
        return Array.from(this._services.keys());
    }

    getTriggers(service: string, actionType: ActionType = ActionType.TRIGGER) {
        if (service === undefined)
            return [];
        const action = this.getAction(service, actionType);
        return action === undefined ? undefined : action.getTriggers();
    }

    getOptions(service: string, actionType: ActionType = ActionType.TRIGGER, trigger: string) {
        if (service === undefined || trigger === undefined)
            return [];
        const action = this.getAction(service, actionType);
        return action === undefined ? undefined : action.getOptions(trigger);
    }
}

export class AreaTemplateAdapter {
    adapt(areas: any): AreaTemplate {
        const at = new AreaTemplate();
        for (const service of areas) {
            at.push(service);
        }
        return at;
    }
}

