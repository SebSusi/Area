import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {AccountService} from '../../services/account.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
    public accounts: any;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public accountService: AccountService) {
        const icons = ['facebook', 'twitter', 'gmail'];
        for (const type of icons)
            iconRegistry.addSvgIcon(
                type,
                sanitizer.bypassSecurityTrustResourceUrl('assets/types/' + type + '.svg'));
        this.accountService.getAccounts().subscribe(data => {this.accounts = data, console.log(data)} );
    }

    ngOnInit() {
    }

}
