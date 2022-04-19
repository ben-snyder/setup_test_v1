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

import { Component, OnInit } from '@angular/core';
import { endOfMonth, isThisWeek, parseISO, startOfMonth } from 'date-fns';
import { endOfWeek, startOfWeek } from 'date-fns/esm';
import { zonedTimeToUtc } from 'date-fns-tz';
import { findIana } from 'windows-iana';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import { AuthService } from '../auth.service';
import { GraphService } from '../graph.service';
import { AlertsService } from '../alerts.service';
import { User } from '../user';
import { Org } from '../Org';
import { CurrentUser } from '../CurrentUser';
import { getPopperOptions } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { Client } from '@microsoft/microsoft-graph-client';
import { io } from "socket.io-client";
import { NewEvent } from '../NewEvent';
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

  public test_events: NewEvent[] = [];
  public test_orgs: Org[] = [];
  public currentUser?: CurrentUser = undefined;
  public events?: MicrosoftGraph.Event[] = [];

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
    private alertsService: AlertsService) { }

  ngOnInit() {
    //Create test data
    for (let i = 0; i < 10; i++) {
      const new_org = new Org();
      new_org.set_name('Club #' + i);
      new_org.set_organizer('Organizer fname/ lname #' + i);
      for (let j = 0; j < 5; j++) {
        try {
          const testEvent = new NewEvent('chess club tournament',
            'avery.wittmer@cornerstone.edu;benjamin.snyder@cornerstone.edu',
            '03/25/22:T14:00:00',
            '03/25/22:T15:00:00',
            'Come join the chess club for our first introductory tournament of the year! All skill levels/ ELOs welcome!'
          );
          new_org.get_events().push(testEvent);
        }
        catch (error) {
          console.log('Error creating test events');
        }
      }
      this.test_orgs.push(new_org);
    }
    this.currentUser = {
      fName: 'f1',
      lName: 'l1',
      email: 'email1',
      password: 'pass1',
      joinedOrgs: this.test_orgs
    };
  }

  onLoad() {
    const cards = document.querySelectorAll(".org-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        window.location.href = 'org-view/org-view.component.html';
      });
    });
  }

  async signIn(): Promise<void> {

    await this.authService.signIn();
    this.events = await this.graphService.getCalendarView(
      this.weekStart.toISOString(),
      this.weekEnd.toISOString(),
      this.authService.user?.timeZone ?? 'UTC');
    console.log(this.events);
  }

}