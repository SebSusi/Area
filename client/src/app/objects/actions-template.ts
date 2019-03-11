import {Option, OptionAdapter} from './option';

export enum ActionType {
    TRIGGER = 'action',
    REACTION = 'reaction',
    FILTER = 'filter'
}

export class ActionsTemplate {
    type: ActionType;
    actions: Map<string, {description: string, options: Option[], output: any, accountType: string}>;

    constructor(type: ActionType, actions: any) {
        this.type = type;
        this.actions = new Map();
        if (!actions)
            return;
        for (const action of actions) {
            this.pushAction(action);
        }
    }

    private pushAction(optionsJson) {
        const options = [];
        for (const field of optionsJson.fields) {
            options.push(OptionAdapter.adapt(field));
        }
        this.actions.set(optionsJson.name,
            {
                description: optionsJson.description,
                options: options,
                output: optionsJson.output,
                accountType: optionsJson.accountType
            });
    }

    getActionsTypes() {
        return this.actions;
    }

    getActionTemplate(name) {
        return this.actions.get(name);
    }

    getOptions(trigger: string): Option[] {
        if (this.actions.get(trigger))
            return this.actions.get(trigger).options;
        return null;
    }
}
