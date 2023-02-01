import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { NavComponent } from '../master/nav/nav.component';
import { SharedMaterialModule } from './shared-material.module';



@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports:[
    NavComponent,
    SharedMaterialModule
  ]
})
export class SharedModule { }
