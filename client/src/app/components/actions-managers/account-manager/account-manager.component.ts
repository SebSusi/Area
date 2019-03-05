import {AbstractManager} from '../abstract-manager';
import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConnectionService} from '../../../services/connection.service';
import {ActionService} from '../../../services/action.service';
import {Connection} from '../../../objects/connection';
import {FormBuilder, Validators} from '@angular/forms';
import {StepsService} from '../../../services/steps.service';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent extends AbstractManager implements OnInit {

    public accounts: Connection[];
    public test: '';

    constructor(as: ActionService, ss: StepsService, public connectionService: ConnectionService) {
        super(as, ss);
    }

    ngOnInit() {
        this.receiveActionUpdate();
        this.initManager();
    }

    receiveActionUpdate() {
        this.connectionService.getAccounts(this.action.service).subscribe(
            data => {
                this.accounts = data;
            }
        );
    }

    getFormGroup() {
        return {
            accountControl: [this.action.account.id, Validators.required]
        };
    }

}
