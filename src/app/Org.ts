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
  
    
    private _value : string;
    public get value() : string {
      return this._value;
    }
    public set value(v : string) {
      this._value = v;
    }
       
    public Org(){}
    
  }