/* import { Component, OnInit } from '@angular/core';

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

constructor() { }

ngOnInit(): void {
}

}
*/

import { Component, NgModule, OnInit, ViewContainerRef, Inject, ViewChild, ElementRef } from '@angular/core';
import { endOfMonth, isThisWeek, parseISO, startOfMonth } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { findIana } from 'windows-iana';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import { AuthService } from '../auth.service';
import { GraphService } from '../graph.service';
import { AlertsService } from '../alerts.service';
import { User } from '../user';
import { Org } from '../Org';
import { CurrentUser } from '../CurrentUser';
import { NewEvent } from '../NewEvent';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselComponent } from '../ngb-carousel/ngb-carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  formatDateTimeTimeZone(dateTime: MicrosoftGraph.DateTimeTimeZone | undefined | null): Date | undefined {
    if (dateTime == undefined || dateTime == null) {
      return undefined;
    }

    try {
      return parseISO(dateTime.dateTime!);
    }
    catch (error) {
      this.alertsService.addError('DateTimeTimeZone conversion error', JSON.stringify(error));
      return undefined;
    }
  }
  // Is a user logged in?
  get authenticated(): boolean {
    return this.authService.authenticated;
  }
  // The user
  get user(): User | undefined {
    return this.authService.user;
  }

  public currentUser?: CurrentUser = undefined;
  public events?: MicrosoftGraph.Event[] = [];
  public name: string;

  // Convert the user's timezone to IANA format
  public ianaName = findIana(this.authService.user?.timeZone ?? 'UTC');
  public timeZone = this.ianaName![0].valueOf() || this.authService.user?.timeZone || 'UTC';

  // Get midnight on the start of the current week in the user's timezone,
  // but in UTC. For example, for Pacific Standard Time, the time value would be
  // 07:00:00Z
  public now = new Date();
  public weekStart = zonedTimeToUtc(startOfMonth(this.now), this.timeZone);
  public weekEnd = zonedTimeToUtc(endOfMonth(this.now), this.timeZone);

  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.currentUser = {
      fName: 'f1',
      lName: 'l1',
      email: 'email1',
      password: 'pass1',
      joinedOrgs: []
    };
  }

  async signIn(): Promise<void> {
    await this.authService.signIn();
    this.events = await this.graphService.getCalendarView(
      this.weekStart.toISOString(),
      this.weekEnd.toISOString(),
      this.authService.user?.timeZone ?? 'UTC');

  }
}