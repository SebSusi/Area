import {AngularSvgIconModule} from 'angular-svg-icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';

import {MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatDividerModule, MatIconModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ButtonsModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {UserComponent} from './components/user/user.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {Error404Component} from './components/error404/error404.component';
import {getAuthServiceConfigs} from './objects/socialLoginConfig';
import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaItemComponent } from './components/area-item/area-item.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: '404',
        component: Error404Component
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        HomeComponent,
        UserComponent,
        Error404Component,
        AreaListComponent,
        AreaItemComponent
    ],
    entryComponents: [
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        ),
        HttpClientModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        AngularSvgIconModule,
        NgbModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        MatTreeModule,
        MatTabsModule,
        MatListModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        ButtonsModule,
        SocialLoginModule
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    }],
    bootstrap: [AppComponent]
})

export class AppModule { }
