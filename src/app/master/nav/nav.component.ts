import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { GlobalService } from 'src/app/core/services/global.service';
import { CargaExcelComponent } from 'src/app/views/mantenimientos/carga-excel/carga-excel.component';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   isUser:boolean = false;
  constructor(private _dialog: MatDialog,
    private globalService:GlobalService) { }
      
  ngOnInit(): void {
     this.isUser = this.globalService.IsAuthenticated();
  }
  ngAfterViewInit(){
    this.globalService.IsAuthenticated();
  }

  goLogin() {
    const dialog = this._dialog.open(LoginComponent, {
      data: null,
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      panelClass: 'modal-custom-form-1',
      width: '500px'
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isUser = this.globalService.IsAuthenticated();
      }
    })
  }

  goRegister() {
    const dialog = this._dialog.open(RegisterComponent, {
      data: null,
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      panelClass: 'modal-custom-form-1',
      width: '500px'
    })
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
      }
    })
  }

  goExportFile() {
    const dialog = this._dialog.open(CargaExcelComponent, {
      data: null,
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      panelClass: 'modal-custom-form-1',
      width: '500px'
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
      }
    })
  }
  sendOut(){
    this.globalService.DestroyToken();
    this.isUser = this.globalService.IsAuthenticated();
  }
  ngOnDestroy(): void {
    this.isUser = this.globalService.IsAuthenticated();
  }
}
