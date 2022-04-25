import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { OrgViewComponent } from './org-view/org-view.component';
import { EventViewComponent } from './event-view/event-view.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
    ]
  },
  { path: 'org-view', component: OrgViewComponent},
  { path: 'calendar', component: CalendarComponent },
  { path: 'newevent', component: NewEventComponent },
  { path: 'event-view', component: EventViewComponent }
];

@NgModule({
  providers:[{
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}
  }],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
