import {AreaTemplate} from './area-template';
import {ValidatorFn, Validators} from '@angular/forms';
import {ValidatorsFactory} from './validators-factory';
import {InputComponent} from '../components/actions-managers/options-manager/form-components/input/input.component';
import {TextareaComponent} from '../components/actions-managers/options-manager/form-components/textarea/textarea.component';
import {ButtonComponent} from '../components/actions-managers/options-manager/form-components/button/button.component';
import {SelectComponent} from '../components/actions-managers/options-manager/form-components/select/select.component';
import {DateComponent} from '../components/actions-managers/options-manager/form-components/date/date.component';
import {RadiobuttonComponent} from '../components/actions-managers/options-manager/form-components/radiobutton/radiobutton.component';
import {CheckboxComponent} from '../components/actions-managers/options-manager/form-components/checkbox/checkbox.component';

export class Option {
    private _name: string;
    private _type: string;
    private _options: any;
    private _label: string;
    private _placeHolder: string;
    private _validators: ValidatorFn;
    private _value: string;

    constructor(name: string, type: string, validators: any, options: any, label: string, placeHolder: string) {
        this._name = name;
        this._type = type;
        this._validators = ValidatorsFactory.parseValidators(validators);
        this._options = options;
        this._label = label;
        this._placeHolder = placeHolder;
        this._value = undefined;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get options(): any {
        return this._options;
    }

    set options(value: any) {
        this._options = value;
    }

    get validators(): ValidatorFn {
        return this._validators;
    }

    set validators(value: ValidatorFn) {
        this._validators = value;
    }

    get label(): string {
        return this._label;
    }

    set label(value: string) {
        this._label = value;
    }

    get placeHolder(): string {
        return this._placeHolder;
    }

    set placeHolder(value: string) {
        this._placeHolder = value;
    }
}

export class OptionAdapter {

    static adapt(option: any): Option {
        return new Option(option.name, option.type, option.validations,
            option.options, option.label, option.placeHolder);
    }
}
