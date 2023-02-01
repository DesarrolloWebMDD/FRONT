import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  // API url
  public apiUrlBase = '';


  // Whether or not to enable debug mode
  public enableDebug = true;
  constructor() { }
}
