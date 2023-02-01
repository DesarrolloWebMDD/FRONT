import { number } from '@amcharts/amcharts4/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Sport } from 'src/app/models/sport.model';
import { SportsService } from 'src/app/services/sports.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantence-sport-result',
  templateUrl: './mantence-sport-result.component.html',
  styleUrls: ['./mantence-sport-result.component.css']
})
export class MantenceSportResultComponent implements OnInit {
  lstSportResult: Array<any> = [];
  marcador1: string = '0';
  marcador2: string   = '0';
  sport = new Sport();
  displayedColumns: string[] = ['tipoResultado', 'resultado'];
  dataSource!: MatTableDataSource<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private sportsService: SportsService, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.loadSportResult();
  }
  loadSportResult() {
    this.sportsService.listSportsResult(this.data.sportId).subscribe(response => {
      if (response.valid === true) {
        this.lstSportResult = response.data;
        this.dataSource = new MatTableDataSource(this.lstSportResult);

        const elementIndex = this.lstSportResult.findIndex(obj => obj.typeText === 'L');
        const elementIndex2 = this.lstSportResult.findIndex(obj => obj.typeText === 'V');
        this.marcador1 = this.lstSportResult[elementIndex].extraValue;
        this.marcador2 = this.lstSportResult[elementIndex2].extraValue;
      }
    })
  }
  resultCalculate() {
    const totalAnotador = (Number.parseInt(this.marcador1) * 1) + (Number.parseInt(this.marcador2) * 1);
    this.lstSportResult.forEach(obj => {
       if(totalAnotador > 0){
        if(Number.parseInt(this.marcador1) > 0 && Number.parseInt(this.marcador2) > 0){
          if(obj.typeResult === 15){
            obj.result = true;
          }
          else if(obj.typeResult === 16){
            obj.result = false;
          }
        }else{
          if(obj.typeResult === 15){
            obj.result = false;
          }
          else if(obj.typeResult === 16){
            obj.result = true;
          }
        }
        if(Number.parseInt(this.marcador1) > Number.parseInt(this.marcador2)){
          if(obj.typeResult === 1){
            obj.result = true;
          }
          else if(obj.typeResult === 2){
            obj.result = false;
          }
          else if(obj.typeResult === 3){
            obj.result = false;
          }
          else if(obj.typeResult === 13){
            obj.result = true;
          }
          else if(obj.typeResult === 14){
            obj.result = false;
          }
        }
        else if( Number.parseInt(this.marcador1) === Number.parseInt(this.marcador2)){
          if(obj.typeResult === 1){
            obj.result = false;
          }
          else if(obj.typeResult === 2){
            obj.result = false;
          }
          else if(obj.typeResult === 3){
            obj.result = true;
          }
          else if(obj.typeResult === 13){
            obj.result = true;
          }
          else if(obj.typeResult === 14){
            obj.result = true;
          }
        }
        else if (Number.parseInt(this.marcador1) < Number.parseInt(this.marcador2)){
          if(obj.typeResult === 1){
            obj.result = false;
          }
          else if(obj.typeResult === 2){
            obj.result = true;
          }
          else if(obj.typeResult === 3){
            obj.result = false;
          }
          else if(obj.typeResult === 13){
            obj.result = false;
          }
          else if(obj.typeResult === 14){
            obj.result = true;
          }
        }
       }


      if(totalAnotador === 0){
        if(obj.typeResult === 1){
          obj.result = false;
        }
        else if(obj.typeResult === 2){
          obj.result = false;
        }
        else if(obj.typeResult === 3){
          obj.result = true;
        }
        else if(obj.typeResult === 4){
          obj.result = false;
        }
        else if(obj.typeResult === 6){
          obj.result = false;
        }
        else if(obj.typeResult === 7){
          obj.result = false;
        }
        else if(obj.typeResult === 8){
          obj.result = false;
        }
        else if(obj.typeResult === 9){
          obj.result = true;
        }
        else if(obj.typeResult === 10){
          obj.result = true;
        }
        else if(obj.typeResult === 11){
          obj.result = true;
        }
        else if(obj.typeResult === 12){
          obj.result = true;
        }
        else if(obj.typeResult === 13){
          obj.result = true;
        }
        else if(obj.typeResult === 14){
          obj.result = true;
        }
      }
      else if(totalAnotador === 1){
        if(obj.typeResult === 4){
          obj.result = true;
        }
        else if(obj.typeResult === 6){
          obj.result = false;
        }
        else if(obj.typeResult === 7){
          obj.result = false;
        }
        else if(obj.typeResult === 8){
          obj.result = false;
        }
        else if(obj.typeResult === 9){
          obj.result = false;
        }
        else if(obj.typeResult === 10){
          obj.result = true;
        }
        else if(obj.typeResult === 11){
          obj.result = true;
        }
        else if(obj.typeResult === 12){
          obj.result = true;
        }
      }
      else if(totalAnotador === 2){
        if(obj.typeResult === 4){
          obj.result = true;
        }
        else if(obj.typeResult === 6){
          obj.result = true;
        }
        else if(obj.typeResult === 7){
          obj.result = false;
        }
        else if(obj.typeResult === 8){
          obj.result = false;
        }
        else if(obj.typeResult === 9){
          obj.result = false;
        }
        else if(obj.typeResult === 10){
          obj.result = false;
        }
        else if(obj.typeResult === 11){
          obj.result = true;
        }
        else if(obj.typeResult === 12){
          obj.result = true;
        }
      }
      else if(totalAnotador === 3){
        if(obj.typeResult === 4){
          obj.result = true;
        }
        else if(obj.typeResult === 6){
          obj.result = true;
        }
        else if(obj.typeResult === 7){
          obj.result = true;
        }
        else if(obj.typeResult === 8){
          obj.result = false;
        }
        else if(obj.typeResult === 9){
          obj.result = false;
        }
        else if(obj.typeResult === 10){
          obj.result = false;
        }
        else if(obj.typeResult === 11){
          obj.result = false;
        }
        else if(obj.typeResult === 12){
          obj.result = true;
        }
      }
      else if(totalAnotador >= 4){
        if(obj.typeResult === 4){
          obj.result = true;
        }
        else if(obj.typeResult === 6){
          obj.result = true;
        }
        else if(obj.typeResult === 7){
          obj.result = true;
        }
        else if(obj.typeResult === 8){
          obj.result = true;
        }
        else if(obj.typeResult === 9){
          obj.result = false;
        }
        else if(obj.typeResult === 10){
          obj.result = false;
        }
        else if(obj.typeResult === 11){
          obj.result = false;
        }
        else if(obj.typeResult === 12){
          obj.result = false;
        }
      }
    });
  }
  send() {
     const elementIndex = this.lstSportResult.findIndex(obj => obj.typeText === 'L');
     const newtodos  = [...this.lstSportResult];
     newtodos[elementIndex] = {...newtodos[elementIndex],extraValue:Number.parseInt(this.marcador1)};
     this.lstSportResult = newtodos;
     
     const elementIndex2 = this.lstSportResult.findIndex(obj => obj.typeText === 'V');
     const newtodos2  = [...this.lstSportResult];
     newtodos2[elementIndex2] = {...newtodos2[elementIndex2],extraValue:Number.parseInt(this.marcador2)};
     this.lstSportResult = newtodos2;

    this.sport.id = this.data.sportId;
    this.sport.sportResults = this.lstSportResult;
    this.sportsService.update( this.sport).subscribe(response => {
      if(response.isValid === true){
        Swal.fire('','Resultados actualizados...!','success').then(() =>{
          this.dialogRef.close(response);
       });
      }
      else {
        Swal.fire('',response.message,'error');
      }
    })
  }
}
