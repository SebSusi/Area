import {Validators} from '@angular/forms';

export class ValidatorsFactory {

    static parseValidators(validations: any) {
        for (const val in validations) {
            validations[val]['name'] = validations[val]['type'];
            validations[val]['validator'] = this.parseValidator(validations[val]);
        }
        return validations;
    }

    static parseValidator(validator: any) {
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
