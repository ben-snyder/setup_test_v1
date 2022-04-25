export class Event{
    
    // private _org : string;
    // public get_org() : string {
    //     return this._org;
    // }
    // public set_org(v : string) {
    //     this._org = v;
    // }
    
    
    private _name : string;
    public get_name() : string {
        return this._name;
    }
    public set_name(v : string) {
        this._name = v;
    }
    
    
    private _start : string;
    public get_start() : string {
        return this._start;
    }
    public set_start(v : string) {
        this._start = v;
    }
    
    
    private _end : string;
    public get_end() : string {
        return this._end;
    }
    public set_end(v : string) {
        this._end = v;
    }
    
    
    private _location : string;
    public get_location() : string {
        return this._location;
    }
    public set_location(v : string) {
        this._location = v;
    }
    
    
    private _desc : string;
    public get_desc() : string {
        return this._desc;
    }
    public set_desc(v : string) {
        this._desc = v;
    }
    
    
    private _attendees : string;
    public get_attendees() : string {
        return this._attendees;
    }
    public set_attendees(v : string) {
        this._attendees = v;
    }

    private logo_src: string;
    public get_logo(){
      return this.logo_src;
    }
    public set_logo(v:string) {
      this.logo_src = v;
    }
    
    public Event(){}
}