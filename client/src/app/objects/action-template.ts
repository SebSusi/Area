import {Option, OptionAdapter} from './option';

export enum ActionType {
    TRIGGER = 'action',
    REACTION = 'reaction',
    FILTER = 'filter'
}

export class ActionTemplate {
    type: ActionType;
    triggers: Map<string, Option[]>;

    constructor(type: ActionType, triggers: any) {
        this.type = type;
        this.triggers = new Map();
        Object.keys(triggers).forEach(function (trigger) {
            this.pushTrigger(trigger, triggers[trigger]);
        }, this);
    }

    pushTrigger(trigger, optionsJson) {
        const options = [];
        Object.keys(optionsJson['fields']).forEach(function (name) { // ex:
            options.push(OptionAdapter.adapt(name, optionsJson['fields'][name]));
        });
        this.triggers.set(trigger, options);
    }

    getTriggers(): string[] {
        return Array.from(this.triggers.keys());
    }

    getOptions(trigger: string): Option[] {
        return this.triggers.get(trigger);
    }
}
