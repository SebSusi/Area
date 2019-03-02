import {AreaTemplate} from './area-template';
import {Validators} from '@angular/forms';
import {ValidatorsFactory} from './validators-factory';

enum OptionTypes {
    LIST = 'list',
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean'
}

export class Option {
    private _name: string;
    private _type: OptionTypes;
    private _options: any;
    private _validators: Validators[];

    constructor(name: string, type: OptionTypes, validators: any, options: any) {
        this._name = name;
        this._type = type;
        this._validators = ValidatorsFactory.parseValidators(validators);
        this._options = options;
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

    get options(): any {
        return this._options;
    }

    set options(value: any) {
        this._options = value;
    }

    get validators(): Validators[] {
        return this._validators;
    }

    set validators(value: Validators[]) {
        this._validators = value;
    }
}

export class OptionAdapter {

    private static parseType(type: string): OptionTypes {
        if (Object.values(OptionTypes).includes(type)) {
                // @ts-ignore
                return type;
            }
        return OptionTypes.STRING;
    }

    static adapt(option: any): Option {
        return new Option(option.name, OptionAdapter.parseType(option.type), option.validations, option.options);
    }
}
