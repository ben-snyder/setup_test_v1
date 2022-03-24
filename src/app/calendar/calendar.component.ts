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

@Component({
selector: 'app-calendar',
templateUrl: './calendar.component.html',
styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

constructor(
private authService: AuthService,
private graphService: GraphService,
private alertsService: AlertsService)
{}

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
  }
}