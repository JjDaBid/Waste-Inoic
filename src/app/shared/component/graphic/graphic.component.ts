import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartComponent, ApexNonAxisChartSeries, ApexChart, ApexResponsive } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @Input() chartData: any;

  constructor() {}

  ngOnInit() {
    if (this.chartData) {
      console.log("ChartData on Init:", this.chartData);
      this.generateChartData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData'] && !changes['chartData'].firstChange) {
      console.log("ChartData on Changes:", changes['chartData'].currentValue);
      this.generateChartData();
    }
  }

  generateChartData() {
    if (this.chartData && this.chartData.series && this.chartData.chart && this.chartData.labels && this.chartData.responsive) {
      this.chartOptions = {
        series: this.chartData.series,
        chart: this.chartData.chart,
        labels: this.chartData.labels,
        responsive: this.chartData.responsive
      };
      console.log("Chart Options:");
      console.log(this.chartOptions);
    } else {
      console.error("Incomplete chartData:", this.chartData);
    }
  }
}
