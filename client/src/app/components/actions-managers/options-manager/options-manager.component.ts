import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {Component, Input, OnInit} from '@angular/core';
import {FieldConfig} from '../../../objects/form-configs';
import {Option} from '../../../objects/option';
import {StructureService} from '../../../services/structure.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-options-manager',
    templateUrl: './options-manager.component.html',
    styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent extends AbstractManager implements OnInit {

    public options: Option[];
    regConfig: FieldConfig[] = [
        {
            type: 'input',
            label: 'Username',
            inputType: 'text',
            name: 'name',
            validations: [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Name Required'
                },
                {
                    name: 'pattern',
                    validator: Validators.pattern('^[a-zA-Z]+$'),
                    message: 'Accept only text'
                }
            ]
        },
        {
            type: 'input',
            label: 'Email Address',
            inputType: 'email',
            name: 'email',
            validations: [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Email Required'
                },
                {
                    name: 'pattern',
                    validator: Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
                    ),
                    message: 'Invalid email'
                }
            ]
        },
        {
            type: 'input',
            label: 'Password',
            inputType: 'password',
            name: 'password',
            validations: [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Password Required'
                }
            ]
        },
        {
            type: 'radiobutton',
            label: 'Gender',
            name: 'gender',
            value: 'Male',
            constraint: ['Male', 'Female', 'Appache Helicoptere'],
        },
        {
            type: 'date',
            label: 'Date of Birth',
            name: 'dob',
            validations: [
                {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Date of Birth Required'
                }
            ]
        },
        {
            type: 'select',
            label: 'Country',
            name: 'country',
            value: 'Russie',
            constraint: ['France', 'Belgique', 'Russie', 'Mongolie']
        },
        {
            type: 'checkbox',
            label: 'Accept Terms',
            name: 'term',
            value: true
        },
        {
            type: 'button',
            label: 'Save'
        }
    ];

    submit(value: any) {}

    constructor(actionService: ActionService, formBuilder: FormBuilder, public structureS: StructureService) {
        super(actionService, formBuilder);
    }

    ngOnInit() {
        this.initManager();
        this.options = this.structureS.getOptions(this.action);
    }

    receiveActionUpdate() {
        this.options = this.structureS.getOptions(this.action);
        console.log(this.options);
    }
}
