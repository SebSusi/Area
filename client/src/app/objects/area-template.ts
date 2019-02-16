import {Option, OptionAdapter} from './option';
import {Adapter} from './adapter';
import {forEach} from '@angular/router/src/utils/collection';

export class AreaTemplate {
    private _options = new Map<string, Map<string, Option[]>>();

    constructor() {
    }

    get options(): Map<string, Map<string, Option[]>> {
        return this._options;
    }

    set options(value: Map<string, Map<string, Option[]>>) {
        this._options = value;
    }

    public push(area: string, type: string, option: Option) {
        if (this.options[area] === undefined)
            this.options[area] = new Map();
        if (this.options[area][type] === undefined)
            this.options[area][type] = [];
        this.options[area][type].push(option);
    }
}

export class AreaTemplateAdapter implements Adapter<AreaTemplate> {
    adapt(areas: any): AreaTemplate {
        const at = new AreaTemplate();
        Object.keys(areas).forEach(function (area) {                 // ex: Twitter
            Object.keys(areas[area]).forEach(function (action) {     // ex: action, reaction, trigger
                Object.keys(areas[area][action]).forEach(function (type) {  // ex: userTweet, createTweet
                    const options = areas[area][action][type]['options'];
                    Object.keys(options).forEach(function (name) { // ex:
                        at.push(area, type, OptionAdapter.adapt(name, options[name]));
                    });
                });
            });
        });
        return at;
    }
}

