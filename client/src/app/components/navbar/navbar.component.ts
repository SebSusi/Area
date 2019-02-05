import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {$} from 'jquery';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConnectionService} from '../../services/connection.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
    connectionService: ConnectionService;
    displayName: String;

    constructor(private http: HttpClient, private router: Router) {
        this.connectionService = new ConnectionService(http, router);
    }

    ngOnInit() {
        this.connectionService.getConnectionInfo().then(response => {
            if (response['success']) {
                this.displayName = response['displayName'];
            } else {
                this.disconnect();
            }
        });
    }

    user() {
        this.router.navigateByUrl('/user');
    }

    logout() {
        this.connectionService.logout();
        this.disconnect();
    }

    private disconnect() {
        window.localStorage.setItem('token', '');
        this.router.navigateByUrl('/login');
    }
}
