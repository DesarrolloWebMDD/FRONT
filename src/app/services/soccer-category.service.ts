import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnviromentService } from '../core/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class SoccerCategoryService {
  private controller : string = 'SoccerCategory';
  constructor(private environmentService : EnviromentService,
    private httpClient: HttpClient) { }

    listMenu(): Observable<any> {
      let url = `${this.environmentService.apiUrlBase}${this.controller}/listMenu`; 
      return this.httpClient.get<any>(url);
     }
}
