import { setupTestingRouter } from '@angular/router/testing';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Event } from './Event';

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
    
    private _description : string;
    public get_description() : string {
      return this._description;
    }
    public set_description(v : string) {
      this._description = v;
    }
    
    private logo_src: string;
    public get_logo(){
      return this.logo_src;
    }
    public set_logo(v:string) {
      this.logo_src = v;
    }
    
    
    private _events : Event[];
    public get_events() : Event[] {
      return this._events;
    }
    public set_events(v : Event[]) {
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