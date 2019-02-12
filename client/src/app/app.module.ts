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
import {LoginComponent} from './components/pages/login/login.component';
import {HomeComponent} from './components/pages/home/home.component';
import {UserComponent} from './components/pages/user/user.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {Error404Component} from './components/error404/error404.component';
import {getAuthServiceConfigs} from './objects/socialLoginConfig';
import {AreaListComponent} from './components/area-list/area-list.component';
import {AreaItemComponent} from './components/area-item/area-item.component';
import { EditorComponent } from './components/pages/editor/editor.component';
import { UserAppComponent } from './components/pages/user-app/user-app.component';
import { AppTypeManagerComponent } from './components/actions-managers/app-type-manager/app-type-manager.component';
import { TriggerManagerComponent } from './components/actions-managers/trigger-manager/trigger-manager.component';
import { OptionsManagerComponent } from './components/actions-managers/options-manager/options-manager.component';
import { ActionComponent } from './components/actions-managers/action/action.component';
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full',
    },
    {
        path: 'app',
        component: UserAppComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'editor',
                redirectTo: 'editor/'
            },
            {
                path: 'editor/:id',
                component: EditorComponent
            },
            {
                path: 'account',
                component: UserComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '404',
        component: Error404Component
    }/*,
    {
        path: '**',
        redirectTo: '/404'
    }*/
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
        EditorComponent,
        UserAppComponent,
        AppTypeManagerComponent,
        TriggerManagerComponent,
        OptionsManagerComponent,
        ActionComponent
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
