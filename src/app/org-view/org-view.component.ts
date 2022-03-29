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
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-org-view',
  templateUrl: './org-view.component.html',
  styleUrls: ['./org-view.component.css']
})
export class OrgViewComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private alertsService: AlertsService){} 

  public hc: HomeComponent = new HomeComponent(this.authService, this.graphService, this.alertsService);
  public test_orgs = this.hc.test_orgs;
  ngOnInit(): void {
    
  }

}
