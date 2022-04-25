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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as data from 'src/data.json'


export interface DialogData {
  org: Org;
}

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

  public orgs: Org[] = [];
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
    private router: Router,
    public dialog: MatDialog) {
    console.log('Inside the home component constructor');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });

    const org_obj = JSON.parse(JSON.stringify(data));
    const org_data = JSON.parse(JSON.stringify(org_obj.orgs));

    Object.keys(org_data).forEach(key => {
      const curr_org_obj = JSON.parse(JSON.stringify(org_data[key]));
      var new_org = new Org();
      new_org.set_name(curr_org_obj.name);
      new_org.set_description(curr_org_obj.description);
      new_org.set_organizer(curr_org_obj.organizer);
      new_org.set_logo(curr_org_obj.logo_src);
      this.orgs.push(new_org);
    });

    console.log(this.orgs);

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

  viewOrg(selected_org: Org) {
    const dialogRef = this.dialog.open(OrgViewDialog, {
      width: '50%',
      height: '50%',
      data: {
        org: selected_org
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    //this.router.navigate(['/org-view'], {queryParams: {'selected_org': selected_org}});
  }
}


@Component({
  selector: "org-view-dialog",
  templateUrl: "org-view-dialog.html",
})
export class OrgViewDialog {

  constructor(public dialogRef: MatDialogRef<OrgViewDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('Inside the dialog constructor');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close(){this.dialogRef.close()}

}