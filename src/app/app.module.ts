import { FormsModule } from '@angular/forms';
import { IPublicClientApplication,
         PublicClientApplication,
         BrowserCacheLocation } from '@azure/msal-browser';
import { MsalModule,
         MsalService,
         MSAL_INSTANCE } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventViewComponent } from './event-view/event-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { OrgViewComponent } from './org-view/org-view.component';

let msalInstance: IPublicClientApplication | undefined = undefined;

export function MSALInstanceFactory(): IPublicClientApplication {
  msalInstance = msalInstance ?? new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      postLogoutRedirectUri: OAuthSettings.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  });

  return msalInstance;
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AlertsComponent,
    CalendarComponent,
    NewEventComponent,
    EventViewComponent,
    OrgViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MsalModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
