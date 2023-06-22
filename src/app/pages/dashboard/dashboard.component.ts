import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntUrlActivate } from '../gestion-usuario/interfaces/urlActivatedRoute.interface';
import Chart from 'chart.js/auto';
import { GeneralService } from '@app/services/general.service';
import { DatosList } from './interfaces/dashboard.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';

import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formRegresionLineal!: FormGroup;
  listaUrl: IntUrlActivate[] = [];

  listaCount: DatosList[] = [];

  listaTipoAsistencia: any[] = [];

  listaTemporalidad: any[] = [
    {
      id_temp: 1,
      temporalidad: 'Día'
    },
    {
      id_temp: 2,
      temporalidad: 'Mes',
    },
    {
      id_temp: 3,
      temporalidad: 'Año',
    }
  ]

  constructor(
    private activedRoute: ActivatedRoute,
    private _gs: GeneralService,
    private fb: FormBuilder,
    private dash_service: DashboardService
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.activedRoute.snapshot.url;
    this.initFormEvento();
    this.chartBar();
    this.chartBarHorizontal();
    this.chartDoughnut();
    this.getAllCount();
    this.cargarTipoAsistencia();

    
  }

  initFormEvento() {
    this.formRegresionLineal = this.fb.group({

      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
      id: ['', [Validators.required]],
      id_temp: ['', [Validators.required]],
    });
  }


  cargarTipoAsistencia() {

    this.dash_service.cargarTipoAsistencia().subscribe({
      next: (response) => {
        this.listaTipoAsistencia = response.data;
      },
      error: (error) => {
        console.log("Error tipo de asistencia: ", error)
      }
    });

  }

  fieldsValidate(campo: string) {
    return this.formRegresionLineal.get(campo)?.invalid && this.formRegresionLineal.get(campo)?.touched;
  }


  getAllCount() {
    this._gs.getCountList().subscribe((resp) => {
      this.listaCount = resp.data;
    });
  }


  chartBar() {
    this._gs.cargartendenciaAsistenciaGlobales().subscribe({
      next: (resp) => {


        if (resp.data) {
          const ctx = document.getElementById('myChart') as HTMLCanvasElement;

          if (ctx !== null) {
            // El elemento existe, así que podemos pasarlo como argumento
            new Chart(ctx, {
              type: 'bar',
              data: {
                labels: resp.data.labels,
                datasets: [{
                  label: '# de asistencias',
                  data: resp.data.asistencia,
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });

          } else {
            console.error("El elemento no existe en la página");
          }

        }
      },
      error: (err) => {

      }
    })



  }

  chartBarHorizontal() {
    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    if (ctx !== null) {
      const labels = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() - index);
        return date.toLocaleString('default', { month: 'long' });
      });

      const data = {
        labels: labels,
        datasets: [{
          axis: 'y',
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };

      new Chart(ctx, {
        type: 'bar',
        data,
        options: {
          indexAxis: 'y',
          responsive: true, // Hace que el gráfico sea sensible al tamaño del contenedor
          maintainAspectRatio: false, // Permite que el gráfico cambie su relación de aspecto

        }
      });
    } else {
      console.error("El elemento no existe en la página");
    }

  }

  chartDoughnut() {
    const ctx = document.getElementById('myChart3') as HTMLCanvasElement;

    if (ctx !== null) {
      const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };

      new Chart(ctx, {
        type: 'doughnut',
        data: data,
      });
    } else {
      console.error("El elemento no existe en la página");
    }

  }

  regresionLineal() {
    const form = this.formRegresionLineal.value;
    let temporalidad_id = parseInt(form.id_temp);
    let tipo_asistencia_id = parseInt(form.id);
    let fechaInicio = form.fechaInicio
    let fechaFin = form.fechaFin;

    this.dash_service.regresionLinealAsistencia(temporalidad_id,tipo_asistencia_id,fechaInicio,fechaFin).subscribe({
      next : (resp) => {
        console.log(resp);

        if(resp.status){

          let puntos = resp.data.puntos;
          let textTemporalidad = '';

          if(temporalidad_id == 1)        textTemporalidad = 'día';
          else if(temporalidad_id == 2)   textTemporalidad = 'mes';
          else if(temporalidad_id == 3)   textTemporalidad = 'año';

          let proyeccion = puntos.proyeccion.y;
          let proF = proyeccion.toFixed(3);

          Highcharts.chart('container', {
            title: {
              text: 'Gráfica de regresión lineal de Asistencias'
            },
            xAxis: {
              min: -0.5,
              max: 5.5
            },
            yAxis: {
              min: 0
            },
            series: [{
              type: 'line',
              name: 'Regresión lineal',
              data: [puntos.inicio.x, puntos.inicio.y],
              marker: {
                enabled: false
              },
              states: {
                hover: {
                  lineWidth: 0
                }
              },
              enableMouseTracking: false
            }, {
              type: 'scatter',
              name: 'Observations',
              data: [resp.data.datos],
              marker: {
                radius: 4
              }
            }]
          }); 




        }
        

      },
      error : (err) => {
        console.log(err);

      }
    })

   /*  Highcharts.chart('container', {
      title: {
        text: 'Gráfica de regresión lineal de Asistencias'
      },
      xAxis: {
        min: -0.5,
        max: 5.5
      },
      yAxis: {
        min: 0
      },
      series: [{
        type: 'line',
        name: 'Regression Line',
        data: [[0, 1.11], [5, 4.51]],
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 0
          }
        },
        enableMouseTracking: false
      }, {
        type: 'scatter',
        name: 'Observations',
        data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
        marker: {
          radius: 4
        }
      }]
    }); */
  }

}
