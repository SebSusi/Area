import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
    constructor() {}

    private _light = true;

    setTheme(light: boolean) {
        this._light = light;
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('light');
        if (this._light) {
            body.classList.add('light');
        }
        this.saveTheme();
    }

    saveTheme() {
        window.localStorage.setItem('selectedTheme', (this._light) ? 'light' : 'dark');
    }

    updateThemeFromStorage() {
        this.setTheme(window.localStorage.getItem('selectedTheme') === 'light');
    }

    switchTheme() {
        this.setTheme(!this._light);
    }

    setThemeToDefault() {
        this.setTheme(true);
    }
}