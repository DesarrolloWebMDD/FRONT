import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from 'src/app/core/services/global.service';
import { UserPoint } from 'src/app/models/user.point.model';
import { EventServicesService } from 'src/app/services/event-services.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {
  private unsubscribe$ = new Subject();
  userPoint?: UserPoint;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor(private globalService: GlobalService,
    private eventServicesService:EventServicesService) { }
  dataUser: any;
  ngOnInit(): void {
    this.dataUser = JSON.parse(this.globalService.GetUser());
  
    this.eventServicesService.onSetAgregarGastosJudiciales
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.onReceivedData(response);
      });

    //console.log(this.dataUser)
  }

  onReceivedData(receiveData: any) {
    this.userPoint = receiveData;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
