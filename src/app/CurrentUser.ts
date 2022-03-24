import { Org } from './Org';

export class CurrentUser {
    fName!: string;
    lName!: string;
    email!: string;
    password!: string;
    joinedOrgs: Org[];

    
    // private _fName : string;
    // public get fName() : string {
    //     return this._fName;
    // }
    // public set fName(v : string) {
    //     this._fName = v;
    // }
    
}