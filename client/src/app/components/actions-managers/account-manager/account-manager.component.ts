import {AbstractManager} from '../abstract-manager';
import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection.service';
import {ActionService} from '../../../services/action.service';
import {Connection} from '../../../objects/connection';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent extends AbstractManager implements OnInit {

    public _accounts: Connection[];
    private _connectionService: ConnectionService;

    constructor(actionService: ActionService, formBuilder: FormBuilder, connectionService: ConnectionService) {
        super(actionService, formBuilder);
        this._connectionService = connectionService;
    }

    getFormGroup() {
        return {
            lol: ['', Validators.required]
        };
    }

    ngOnInit() {
        this._connectionService.getAccounts(this.action.service).subscribe(data => {this._accounts = data});
    }

    receiveActionUpdate() {
    }

}
