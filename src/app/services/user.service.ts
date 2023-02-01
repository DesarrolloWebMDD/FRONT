import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonResult } from '../core/models/json.result.model';
import { ResponseLoginDto } from '../core/models/responseLogin.model';
import { EnviromentService } from '../core/services/enviroment.service';
import { GlobalService } from '../core/services/global.service';
import { LoginDto } from '../models/login.model';
import { UserPoint } from '../models/user.point.model';
import { UserWeb } from '../models/userweb.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  responseLogin= new ResponseLoginDto;
  private controller : string = 'User';
  constructor(private environmentService : EnviromentService,
    private httpClient: HttpClient, private _global: GlobalService) { }

    add(entidad: UserWeb) {
      let url = `${this.environmentService.apiUrlBase}${this.controller}`;
      return this.httpClient.post<JsonResult<string>>(url, entidad)
    }

    Login(login: LoginDto): Observable<JsonResult<any>> {

      const url = `${this.environmentService.apiUrlBase}${this.controller}/Access`;
      return this.httpClient.post<JsonResult<any>>(url, login).pipe(
        map((rpta:any)=> {
          if (rpta.valid) {
            this.responseLogin = rpta.data;
            this._global.SaveToken(this.responseLogin)
            return rpta;
          }
        })
      )
    }
    /**update(entidad: Client) {
      console.log(entidad);
      let url = `${this.environmentService.apiUrl}${this.controller}`;
      return this.httpClient.put<JsonResult<string>>(url, entidad)
    }
    updateState(estado : Estado) {
      let url = `${this.environmentService.apiUrl}${this.controller}/updateStatus`;
      return this.httpClient.put<JsonResult<string>>(url,estado);
    }
  
    getClintActive(): Observable<JsonResult<any>> {
      const url = `${this.environmentService.apiUrl}${this.controller}/listClintActive`;
      return this.httpClient.get<JsonResult<any>>(url);
    }
    getById(id: number){
      const url = `${this.environmentService.apiUrl}${this.controller}/getById` + '/' + id;
      return this.httpClient.get<JsonResult<any>>(url);
    }**/

    getPointByUser(){
      let userId = this._global.GetUserId();
      const url = `${this.environmentService.apiUrlBase}${this.controller}/getPointByUser` + '/' + userId;
      return this.httpClient.get<JsonResult<UserPoint>>(url);
    }
}
