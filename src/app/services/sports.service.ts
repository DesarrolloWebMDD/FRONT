import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from '../core/models/json.result.model';
import { EnviromentService } from '../core/services/enviroment.service';
import { Sport } from '../models/sport.model';
import { AccionRequest } from '../models/sportUpload.model';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  private controller : string = 'Sports';
  constructor(private environmentService : EnviromentService,
    private httpClient: HttpClient) { }

    GuardarExcel(request: AccionRequest){
      let url = `${this.environmentService.apiUrlBase}${this.controller}/guardarExcelSport`;
      return this.httpClient.post<JsonResult<string>>(url, request)
    }

    listSportsDay(): Observable<any> {
      let url = `${this.environmentService.apiUrlBase}${this.controller}/listSportsDay`; 
      return this.httpClient.get<any>(url);
     }

     listSportsState(state:number): Observable<any> {
      let url = `${this.environmentService.apiUrlBase}${this.controller}/listSportsState/` + state; 
      return this.httpClient.get<any>(url);
     }

     createEventResult(){
      let url = `${this.environmentService.apiUrlBase}${this.controller}/crearResultEvent`;
      return this.httpClient.get<JsonResult<string>>(url)
    }

    listSportsResult(sportId:number): Observable<any> {
      let url = `${this.environmentService.apiUrlBase}${this.controller}/listSportsResult/` + sportId; 
      return this.httpClient.get<any>(url);
     }

     update(entidad: Sport) {
      let url = `${this.environmentService.apiUrlBase}${this.controller}`;
      return this.httpClient.put<JsonResult<string>>(url, entidad)
    }
}
