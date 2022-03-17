import { Org } from "./Org";

export class User {
    displayName!: string;
    email!: string;
    avatar!: string;
    timeZone!: string;

 
    private _fname : string;
    public get_fname() : string {
      return this._fname;
    }
    public set_fname(v : string) {
      this._fname = v;
    }

    private _lname : string;
    public get_lname() : string {
      return this._lname;
    }
    public set_lname(v : string) {
      this._lname = v;
    }
     
    private _email : string;
    public get_email() : string {
      return this._email;
    }
    public set_email(v : string) {
      this._email = v;
    }

    private _joinedOrgs : Array<Org>;
    public get_joinedOrgs() : Array<Org> {
      return this._joinedOrgs;
    }
    public set joinedOrgs(v : Array<Org>) {
      this._joinedOrgs = v;
    }
     
    private _password : string;
    public get password() : string {
      return this._password;
    }
    public set password(v : string) {
      this._password = v;
    }
    
  }
  