import {Adapter} from './adapter';
import {AreaTemplate} from './area-template';

enum OptionTypes {
    LIST = 'list',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export class Option {
    private _name: string;
    private _type: OptionTypes;
    private _constraint: any;

    constructor(name: string, type: OptionTypes, constraint: any) {
        this._name = name;
        this._type = type;
        this._constraint = constraint;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): OptionTypes {
        return this._type;
    }

    set type(value: OptionTypes) {
        this._type = value;
    }

    get constraint(): any {
        return this._constraint;
    }

    set constraint(value: any) {
        this._constraint = value;
    }
}

export class OptionAdapter{

    private static parseType(type: string): OptionTypes {
        if (Object.values(OptionTypes).includes(type)) {
                // @ts-ignore
                return type;
            }
        return OptionTypes.STRING;
    }

    static adapt(name: string, option: any): Option {
        return new Option(name, OptionAdapter.parseType(option.type), option.constraint);
    }
}
