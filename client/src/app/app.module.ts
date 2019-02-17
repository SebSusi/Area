import {AccountManagerComponent} from './components/actions-managers/account-manager/account-manager.component';
import {ActionComponent} from './components/actions-managers/action/action.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {AppComponent} from './app.component';
import {AreaItemComponent} from './components/area-item/area-item.component';
import {AreaListComponent} from './components/area-list/area-list.component';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ButtonComponent} from './components/actions-managers/options-manager/form-components/button/button.component';
import {ButtonsModule} from 'angular-bootstrap-md';
import {CheckboxComponent} from './components/actions-managers/options-manager/form-components/checkbox/checkbox.component';
import {DateComponent} from './components/actions-managers/options-manager/form-components/date/date.component';
import {DynamicFieldDirective} from './components/actions-managers/options-manager/form-components/dynamic-field/dynamic-field.directive';
import {DynamicFormComponent} from './components/actions-managers/options-manager/form-components/dynamic-form/dynamic-form.component';
import {EditorComponent} from './components/pages/editor/editor.component';
import {Error404Component} from './components/error404/error404.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getAuthServiceConfigs} from './objects/socialLoginConfig';
import {HomeComponent} from './components/pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {InputComponent} from './components/actions-managers/options-manager/form-components/input/input.component';
import {LoginComponent} from './components/pages/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {OptionsManagerComponent} from './components/actions-managers/options-manager/options-manager.component';
import {RadiobuttonComponent} from './components/actions-managers/options-manager/form-components/radiobutton/radiobutton.component';
import {RouterModule, Routes} from '@angular/router';
import {SelectComponent} from './components/actions-managers/options-manager/form-components/select/select.component';
import {ServiceManagerComponent} from './components/actions-managers/app-type-manager/service-manager.component';
import {TriggerManagerComponent} from './components/actions-managers/trigger-manager/trigger-manager.component';
import {UserAppComponent} from './components/pages/user-app/user-app.component';
import {UserComponent} from './components/pages/user/user.component';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTreeModule
} from '@angular/material';

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
        AccountManagerComponent,
        ActionComponent,
        AppComponent,
        AreaItemComponent,
        AreaListComponent,
        ButtonComponent,
        CheckboxComponent,
        DateComponent,
        DynamicFieldDirective,
        DynamicFormComponent,
        EditorComponent,
        Error404Component,
        HomeComponent,
        InputComponent,
        LoginComponent,
        NavbarComponent,
        OptionsManagerComponent,
        RadiobuttonComponent,
        SelectComponent,
        ServiceManagerComponent,
        TriggerManagerComponent,
        UserAppComponent,
        UserComponent,
    ],
    entryComponents: [
        InputComponent,
        ButtonComponent,
        SelectComponent,
        DateComponent,
        RadiobuttonComponent,
        CheckboxComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false}
        ),
        AngularSvgIconModule,
        BrowserAnimationsModule,
        BrowserModule,
        ButtonsModule,
        FormsModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTreeModule,
        NgbModule,
        ReactiveFormsModule,
        SocialLoginModule,
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
}
