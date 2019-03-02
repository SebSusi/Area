import {Option, OptionAdapter} from './option';

export enum ActionType {
    TRIGGER = 'action',
    REACTION = 'reaction',
    FILTER = 'filter'
}

export class ActionTemplate {
    type: ActionType;
    triggers: Map<string, Option[]>;

    constructor(type: ActionType, actions: any) {
        this.type = type;
        this.triggers = new Map();
        if (!actions)
            return;
        for (const action of actions) {
            this.pushTrigger(action);
        }
    }

    pushTrigger(optionsJson) {
        const options = [];
        for (const field of optionsJson.fields) {
            options.push(OptionAdapter.adapt(field));
        }
        this.triggers.set(optionsJson.name, options);
    }

    getTriggers(): string[] {
        return Array.from(this.triggers.keys());
    }

    getOptions(trigger: string): Option[] {
        return this.triggers.get(trigger);
    }
}
