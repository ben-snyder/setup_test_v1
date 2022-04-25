import { Component, Inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../Event';

import * as data from 'src/data.json'

export interface DialogData {
  event: Event;
}

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  public events: Event[] = [];
  
  constructor(
    private authService: AuthService,
    private graphService: GraphService,
    private alertsService: AlertsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.name = params['name'];
    // });

    
    const org_obj = JSON.parse(JSON.stringify(data));
    const org_data = JSON.parse(JSON.stringify(org_obj.orgs));
    Object.keys(org_data).forEach(key => {
      const org_events_prop = JSON.parse(JSON.stringify(org_data[key]))["events"];

      org_events_prop.forEach(event => {
        var new_event = new Event();
        new_event.set_name(event.name);
        new_event.set_start(event.start);
        new_event.set_end(event.end);
        new_event.set_location(event.location);
        new_event.set_desc(event.desc);
        new_event.set_attendees(event.attendees);
        new_event.set_logo(JSON.parse(JSON.stringify(org_data[key]))["logo_src"])
        this.events.push(new_event);     
      })
      
      
    });
  }

  viewEvent(selected_event: Event) {
    const dialogRef = this.dialog.open(EventViewDialog, {
      width: '50%',
      height: '50%',
      data: {
        event: selected_event
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    //this.router.navigate(['/org-view'], {queryParams: {'selected_org': selected_org}});
  }
}

@Component({
  selector: "event-view-dialog",
  templateUrl: "event-view-dialog.html",
})
export class EventViewDialog {

  constructor(public dialogRef: MatDialogRef<EventViewDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('Inside the dialog constructor');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(){this.dialogRef.close()}

}
