import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SportsService } from 'src/app/services/sports.service';
import Swal from 'sweetalert2';
import { MantenceSportResultComponent } from './mantence-sport-result/mantence-sport-result.component';

@Component({
  selector: 'app-sport-administration',
  templateUrl: './sport-administration.component.html',
  styleUrls: ['./sport-administration.component.css']
})
export class SportAdministrationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'hour','date', 'deportText', 'Ligue','state','processCreate','star'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private sportsService : SportsService,
    private _dialog: MatDialog) { }

  ngOnInit(): void {
     this.loadSport();
  }
  loadSport(){
    this.sportsService.listSportsState(0).subscribe(response => {
      if(response.valid === true){
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**ngAfterViewInit() {
   
  }***/
  createEvent(){
    this.sportsService.createEventResult().subscribe(response => {
      if(response.isValid === true){
         Swal.fire('','Eventos creados con exito ...!','success').then(() => {
              this.loadSport();
         });
      }
      console.log(response);
    });
  }

  goUpdateResult(sportId:number,sportName:string) {
    const data = {
      sportId,
      sportName
    }
    const dialog = this._dialog.open(MantenceSportResultComponent, {
      data: data,
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      panelClass: 'modal-custom-form-1',
      width: '900px'
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        if(result.isValid){
          this.loadSport();
        }
      }
    })
  }

}
