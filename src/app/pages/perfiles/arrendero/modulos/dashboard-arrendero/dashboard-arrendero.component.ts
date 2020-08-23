import { Component, OnInit } from '@angular/core';
import Chart from "chart.js";
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { DashboardService } from 'src/app/services/apis/dashboard.service';

@Component({
  selector: 'app-dashboard-arrendero',
  templateUrl: './dashboard-arrendero.component.html'
})
export class DashboardArrenderoComponent implements OnInit {

  //DASH gananciasPoraño
  public listaAnios: any[] = [
    { id: '2020', itemName: '2020' },
    { id: '2021', itemName: '2021' },
    { id: '2022', itemName: '2022' },
    { id: '2023', itemName: '2023' },
  ]
  public selectAnio = [this.listaAnios[0]];
  settingsGananciasAnio = {
    singleSelection: true,
    text: 'Año',
    classes: 'selectpicker btn-danger',
    lazyLoading: true,
    maxHeight: 150
  }
  public gananciasAnuales: any[] = [];

  public gradientChartOptionsConfigurationWithTooltipRed: any

  //Dash propiedades mas solicitadas
  public solicitudesPropiedades: any[] = [];
  public propiedadMasSolicitada: string;
  public labelProp: any[] = [];
  public dataNroSol: any[] = [];
  public gradientBarChartConfiguration: any;

  public canvas: any;
  public ctx;
  public meses = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE"
  ];
  public dataGananciasAnio: any;
  public chartGananciasAnio;
  public dataSolPropiedades: any;
  public chartPropiedadMasSol;
  public pipeTruncate = new TruncatePipe();

  private idArrendero: Number;
  public cantidadInquilinosAlDia: Number;
  public cantidadInquilinosDeudores: Number;
  public cantidadPagosPorConfirmar: Number;
  public cantidadSolicitudesPendientes: Number;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.idArrendero = Number.parseInt(sessionStorage.getItem("id"));
    this.listarGananciasAnuales();
    this.listarCantidadSolPropiedad();
    this.listarCantidadInquilinosAlDia();
    this.listarCantidadinquilinosDeudoreS();
    this.listarPagosPorConfirmar();
    this.listarCantidadSolicitudesPendientes();
  }

  private listarGananciasAnuales() {
    this.dashboardService.listarGananciasAnuales(this.idArrendero, this.listaAnios).subscribe((resp: any) => {
      this.gananciasAnuales = resp.data;
      this.configurarGraficoLineaRojo();
      this.createChartGananciasAnio();

    })
  }

  private listarCantidadSolPropiedad() {
    this.dashboardService.listarCantidadSolPorPropiedad(this.idArrendero).subscribe((resp: any) => {
      this.solicitudesPropiedades = resp.data;
      this.configurarGraficoBarraHorizontal();
      this.createChartPropiedadesMasSol();
    })
  }

  private listarCantidadInquilinosAlDia(){
    this.dashboardService.listarCantidadInquilinosAlDia(this.idArrendero).subscribe((resp:any)=>{
      this.cantidadInquilinosAlDia = resp.data;
    })
  }

  private listarCantidadinquilinosDeudoreS(){
    this.dashboardService.listarCantidadInquilinosDeudores(this.idArrendero).subscribe((resp:any)=>{
      this.cantidadInquilinosDeudores = resp.data;
    })
  }

  private listarCantidadSolicitudesPendientes(){
    this.dashboardService.listarCantidadSolicitudesPendientes(this.idArrendero).subscribe((resp:any)=>{
      this.cantidadSolicitudesPendientes = resp.data;
    })
  }

  private listarPagosPorConfirmar(){
    this.dashboardService.listarCantidadPagosPorconfirmar(this.idArrendero).subscribe((resp:any)=>{
      this.cantidadPagosPorConfirmar = resp.data;
    })
  }

  public onAnioSelect(event) {
    let anio = event.id
    this.chartGananciasAnio.data.datasets[0].data = this.gananciasAnuales[this.gananciasAnuales.findIndex(element => element.anio == anio)].ganancias
    this.chartGananciasAnio.update();
  }

  //FUNCIONES GRAFICOS
  private configurarGraficoLineaRojo() {
    this.gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 2,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: this.gananciaMin(this.gananciasAnuales[0].anio),
              suggestedMax: this.gananciaMax(this.gananciasAnuales[0].anio),
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(233,32,16,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };
  }

  private configurarGraficoBarraHorizontal() {
    this.gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: this.nroSolMax(),
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };
  }

  private createChartGananciasAnio() {
    this.dataGananciasAnio = this.gananciasAnuales[0].ganancias;

    this.canvas = document.getElementById("chartGananciaAnual");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
    gradientStroke.addColorStop(0, "rgba(233,32,16,0)"); //red colors

    var config = {
      type: "line",
      responsive: true,
      data: {
        labels: this.meses,
        datasets: [
          {
            label: "Ingresos: S/.",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#ec250d",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#ec250d",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#ec250d",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            lineTension: 0,
            data: this.dataGananciasAnio
          }
        ]
      },
      options: this.gradientChartOptionsConfigurationWithTooltipRed
    };
    this.chartGananciasAnio = new Chart(this.ctx, config);
  }

  private createChartPropiedadesMasSol() {
    this.solicitudesPropiedades.forEach(sol => {
      sol.propiedad = this.pipeTruncate.transform(sol.propiedad, 12)
      this.labelProp.push(sol.propiedad)
      this.dataNroSol.push(sol.nrosol)
    })
    this.canvas = document.getElementById("chartCantPropSol");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    var config = {
      type: "horizontalBar",
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: this.labelProp,
        datasets: [
          {
            label: "N° Solicitudes: ",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDashOffset: 0.0,
            data: this.dataNroSol
          }
        ]
      },
      options: this.gradientBarChartConfiguration
    }

    this.chartPropiedadMasSol = new Chart(this.ctx, config);
  }


  //FUNCIONES AUXILIARES
  private gananciaMax(anio): number {
    var max = 0;
    this.gananciasAnuales.filter(element => element.anio == anio)
      .forEach(element => {
        element.ganancias.forEach(ganancia => {
          if (ganancia > max) {
            max = ganancia
          }
        });
      });
    return max
  }

  private gananciaMin(anio): number {
    var min = Number.MAX_VALUE;
    this.gananciasAnuales.filter(element => element.anio == anio)
      .forEach(element => {
        element.ganancias.forEach(ganancia => {
          if (ganancia < min) {
            min = ganancia
          }
        });
      });
    return min
  }

  private nroSolMax(): number {
    var max = 0;
    this.solicitudesPropiedades.forEach(sol => {
      if (sol.nrosol > max) {
        max = sol.nrosol
        this.propiedadMasSolicitada = sol.propiedad;
      }
    })
    return max
  }


}
