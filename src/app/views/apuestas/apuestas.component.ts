import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { GlobalService } from 'src/app/core/services/global.service';
import { Bet } from 'src/app/models/bet.model';
import { SportHits } from 'src/app/models/sport.hits.model';
import { UserPoint } from 'src/app/models/user.point.model';
import { EventServicesService } from 'src/app/services/event-services.service';
import { SoccerCategoryService } from 'src/app/services/soccer-category.service';
import { SportHitsService } from 'src/app/services/sport-hits.service';
import { SportsService } from 'src/app/services/sports.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MembresiaComponent } from '../membresia/membresia.component';

@Component({
  selector: 'app-apuestas',
  templateUrl: './apuestas.component.html',
  styleUrls: ['./apuestas.component.css']
})
export class ApuestasComponent implements OnInit {
  displayedColumns: string[] = ['position', 'Equipos', 'L/E/V', 'Goles0.5', 'Goles1.5', 'Goles2.5', 'Goles3.5', 'LE/EV', 'G/G'];
  dataSource = new MatTableDataSource<any>();
  pointGamer: number = 1;
  isUser: boolean = false;
  form = new FormGroup({
    pointPlay: new FormControl()
  });
  lstDepors: Array<any> = [];
  lstBet: Bet[] = [];
  lstHitsUser:any[] = [];
  lstLigueOutstanding: any[] = [];
  lstSoccerCategorys: any[] = [];
  pointGameOver: number = 0;
  sportHits = new SportHits();
  receiveData: any = null;
  panelOpenState: boolean = false;
  userId:number = 0;
  userPoint?: UserPoint;
  constructor(private fb: FormBuilder, private _route: Router,
    private soccerCategoryService: SoccerCategoryService,
    private globalService: GlobalService,
    private _dialog: MatDialog,
    private sportsService: SportsService,
    private sportHitsService:SportHitsService,
    private procesosEventService: EventServicesService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadMenu();
    this.loadSportDate();
    this.isUser = this.globalService.IsAuthenticated();
    this.userId = this.globalService.GetUserId();
    if(this.isUser){
      this.loadUserHits();
      this.loadUserPoint();
    }

  }
  ngAfterViewInit(){
    this.isUser = this.globalService.IsAuthenticated();
  }

  loadSportDate() {
    this.sportsService.listSportsDay().subscribe(response => {
      if (response.valid === true) {
        this.lstDepors = response.data;
        this.dataSource = new MatTableDataSource(this.lstDepors);
      }
    })
  }

  buildForm() {
    this.form = this.fb.group({
      pointPlay: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5),]]
    });
  }

  loadMenu() {
    this.soccerCategoryService.listMenu().subscribe(response => {
      if (response.valid === true) {
        this.lstSoccerCategorys = response.data.soccerCategorys;
        this.lstLigueOutstanding = response.data.ligueOutstanding;
      }
    });
  }
  loadUserHits(){
     this.sportHitsService.getHitsByUser(this.userId).subscribe(response => {
      if (response.valid === true) {
        this.lstHitsUser = response.data;
      }
     })
  }

  get pointPlay(): AbstractControl {
    return this.form.get("pointPlay") as FormArray;
  }

  goSelect(event: any, betTypeId: number, id: any, valor: number, text: string, betTypeResult: string, elemento: any) {
    if (event.target.checked === true) {
      let domailBet = this.lstBet.find((p) => p.matchId === id);
      if (!domailBet) {
        this.lstBet.push({
          matchId: id,
          betTypeId,
          pointGame: valor,
          playGameText: text,
          betTypeResult: betTypeResult
        })
        this.pointGamer = (this.pointGamer * valor);
        let request = this.lstDepors.find(
          (p) => p.id === elemento.id
        );
        if (request?.id) {
          switch (betTypeId) {
            case 1:
              request.selectTeamA = true;
              break;
            case 2:
              request.selectTeamB = true;
              break;
            case 3:
              request.selectTie = true;
              break;
            case 4:
              request.selectGoal1 = true;
              break;
            case 6:
              request.selectGoal2 = true;
              break;
            case 7:
              request.selectGoal3 = true;
              break;
            case 8:
              request.selectGoal4 = true;
              break;
            case 9:
              request.selectGoal_1 = true;
              break;
            case 10:
              request.selectGoal_2 = true;
              break;
            case 11:
              request.selectGoal_3 = true;
              break;
            case 12:
              request.selectGoal_4 = true;
              break;
            case 13:
              request.selectTeamLE = true;
              break;
            case 14:
              request.selectTeamEV = true;
              break;
            case 15:
              request.selectGG1 = true;
              break;
            case 16:
              request.selectGG2 = true;
              break;
          }
          const point = this.form?.getRawValue();
          const pointValor = point.pointPlay;
          this.pointGameOver =  (this.pointGamer * pointValor);
          this.dataSource = new MatTableDataSource(this.lstDepors);
        }
      } else {
        //ELIMINA SELECCION ANTERIOR Y ACTUALIZA EL ESADO DE SELECCION
        var i = this.lstBet.indexOf(domailBet);
        if (i !== -1) {
          this.lstBet.splice(i, 1);
        }
        this.pointGamer = (this.pointGamer / domailBet?.pointGame);
        let request = this.lstDepors.find(
          (p) => p.id === domailBet?.matchId
        );
        if (request?.id) {
          switch (domailBet.betTypeId) {
            case 1:
              request.selectTeamA = false;
              break;
            case 2:
              request.selectTeamB = false;
              break;
            case 3:
              request.selectTie = false;
              break;
            case 4:
              request.selectGoal1 = false;
              break;
            case 6:
              request.selectGoal2 = false;
              break;
            case 7:
              request.selectGoal3 = false;
              break;
            case 8:
              request.selectGoal4 = false;
              break;
            case 9:
              request.selectGoal_1 = false;
              break;
            case 10:
              request.selectGoal_2 = false;
              break;
            case 11:
              request.selectGoal_3 = false;
              break;
            case 12:
              request.selectGoal_4 = false;
              break;
            case 13:
              request.selectTeamLE = false;
              break;
            case 14:
              request.selectTeamEV = false;
              break;
            case 15:
              request.selectGG1 = false;
              break;
            case 16:
              request.selectGG2 = false;
              break;
          }
          this.dataSource = new MatTableDataSource(this.lstDepors);
        }
        //AGREGA EL NUEVO VALOR
        this.pointGamer = (this.pointGamer * valor);
        this.lstBet.push({
          matchId: id,
          betTypeId,
          pointGame: valor,
          playGameText: text,
          betTypeResult: betTypeResult
        })
        let requestUpdate = this.lstDepors.find(
          (p) => p.id === elemento.id
        );
        if (requestUpdate?.id) {
          switch (betTypeId) {
            case 1:
              requestUpdate.selectTeamA = true;
              break;
            case 2:
              requestUpdate.selectTeamB = true;
              break;
            case 3:
              requestUpdate.selectTie = true;
              break;
            case 4:
              requestUpdate.selectGoal1 = true;
              break;
            case 6:
              requestUpdate.selectGoal2 = true;
              break;
            case 7:
              requestUpdate.selectGoal3 = true;
              break;
            case 8:
              requestUpdate.selectGoal4 = true;
              break;
            case 9:
              requestUpdate.selectGoal_1 = true;
              break;
            case 10:
              requestUpdate.selectGoal_2 = true;
              break;
            case 11:
              requestUpdate.selectGoal_3 = true;
              break;
            case 12:
              requestUpdate.selectGoal_4 = true;
              break;
            case 13:
              requestUpdate.selectTeamLE = true;
              break;
            case 14:
              requestUpdate.selectTeamEV = true;
              break;
            case 15:
              requestUpdate.selectGG1 = true;
              break;
            case 16:
              requestUpdate.selectGG2 = true;
              break;
          }
        }
        const point = this.form?.getRawValue();
        const pointValor = point.pointPlay;
        this.pointGameOver =  (this.pointGamer  * pointValor) ;
      }
    }
    else {
      //Elimina cuando quitas el mismo elemeno 
      let domailBetUpdate = this.lstBet.find((p) => p.matchId === id);
      if (domailBetUpdate) {
        var i = this.lstBet.indexOf(domailBetUpdate);
        if (i !== -1) {
          this.lstBet.splice(i, 1);
        }
        this.pointGamer = (this.pointGamer / domailBetUpdate?.pointGame);
        const point = this.form?.getRawValue();
        const pointValor = point.pointPlay;
        this.pointGameOver =  (this.pointGamer * pointValor);
      }
    }

  }


  deleteSelect(matchId: number, betTypeId: number, item: any) {
    var i = this.lstBet.indexOf(item);
    if (i !== -1) {
      this.lstBet.splice(i, 1);
    }
    let request = this.lstDepors.find(
      (p) => p.id === matchId
    );
    if (request?.id) {
      request.stateSelect = false;
      switch (betTypeId) {
        case 1:
          request.selectTeamA = false;
          break;
        case 2:
          request.selectTeamB = false;
          break;
        case 3:
          request.selectTie = false;
          break;
        case 4:
          request.selectGoal1 = false;
          break;
        case 6:
          request.selectGoal2 = false;
          break;
        case 7:
          request.selectGoal3 = false;
          break;
        case 8:
          request.selectGoal4 = false;
          break;
        case 9:
          request.selectGoal_1 = false;
          break;
        case 10:
          request.selectGoal_2 = false;
          break;
        case 11:
          request.selectGoal_3 = false;
          break;
        case 12:
          request.selectGoal_4 = false;
          break;
        case 13:
          request.selectTeamLE = false;
          break;
        case 14:
          request.selectTeamEV = false;
          break;
        case 15:
          request.selectGG1 = false;
          break;
        case 16:
          request.selectGG2 = false;
          break;
      }
      this.pointGamer = (this.pointGamer / item.pointGame);
      const point = this.form?.getRawValue();
      const pointValor = point.pointPlay;
      this.pointGameOver =  (this.pointGamer * pointValor);
      this.dataSource = new MatTableDataSource(this.lstDepors);
    }
  }

  goCalcPointPlay() {
    const point = this.form?.getRawValue();
    const pointValor = point.pointPlay;
    this.pointGameOver = (this.pointGamer * pointValor);
  }

  goPlayGame() {
    const logint = this.globalService.IsAuthenticated();
    if (logint === false) {
      Swal.fire('', 'Debe Iniciar Sesion', 'info').then(() => {
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
      })
    }
    else {
      if (this.lstBet.length > 10) {
        Swal.fire('', 'Solo puedes hacer maximo 10 conbinados ...!', 'info');
      }
      else {
        //IMPLEMENTACION DE FUNCION GUARDAR
        const point = this.form?.getRawValue();
        const pointValor = point.pointPlay;
        this.sportHits.pointsHit = pointValor;
        this.sportHits.pointsEarn =  this.pointGameOver;
        this.sportHits.SportHitsDetails = this.lstBet;
        this.sportHitsService.add(this.sportHits).subscribe(response => {
          if(response.isValid === true){
            this.loadUserPoint();
            this.loadUserHits();
            this.form.reset();
            this. clearAll();
            this.loadSportDate();
          }
        })
      }

    }
    console.log('Aqui')
  }

  goPakague() {
    this._route.navigateByUrl('paquetes');
  }

  ngOnDestroy(): void {
    this.isUser = this.globalService.IsAuthenticated();
  }

  goPayment(){
    const dialog = this._dialog.open(MembresiaComponent, {
      data: null,
      autoFocus: false,
      restoreFocus: false,
      disableClose: true,
      panelClass: 'modal-custom-form-1',
      width: '450px'
    })
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result)
      }
    })
  }

  clearAll(){
    this.pointGamer = 1;
    this.pointGameOver = 0;
    this.lstBet = [];
    this.lstDepors.forEach(obj => {
      obj.selectGG1 = false;
      obj.selectGG2 = false;
      obj.selectGoal1 = false;
      obj.selectGoal2 = false;
      obj.selectGoal3 = false;
      obj.selectGoal4 = false;
      obj.selectGoal_1 = false;
      obj.selectGoal_2 = false;
      obj.selectGoal_3 = false;
      obj.selectGoal_4 = false;
      obj.selectTeamA = false;
      obj.selectTeamB = false;
      obj.selectTeamEV = false;
      obj.selectTeamLE = false;
      obj.selectTie = false;
      obj.stateSelect = false;
      obj.stateSport = false;
  });
  }

  loadUserPoint(){
    this.userService.getPointByUser().subscribe(response => {
      if(response.valid === true){
        this.userPoint = response.data;
        //this.receiveData = this.userPoint;
        this.procesosEventService.setAgregarGastosJudiciales = this.userPoint;
      }
    })
  }

  applyFilter(filterValue: any) {
   let datosnevos = this.lstDepors.filter(e => e.ligueId === filterValue);
   this.dataSource = new MatTableDataSource(datosnevos);
   //this.dataSource == (e => e.ligueId === filterValue)
  }

}
