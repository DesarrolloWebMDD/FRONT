import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-donut-user',
  templateUrl: './donut-user.component.html',
  styleUrls: ['./donut-user.component.css']
})
export class DonutUserComponent implements OnInit {
   
  chartDPresentadas:any;
  labelDCanceladas:any;
  @Input() dataEfectividad:number = 0;
  @ViewChild('chartElement1')
  chartElement!: ElementRef<HTMLElement>;
  
  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit(){
    // ----------> 🍩 START CHART DONUT Plantillas generadas 🍩 <----------
   // Create chart instance
   this.chartDPresentadas = am4core.create(this.chartElement.nativeElement, am4charts.PieChart);
   this.chartDPresentadas.innerRadius = 65;

   // Add data
   // this.chart.data = [];
   this.chartDPresentadas.data = [
     {
       "name": "Demandas Presentadas",
       "cantidad": 30//this.dataRequestPresent
     }
   ];
   // Add label
   this.labelDCanceladas = this.chartDPresentadas.seriesContainer.createChild(am4core.Label);
   this.labelDCanceladas.text = 10//this.dataRequestPresent;
   this.labelDCanceladas.horizontalCenter = 'middle';
   this.labelDCanceladas.verticalCenter = 'middle';
   this.labelDCanceladas.fontSize = 35;
   this.labelDCanceladas.fontWeight = '600';
   this.labelDCanceladas.fill = am4core.color('#11263C');

    // Add and configure Series
    const pieSeries1 = this.chartDPresentadas.series.push(new am4charts.PieSeries());
    pieSeries1.dataFields.value = "cantidad";
    pieSeries1.dataFields.category = "name";
    pieSeries1.ticks.template.disabled = true;
    pieSeries1.alignLabels = false;
    pieSeries1.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    pieSeries1.labels.template.radius = am4core.percent(-20);
    pieSeries1.labels.template.fill = am4core.color('white');
    pieSeries1.labels.template.fontSize = 16;
    pieSeries1.labels.template.fontWeight = '600';
    pieSeries1.labels.template.disabled = true;

    pieSeries1.colors.list = [am4core.color('#3A138C')];

    // Legend
   this.chartDPresentadas.legend = new am4charts.Legend();
   this.chartDPresentadas.legend.position = 'right';
   this.chartDPresentadas.legend.align = 'right';
   this.chartDPresentadas.legend.contentAlign = 'right';
   this.chartDPresentadas.legend.paddingBottom = 20;
   this.chartDPresentadas.legend.markers.template.width = 30;
   this.chartDPresentadas.legend.markers.template.height = 5;
   this.chartDPresentadas.legend.visible = true;
   // ----------> 🍩 CHART DONUT Plantillas generadas 🍩 <----------
 }
}
