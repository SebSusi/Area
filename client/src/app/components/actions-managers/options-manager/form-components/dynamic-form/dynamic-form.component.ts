import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges
} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl
} from '@angular/forms';
import {AbstractManager} from '../../../abstract-manager';
import {ActionService} from '../../../../../services/action.service';

@Component({
    exportAs: 'dynamicForm',
    selector: 'app-dynamic-form',
    templateUrl: 'dynamic-form.component.html',
    styleUrls: ['dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
    @Input() fields: any = [];
    @Input() actionId: string;
    @Input() form: FormGroup;

    @Output()
    submit: EventEmitter<any> = new EventEmitter<any>();

    private actionIdSave = '';

    get value() {
        return this.form.value;
    }

    constructor(public formBuilder: FormBuilder) {
    }

    ngOnChanges(changes: SimpleChanges): void {
//        if (this.actionId !== this.actionIdSave) {
            this.form = this.createControl();
            this.actionIdSave = this.actionId;
//        }
    }

    receiveActionUpdate() {
    }

    ngOnInit() {
        this.actionIdSave = this.actionId;
        this.form = this.createControl();
    }

    onSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.form.valid) {
            this.submit.emit(this.form.value);
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    createControl() {
        const group = this.formBuilder.group({});
        if (this.fields)
            this.fields.forEach(field => {
                if (field.type === 'button') return;
                const control = this.formBuilder.control(
                    field.value,
                    this.bindValidations(field.validations || [])
                );
                group.addControl(field.name, control);
            });
        return group;
    }

    bindValidations(validations: any) {
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsTouched({onlySelf: true});
        });
    }
}
