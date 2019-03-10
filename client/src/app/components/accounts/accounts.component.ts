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

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public accountService: AccountService) {
        const icons = ['facebook', 'twitter', 'google'];
        for (const type of icons)
            iconRegistry.addSvgIcon(
                type,
                sanitizer.bypassSecurityTrustResourceUrl('assets/types/' + type + '.svg'));
        this.accountService.getAccounts();
    }

    get accounts(): any[] {
        return this.accountService.accounts;
    }

    ngOnInit() {
    }

}
