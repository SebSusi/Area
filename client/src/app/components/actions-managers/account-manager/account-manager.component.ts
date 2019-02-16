import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../../../services/connection.service';
import {Action} from '../../../objects/action';

@Component({
    selector: 'app-account-manager',
    templateUrl: './account-manager.component.html',
    styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit {

    @Input()
    public action: Action;
    public _accounts: Account[];
    private _connectionService: ConnectionService;

    constructor(connectionService: ConnectionService) {
        this._connectionService = connectionService;
    }

    ngOnInit() {
        this._connectionService.getAccounts(this.action.type).subscribe(d => {this._accounts = d});
    }

}
