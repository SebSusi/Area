import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeService} from './services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'BlindTest';
    private themeService: ThemeService;

    constructor(private theme: ThemeService) {
        this.themeService = theme;
    }

    ngOnInit() {
        this.themeService.updateThemeFromStorage();
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        this.themeService.saveTheme();
    }
}