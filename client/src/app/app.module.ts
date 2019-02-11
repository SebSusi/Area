import {AngularSvgIconModule} from 'angular-svg-icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';

import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSlideToggle, MatSlideToggleModule, MatTabsModule, MatTreeModule
} from '@angular/material';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ButtonsModule} from 'angular-bootstrap-md';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {UserComponent} from './components/user/user.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {Error404Component} from './components/error404/error404.component';
import {getAuthServiceConfigs} from './objects/socialLoginConfig';
import {AreaListComponent} from './components/area-list/area-list.component';
import {AreaItemComponent} from './components/area-item/area-item.component';
import { EditorComponent } from './components/editor/editor.component';

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
        path: 'editor',
        component: EditorComponent
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
        AreaItemComponent,
        EditorComponent
    ],
    entryComponents: [],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
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
        MatSlideToggleModule,
        ButtonsModule,
        SocialLoginModule
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
}
