import {ValidatorFn, Validators} from '@angular/forms';

export class ValidatorsFactory {

    static parseValidators(validations: any): ValidatorFn {
        const valid: ValidatorFn[] = [];
        for (const val in validations) {
            validations[val]['name'] = validations[val]['type'];
            valid.push(this.parseValidator(validations[val]));
        }
        return Validators.compose(valid);
    }

    static parseValidator(validator: any): ValidatorFn | null {
        switch (validator.type) {
            case 'required':    return Validators.required;
            case 'max':         return Validators.max(validator.value);
            case 'min':         return Validators.min(validator.value);
            case 'maxLength':   return Validators.maxLength(validator.value);
            case 'minLength':   return Validators.minLength(validator.value);
            case 'pattern':     return Validators.pattern(validator.pattern);
            default:            return null;
        }
    }
}
