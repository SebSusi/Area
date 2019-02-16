import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {$} from 'jquery';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConnectionService} from '../../services/connection.service';
import {ThemeService} from '../../services/theme.service';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
    displayName: string;

    constructor(private http: HttpClient, private router: Router,
                private themeService: ThemeService, private connectionService: ConnectionService, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getConnectionInfo().subscribe(
            data => this.displayName = data['displayName']
        );
    }

    switchTheme() {
        this.themeService.switchTheme();
    }
}
