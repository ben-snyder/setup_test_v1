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
// import { Home } from "../home";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  public test_events: NewEvent[] = [];
  
  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private alertsService: AlertsService) { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++){
      const testEvent = new NewEvent('test event #' + i,
            'avery.wittmer@cornerstone.edu;benjamin.snyder@cornerstone.edu',
            '03/30/22:T14:00:00',
            '03/30/22:T15:00:00',
            'Description text'
          );
          this.test_events.push(testEvent);
    }
  }

}