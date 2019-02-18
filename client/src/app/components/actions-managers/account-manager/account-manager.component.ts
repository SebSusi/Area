import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection.service';
import {Action} from '../../../objects/action';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent extends AbstractManager implements OnInit {

    public _accounts: Account[];
    private _connectionService: ConnectionService;

    constructor(actionService: ActionService, connectionService: ConnectionService) {
        super(actionService);
        this._connectionService = connectionService;
    }

    ngOnInit() {
//        this._connectionService.getAccounts(this.action.service).subscribe(d => {this._accounts = d});
    }

    receiveActionUpdate() {
    }

}
