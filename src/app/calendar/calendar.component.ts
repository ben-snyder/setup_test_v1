/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
 */

import { Component, OnInit } from '@angular/core';
import { endOfMonth, parseISO, startOfMonth } from 'date-fns';
import { endOfWeek, startOfWeek } from 'date-fns/esm';
import { zonedTimeToUtc } from 'date-fns-tz';
import { findIana } from 'windows-iana';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import { AuthService } from '../auth.service';
import { GraphService } from '../graph.service';
import { AlertsService } from '../alerts.service';
import { User } from '../user';
import { Org } from '../Org';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public events?: MicrosoftGraph.Event[]; 
  
  private _currentUser : User;
  public get_currentUser() : User {
    return this._currentUser;
  }
  public set_currentUser(v : User) {
    this._currentUser = v;
  }

  
  private _allOrgs : Array<Org>;
  public get_allOrgs() : Array<Org> {
    return this._allOrgs;
  }
  public set_allOrgs(v : Array<Org>) {
    this._allOrgs = v;
  }

  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private alertsService: AlertsService) { }

    formatDateTimeTimeZone(dateTime: MicrosoftGraph.DateTimeTimeZone | undefined | null): Date | undefined {
      if (dateTime == undefined || dateTime == null) {
        return undefined;
      }
    
      try {
        return parseISO(dateTime.dateTime!);
      }
      catch(error) {
        this.alertsService.addError('DateTimeTimeZone conversion error', JSON.stringify(error));
        return undefined;
      }
    }
    
    async ngOnInit() {
      // Convert the user's timezone to IANA format
      const ianaName = findIana(this.authService.user?.timeZone ?? 'UTC');
      const timeZone = ianaName![0].valueOf() || this.authService.user?.timeZone || 'UTC';
    
      // Get midnight on the start of the current week in the user's timezone,
      // but in UTC. For example, for Pacific Standard Time, the time value would be
      // 07:00:00Z
      const now = new Date();
      const weekStart = zonedTimeToUtc(startOfMonth(now), timeZone);
      const weekEnd = zonedTimeToUtc(endOfMonth(now), timeZone);
      
      
      this.events = await this.graphService.getCalendarView(
        weekStart.toISOString(),
        weekEnd.toISOString(),
        this.authService.user?.timeZone ?? 'UTC');
        console.log(this.events);

        
    }
}