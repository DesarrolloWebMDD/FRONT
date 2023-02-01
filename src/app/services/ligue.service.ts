import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnviromentService } from '../core/services/enviroment.service';

@Injectable({
  providedIn: 'root'
})
export class LigueService {
   
  private controller : string = 'Ligue';
  constructor(private environmentService : EnviromentService,
    private httpClient: HttpClient) { }

    listLigues(): Observable<any> {
      let url = `${this.environmentService.apiUrlBase}${this.controller}/listLigues`; 
      return this.httpClient.get<any>(url);
     }
}
