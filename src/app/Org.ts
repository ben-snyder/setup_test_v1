import { setupTestingRouter } from '@angular/router/testing';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { NewEvent } from './NewEvent';

export class Org{
  
    private _name : string;
    public get_name() : string {
      return this._name;
    }
    public set_name(v : string) {
      this._name = v;
    }
    
    private _organizer : string;
    public get_organizer() : string {
      return this._organizer;
    }
    public set_organizer(v : string) {
      this._organizer = v;
    }

    private _events : NewEvent[];
    public get_events() : NewEvent[] {
      return this._events;
    }
    public set_events(v : NewEvent[]) {
      this._events = v;
    }
   
/*
    Use these when done with setupTestingRouter, for real outlook events
    private _events : MicrosoftGraph.Event[];
    public get events() : MicrosoftGraph.Event[] {
      return this._events;
    }
    public set events(v : MicrosoftGraph.Event[]) {
      this._events = v;
    }
       */
    public Org(){}
    
  }