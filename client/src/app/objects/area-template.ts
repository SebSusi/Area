import {ActionsTemplate, ActionType} from './actions-template';

export class AreaTemplate {
    public _services = new Map<string, ActionsTemplate[]>();

    constructor() {
    }


    get services(): Map<string, ActionsTemplate[]> {
        return this._services;
    }

    set services(value: Map<string, ActionsTemplate[]>) {
        this._services = value;
    }

    public push(service) {
        if (!this._services.has(service.name))
            this.services.set(service.name, []);
        this.services.get(service.name).push(new ActionsTemplate(ActionType.TRIGGER, service.actions));
        this.services.get(service.name).push(new ActionsTemplate(ActionType.REACTION, service.reactions));
    }

    getService(service: string) {
        return this._services.get(service);
    }

    getAction(service: string, action: ActionType, name: string) {
        if (!name)
            return undefined;
        return this.getActions(service, action).actions.get(name);
    }

    getActions(service: string, action: ActionType) {
        if (service === undefined || this.getService(service) === undefined)
            return undefined;
        return this.getService(service).find(item => item.type === action);
    }

    getServices() {
        return Array.from(this._services.keys());
    }

    getActionsTypes(service: string, actionType: ActionType = ActionType.TRIGGER) {
        if (service === undefined)
            return [];
        const action = this.getActions(service, actionType);
        return action === undefined ? undefined : action.getActionsTypes();
    }

    getOptions(service: string, actionType: ActionType = ActionType.TRIGGER, trigger: string) {
        if (service === undefined || trigger === undefined)
            return [];
        const action = this.getActions(service, actionType);
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

