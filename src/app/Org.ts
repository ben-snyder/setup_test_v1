import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export class Org{
  
    private _name : string;
    public get name() : string {
      return this._name;
    }
    public set name(v : string) {
      this._name = v;
    }
    
    private _organizer : string;
    public get organizer() : string {
      return this._organizer;
    }
    public set organizer(v : string) {
      this._organizer = v;
    }
   
    private _events : MicrosoftGraph.Event[];
    public get events() : MicrosoftGraph.Event[] {
      return this._events;
    }
    public set events(v : MicrosoftGraph.Event[]) {
      this._events = v;
    }
       
    public Org(){}
    
  }