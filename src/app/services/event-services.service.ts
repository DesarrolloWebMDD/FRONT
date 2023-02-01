import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServicesService {
  private agregarGastosJudiciales$ = new Subject<any>();
  private obtenerGastosJudiciales$ = new Subject<void>();
  constructor() { }


  obtenerGastosJudiciales() {
    this.obtenerGastosJudiciales$.next();
  }
  get onObtenerGastosJudiciales(): Observable<void> {
    return this.obtenerGastosJudiciales$.asObservable();
  }
  set setAgregarGastosJudiciales(obj: any) {
    this.agregarGastosJudiciales$.next(obj);
  }
  get onSetAgregarGastosJudiciales(): Observable<any> {
    return this.agregarGastosJudiciales$.asObservable();
  }
}
