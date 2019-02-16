import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeService} from './services/theme.service';
import {StructureService} from './services/structure.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'BlindTest';
    private themeService: ThemeService;

    constructor(private theme: ThemeService, private structureService: StructureService) {
        this.themeService = theme;
    }

    ngOnInit() {
        this.themeService.updateThemeFromStorage();
        this.structureService.initStructure();
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler(event) {
        this.themeService.saveTheme();
    }
}

String.prototype.uncamelize = function(): string {
    return this.replace(/([A-Z])/g, ' $1').toLowerCase();
};