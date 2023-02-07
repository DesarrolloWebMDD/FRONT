import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  // API url
  public apiUrlBase = '';
  public CAPTCHA_KEY = '';

  // Whether or not to enable debug mode
  public flagCaptcha = false;
  public enableDebug = true;
  constructor() { }
}
