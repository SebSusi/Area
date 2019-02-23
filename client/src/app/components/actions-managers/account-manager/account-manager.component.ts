import {AbstractManager} from '../abstract-manager';
import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection.service';
import {ActionService} from '../../../services/action.service';
import {Connection} from '../../../objects/connection';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent extends AbstractManager implements OnInit {

    public _accounts: Connection[];
    private _connectionService: ConnectionService;

    constructor(actionService: ActionService, connectionService: ConnectionService) {
        super(actionService);
        this._connectionService = connectionService;
    }

    ngOnInit() {
        this._connectionService.getAccounts(this.action.service).subscribe(data => {this._accounts = data});
    }

    receiveActionUpdate() {
    }

}
