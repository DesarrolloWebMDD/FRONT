import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from '../core/models/json.result.model';
import { EnviromentService } from '../core/services/enviroment.service';
import { GlobalService } from '../core/services/global.service';
import { SportHits } from '../models/sport.hits.model';

@Injectable({
  providedIn: 'root'
})
export class SportHitsService {
  private controller : string = 'SportHits';
  constructor(private environmentService : EnviromentService,
    private httpClient: HttpClient,
    private globalService:GlobalService) { }
 
    add(entidad: SportHits) {
      entidad.userId = this.globalService.GetUserId();
      let url = `${this.environmentService.apiUrlBase}${this.controller}`;
      return this.httpClient.post<JsonResult<string>>(url, entidad)
    }
   
    getHitsByUser(userId:number): Observable<any> {
      let url = `${this.environmentService.apiUrlBase}${this.controller}/getHitsByUserId/` + userId; 
      return this.httpClient.get<any>(url);
     }


}
