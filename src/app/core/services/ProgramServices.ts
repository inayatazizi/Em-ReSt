import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationUser } from '../model/applicationuser';
import { ViewModel } from '../model/ViewModel';

@Injectable({
    providedIn: 'root'
})

export class ProgramServices{

   //private ipc: IpcRenderer
   constructor(private _electronService: ElectronService) {}

    ///////////////  Customer  Fuctions //////////////////////
  
    getCustomerDetailsSingle(UserId): any {
        return of(this._electronService.ipcRenderer.sendSync('get-user-details',UserId)).pipe(
            catchError((error: any) => Observable.throw(error.json))
       )}

       Authorize(username, password): any {
           let vm = new ViewModel();
           vm.para1= username;
           vm.para2=password;
        return of(this._electronService.ipcRenderer.sendSync('authorize-user',vm)).pipe(
            catchError((error: any) => Observable.throw(error.json))
       )}
    
       getAllUserDetails(): any {
        return of(this._electronService.ipcRenderer.sendSync('get-all-user-details')).pipe(
            catchError((error: any) => Observable.throw(error.json))
       )}
    
       setUserDetails(app_user : ApplicationUser): any {
    
        return of(this._electronService.ipcRenderer.sendSync('set-application-user-details',app_user)).pipe(
            catchError((error: any) => Observable.throw(error.json))
         )}
     
         DeleteUserDetails(userId): any {
            return of(this._electronService.ipcRenderer.sendSync('delete-user-details',userId)).pipe(
                catchError((error: any) => Observable.throw(error.json))
          )}
          
         ///////////////  Customer  Fuctions ///////////////////////


         ///Company and System Functions//

         SetUserInfo(applicationuser,companydetails,systemdetails): any {
             let vm = new ViewModel();
             vm.para1= applicationuser;
             vm.para2= companydetails;
             vm.para3=systemdetails;
            return of(this._electronService.ipcRenderer.sendSync('set-user-information',vm)).pipe(
                catchError((error: any) => Observable.throw(error.json))
          )}
          

        GetUserInfo(userId): Observable<ApplicationUser>{
            let vm = new ViewModel();
            vm.para1= userId;
           return of(this._electronService.ipcRenderer.sendSync('get-complete-information',vm)).pipe(
               catchError((error: any) => Observable.throw(error.json))
         )}

         ///Company and System Functions//

}