import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};



@Component({
  selector: 'app-second-chart',
  templateUrl: './second-chart.component.html',
  styleUrls: ['./second-chart.component.scss'],
})
export class SecondChartComponent  implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() barChartData: any;

  constructor() { }

  ngOnInit() {
    if (this.barChartData) {
      console.log("barChartData on Init:", this.barChartData);
      this.generateChartData();
    } else {
      console.error("No barChartData provided.");
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['barChartData'] && !changes['barChartData'].firstChange) {
      console.log("barChartData on Changes:", changes['barChartData'].currentValue);
      this.generateChartData();
    }
  }


  generateChartData() {
    if (this.barChartData && this.barChartData.series && this.barChartData.chart && this.barChartData.xaxis) {
      this.chartOptions = {
        series: this.barChartData.series,
        chart: this.barChartData.chart,
        colors: this.barChartData.colors,
        plotOptions: this.barChartData.plotOptions,
        dataLabels: this.barChartData.dataLabels,
        legend: this.barChartData.legend,
        grid: this.barChartData.grid,
        xaxis: this.barChartData.xaxis
      };
      console.log("Chart Options:");
      console.log(this.chartOptions);
    } else {
      console.error("Incomplete barChartData:", this.barChartData);
    }
  }

}
