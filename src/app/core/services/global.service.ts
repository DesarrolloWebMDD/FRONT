import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ResponseLoginDto } from '../models/responseLogin.model';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private _router: Router) { }

  PageSizeOptions(): number[] {
    return [25, 50, 100, 200 ];
  }
  IsAuthenticated(): boolean {
    if (this.GetToken()) {
      return true;
    } else {
      return false;
    }
  }
  GetToken():any {
    if (localStorage.getItem('token')  && localStorage?.getItem('token')?.length || 0 > 5) {
      return localStorage.getItem('token');
    }

  }
  GetUserId(): any  {
    if (localStorage.getItem('userID')) {
      return localStorage.getItem('userID');
    }
  }
  GetUserName(): any  {
    if (localStorage.getItem('username')) {
      return localStorage.getItem('username');
    }
  }
  getUserExiste(){
    const token = JSON.stringify(localStorage.getItem('token'));
    if(token != null || token != '')
    {
      return true;
    }
    else{
      return false;
    }
  }
  GetRolDescription(): any   {
    if (localStorage.getItem('roleDes')) {
      return localStorage.getItem('roleDes') || "";
    }
  }
  DestroyToken(): void {
    swal.fire({
      title: 'Desea cerrar Sesión ?',
      //text: "Usted necesita loguearse para realizar esta acción.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#C70039',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('user');
        localStorage.removeItem('rolUser');
        localStorage.removeItem('rolName');
        this._router.navigate(["/"]);
      }
    })
  }
  SaveToken(response:ResponseLoginDto) {
    if (response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response?.user?.userName || "");
      localStorage.setItem('userID', response?.user?.id.toString() || "");
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('rolUser', JSON.stringify(response.rolUser));
      localStorage.setItem('rolName', JSON.stringify(response.rolName));
    }
  }

  isAdministratorUser(){
    return localStorage.getItem('role') =='1' ? true : false;
  }
  GetUser(): any  {
    if (localStorage.getItem('user')) {
      return localStorage.getItem('user') || "";
    }
  }

  GetRolUser(): any  {
    if (localStorage.getItem('rolUser')) {
      return localStorage.getItem('rolUser') || "";
    }
  }

  GetRolName(): any  {
    if (localStorage.getItem('rolName')) {
      return localStorage.getItem('rolName') || "";
    }
  }
}
