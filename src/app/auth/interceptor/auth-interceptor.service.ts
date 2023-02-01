import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { GlobalService } from 'src/app/core/services/global.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _global: GlobalService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this._global.GetToken();


    if (req.responseType == "json") {
      // this.spinner.show();
    }
    let request = req;

    if (this._global.IsAuthenticated()) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      })
    }

    return next.handle(request).pipe(

      tap(
        event => {

          if (event instanceof HttpResponse && event.ok) {
            if (!event.body.valid) {
              if (typeof (event.body) == "object") {
                if (event?.url?.toLowerCase().includes("excel") || event?.url?.toLowerCase().includes("download") || event?.url?.toLowerCase().includes("generate")) return;
                if (!event.body.isValid) {
                  let message:string = event.body.message;
                  swal.fire({
                    icon: 'error',
                    html: message,
                    position: 'center',
                    timer:3000
                  })
                } 
              }
              ;
            } else {

              if (typeof (event.body) == "object" && event?.url?.includes("Login")) {

                swal.fire({
                  title: "Bienvenido al sistema Cálidda Generador de Recibos!",
                  toast: true,
                  icon: 'success',
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 5000
                });
              }
            }

          }

        },
        (error: HttpErrorResponse) => {


          if (error.status === 401) {

            swal.fire({
              title: '¡Sesión finalizada!',
              text: "Usted necesita loguearse para realizar esta acción.",
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ir a login'
            }).then((result) => {
              if (result.value) {
                this._router.navigate(["/"]);
                // this.spinner.hide();
              }
            })

          } else {
            swal.fire({
              title: 'Ocurrió un error durante el proceso, intente nuevamente.',

              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 5000
            });

          }
        }
      )
    );

  }
}


