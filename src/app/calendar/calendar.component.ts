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
import { TempUser } from '../tempuser';
import { getPopperOptions } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { Client } from '@microsoft/microsoft-graph-client';

@Component({
selector: 'app-calendar',
templateUrl: './calendar.component.html',
styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

public events?: MicrosoftGraph.Event[]; 
public test_events?: MicrosoftGraph.Event[];

tempuser?: TempUser = undefined;

// DOCUMENTATION HERE: https://docs.microsoft.com/en-us/graph/use-the-api

// private _currentUser : User;
// public get_currentUser() : User {
//   return this._currentUser;
// }
// public set_currentUser(v : User) {
//   this._currentUser = v;
// }

// private _allOrgs : Array<Org>;
// public get_allOrgs() : Array<Org> {
//   return this._allOrgs;
// }
// public set_allOrgs(v : Array<Org>) {
//   this._allOrgs = v;
// }


constructor(
  private authService: AuthService,
  private graphService: GraphService,
  private alertsService: AlertsService)
  {}

  dummyData(): void{
    this.tempuser = {
      fName: 'f1',
      lName: 'l1',
      email: 'email1',
      password: 'pass1'
    };
  }

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
    const options = {
      //this.authService.authProvider
    };
    
    //const client = createCli

    // Create dummy data
    this.authService.user?.set_email('test@gmail.com');
    console.log(this.authService.user);

    for(let i = 0; i < 10; i++){
      const new_org = new Org();
      new_org.name = 'Club #' + i;
      new_org.organizer = 'Organizer fname/ lname #' + i;
      for(let j = 0; j < 5; j++){   
        const options = {
          authProvider,
        };
        
        const client = Client.init(options);
        
        const event = {
          subject: 'Let\'s go for lunch',
          body: {
            contentType: 'HTML',
            content: 'Does noon work for you?'
          },
          start: {
              dateTime: '2017-04-15T12:00:00',
              timeZone: 'Pacific Standard Time'
          },
          end: {
              dateTime: '2017-04-15T14:00:00',
              timeZone: 'Pacific Standard Time'
          },
          location: {
              displayName: 'Harry\'s Bar'
          },
          attendees: [
            {
              emailAddress: {
                address: 'samanthab@contoso.onmicrosoft.com',
                name: 'Samantha Booth'
              },
              type: 'required'
            }
          ],
          allowNewTimeProposals: true,
          transactionId: '7E163156-7762-4BEB-A1C6-729EA81755A7'
        };
        
        await client.api('/me/events')
          .post(event);
        
        this.test_events?.push(event);
      }
      new_org.events = this.events
      
      
      this._allOrgs.push(new_org);
    }
    
    
  
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

      // this.org
  }
}