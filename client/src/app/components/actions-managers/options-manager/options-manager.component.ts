import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {Component, Input, OnInit} from '@angular/core';
import {StructureService} from '../../../services/structure.service';
import {StepsService} from '../../../services/steps.service';
import {FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-options-manager',
    templateUrl: './options-manager.component.html',
    styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent extends AbstractManager implements OnInit {

    public options: any;
    public test: string;

    submit(value: any) {}

    constructor(as: ActionService, ss: StepsService, public structureS: StructureService) {
        super(as, ss);
    }

    ngOnInit() {
        this.options = this.structureS.getOptions(this.action);
        this.initManager();
        this.receiveActionUpdate();
    }

    receiveActionUpdate() {
        this.options = this.structureS.getOptions(this.action);
    }

    onSubmit(event: Event) {
/*        event.preventDefault();
        event.stopPropagation();
        if (this.stepsService.getFormGroup(this.type).valid) {
            this.submit.emit(this.stepsService.getFormGroup(this.type).value);
        } else {
            this.validateAllFormFields(this.form);
        }*/
    }

    getFormGroup() {
        this.options = this.structureS.getOptions(this.action);
        return this.createControl();
    }

    createControl() {
        const group: any = {};
        if (this.options)
            this.options.forEach(field => {
                if (!this.action.fields[field.name])
                    this.action.fields[field.name] = '';
                group[field.name] = [
                    this.action.fields[field.name],
                    field.validators,
                ];
            });
        return group;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsTouched({onlySelf: true});
        });
    }
}
