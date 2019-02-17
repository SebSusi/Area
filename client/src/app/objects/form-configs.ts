export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    constraint?: string[];
    type: string;
    value?: any;
    validations?: Validator[];
}