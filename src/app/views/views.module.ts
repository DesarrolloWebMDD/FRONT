import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiosComponent } from './premios/premios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VistasRoutes } from './views.routing';
import { ApuestasComponent } from './apuestas/apuestas.component';
//import { MatIconModule } from '@angular/material/icon';
//import { MatTableModule } from '@angular/material/table';
import { OnlyIntegerDirective } from '../directives/only-integer.directive';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { CargaExcelComponent } from './mantenimientos/carga-excel/carga-excel.component';
import { SharedModule } from '../shared/shared.module';
import { RankingComponent } from './ranking/ranking.component';
import { PreloaderComponent } from '../shared/preloader/preloader.component';
import { DonutUserComponent } from './donut-user/donut-user.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SportAdministrationComponent } from './mantenimientos/sport-administration/sport-administration.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { MantenceSportResultComponent } from './mantenimientos/sport-administration/mantence-sport-result/mantence-sport-result.component';
//import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    PremiosComponent,
    ApuestasComponent,
    UserFilterComponent,
    PaquetesComponent,
    CargaExcelComponent,
    RankingComponent,
    PreloaderComponent,
    DonutUserComponent,
    OnlyIntegerDirective,
    SportAdministrationComponent,
    MembresiaComponent,
    MantenceSportResultComponent,
    //MatProgressBarModule
    //SharedModule
    
  ],
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
		RouterModule.forChild(VistasRoutes)
  ],
  exports:[
    OnlyIntegerDirective
  ]
})
export class ViewsModule { }
